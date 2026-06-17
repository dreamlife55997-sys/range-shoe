/* =========================================
   RANGE — Cart Page JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    // Listen for cart updates
    document.addEventListener('cartUpdated', renderCart);

    // Also ordered
    const alsoGrid = document.getElementById('also-ordered-products');
    if (alsoGrid) {
        const recommended = Store.getFilteredProducts({ sort: 'trending' }).slice(0, 4);
        alsoGrid.innerHTML = recommended.map(renderProductCard).join('');
    }
});

function renderCart() {
    const cart = Store.getCart();
    const cartItems = document.getElementById('cart-items');
    const cartLayout = document.getElementById('cart-layout');
    const emptyCart = document.getElementById('empty-cart');

    if (cart.length === 0) {
        if (cartLayout) cartLayout.style.display = 'none';
        if (emptyCart) emptyCart.style.display = '';
        return;
    }

    if (cartLayout) cartLayout.style.display = '';
    if (emptyCart) emptyCart.style.display = 'none';

    let itemsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = Store.getProduct(item.productId);
        if (!product) return;

        const price = product.salePrice || product.price;
        const hasDiscount = product.salePrice !== null;
        subtotal += price * item.qty;

        const mainColor = product.colorHexes[0];
        const accentColor = adjustColor(mainColor, 30);

        itemsHTML += `
            <div class="cart-item" data-product-id="${product.id}" data-size="${item.size}">
                <div class="cart-item-image" onclick="window.location.href='product.html?id=${product.id}'">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:4px;">` : `
                    <svg viewBox="0 0 200 160" fill="none">
                        <ellipse cx="100" cy="135" rx="70" ry="10" fill="#f0f0f0"/>
                        <path d="M30 100 C30 75, 55 50, 100 50 C145 50, 170 70, 180 90 L180 110 C180 116, 174 120, 168 120 L42 120 C36 120, 30 116, 30 110 Z" fill="${mainColor}"/>
                        <path d="M50 90 C60 70, 90 55, 140 60 L160 80 L50 100 Z" fill="${accentColor}"/>
                        <path d="M30 110 L180 110 L180 118 C180 122, 176 125, 172 125 L38 125 C34 125, 30 122, 30 118 Z" fill="#e5e5e5"/>
                    </svg>
                    `}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name" onclick="window.location.href='product.html?id=${product.id}'">${product.name}</div>
                    <div class="cart-item-meta">${product.gender}'s ${product.category} · Size UK ${item.size}</div>
                    <div class="cart-item-price">
                        <span class="price-current ${!hasDiscount ? 'price-no-sale' : ''}">${Store.formatPrice(price)}</span>
                        ${hasDiscount ? `<span class="price-original">${Store.formatPrice(product.price)}</span>` : ''}
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="updateItemQty(${product.id}, ${item.size}, ${item.qty - 1})">−</button>
                            <input type="text" class="qty-value" value="${item.qty}" readonly>
                            <button class="qty-btn" onclick="updateItemQty(${product.id}, ${item.size}, ${item.qty + 1})">+</button>
                        </div>
                        <button class="cart-item-move" onclick="moveToWishlist(${product.id}, ${item.size})">
                            ♡ Move to Wishlist
                        </button>
                        <button class="cart-item-remove" onclick="removeItem(${product.id}, ${item.size})">
                            ✕ Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = itemsHTML;

    // Update summary
    const shipping = subtotal >= 4999 ? 0 : 299;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    document.getElementById('summary-subtotal').textContent = Store.formatPrice(subtotal);
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'FREE' : Store.formatPrice(shipping);
    document.getElementById('summary-shipping').className = shipping === 0 ? 'summary-free' : '';
    document.getElementById('summary-tax').textContent = Store.formatPrice(tax);
    document.getElementById('summary-total').textContent = Store.formatPrice(total);
}

function updateItemQty(productId, size, newQty) {
    if (newQty < 1) {
        removeItem(productId, size);
        return;
    }
    Store.updateCartQty(productId, size, newQty);
    renderCart();
}

function removeItem(productId, size) {
    Store.removeFromCart(productId, size);
    renderCart();
    Store.showToast('Item removed from cart', 'success');
}

function moveToWishlist(productId, size) {
    if (!Store.isInWishlist(productId)) {
        Store.toggleWishlist(productId);
    }
    Store.removeFromCart(productId, size);
    renderCart();
    Store.showToast('Item moved to wishlist', 'success');
}

function applyPromo() {
    const code = document.getElementById('promo-code').value.trim();
    if (code) {
        Store.showToast('Invalid promo code. Please try again.', 'error');
    }
}

function handleCheckout() {
    const user = Store.getUser();
    if (!user) {
        Store.showToast('Please sign in to proceed with checkout.', 'error');
        setTimeout(() => window.location.href = 'account.html', 1500);
        return;
    }
    Store.showToast('Checkout feature coming soon! 🎉', 'success');
}
