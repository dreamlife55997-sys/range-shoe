/* =========================================
   RANGE — Product Detail Page JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    const product = Store.getProduct(productId);

    if (!product) {
        document.getElementById('product-detail').innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <a href="shop.html" class="btn btn-primary">Browse All Shoes</a>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = `${product.name} — RANGE`;
    document.getElementById('product-breadcrumb').textContent = product.name;

    let selectedSize = null;
    let selectedColor = 0;
    let qty = 1;
    const isWished = Store.isInWishlist(product.id);
    const hasDiscount = product.salePrice !== null;

    function generateStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
    }

    function renderShoeSVG(color, size = '100%') {
        if (product.image) {
            return `<img src="${product.image}" alt="${product.name}" style="width:${size};height:${size};object-fit:contain;padding:var(--space-4);">`;
        }
        const mainColor = product.colorHexes[color] || '#1a1a1a';
        const accentColor = adjustColor(mainColor, 30);
        return `
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size};height:${size};">
                <ellipse cx="200" cy="260" rx="160" ry="20" fill="#f0f0f0"/>
                <path d="M60 200 C60 160, 100 100, 200 100 C300 100, 340 140, 360 180 L360 220 C360 230, 350 240, 340 240 L80 240 C70 240, 60 230, 60 220 Z" fill="${mainColor}"/>
                <path d="M100 180 C120 140, 180 110, 260 120 L300 160 L100 200 Z" fill="${accentColor}"/>
                <path d="M60 220 L360 220 L360 235 C360 240, 355 245, 350 245 L70 245 C65 245, 60 240, 60 235 Z" fill="#e5e5e5"/>
                <circle cx="120" cy="230" r="4" fill="#ccc"/>
                <circle cx="200" cy="230" r="4" fill="#ccc"/>
                <circle cx="280" cy="230" r="4" fill="#ccc"/>
                <path d="M150 155 L250 145 L260 160 L150 170 Z" fill="${accentColor}" opacity="0.5"/>
            </svg>
        `;
    }

    // Render product detail
    const detailHTML = `
        <div class="pd-gallery">
            <div class="pd-main-image" id="pd-main-image">
                ${hasDiscount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                ${renderShoeSVG(selectedColor)}
            </div>
            <div class="pd-thumbs">
                ${product.colorHexes.map((hex, i) => `
                    <button class="pd-thumb ${i === 0 ? 'active' : ''}" data-color="${i}" onclick="switchColor(${i})">
                        ${renderShoeSVG(i)}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="pd-info">
            <div class="pd-category">${product.gender}'s ${product.category}</div>
            <h1 class="pd-name">${product.name}</h1>
            <div class="pd-rating">
                <span class="pd-stars">${generateStars(product.rating)}</span>
                <span class="pd-rating-text">${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="pd-price ${!hasDiscount ? 'pd-price-no-sale' : ''}">
                <span class="pd-price-current">${Store.formatPrice(hasDiscount ? product.salePrice : product.price)}</span>
                ${hasDiscount ? `
                    <span class="pd-price-original">${Store.formatPrice(product.price)}</span>
                    <span class="pd-price-discount">Save ${product.discount}%</span>
                ` : ''}
            </div>

            <div class="pd-section-title">Color — ${product.colors[selectedColor]}</div>
            <div class="pd-colors" id="pd-colors">
                ${product.colorHexes.map((hex, i) => `
                    <button class="pd-color-swatch ${i === 0 ? 'active' : ''}" style="background:${hex};${hex === '#ffffff' ? 'box-shadow: inset 0 0 0 1px #d4d4d4;' : ''}" data-color="${i}" onclick="switchColor(${i})" title="${product.colors[i]}"></button>
                `).join('')}
            </div>

            <div class="pd-section-title">Size (UK)</div>
            <div class="pd-sizes" id="pd-sizes">
                ${product.sizes.map(size => `
                    <button class="pd-size-btn" data-size="${size}" onclick="selectSize(this, ${size})">UK ${size}</button>
                `).join('')}
            </div>

            <div class="pd-actions">
                <div class="qty-selector">
                    <button class="qty-btn" onclick="changeQty(-1)">−</button>
                    <input type="text" class="qty-value" id="pd-qty" value="1" readonly>
                    <button class="qty-btn" onclick="changeQty(1)">+</button>
                </div>
                <button class="btn btn-primary btn-lg" id="add-to-cart-btn" onclick="addToCartPD()">
                    Add to Cart — ${Store.formatPrice(hasDiscount ? product.salePrice : product.price)}
                </button>
            </div>

            <div class="pd-secondary-actions">
                <button class="pd-wishlist-btn ${isWished ? 'active' : ''}" id="pd-wishlist-btn" onclick="toggleWishlistPD()">
                    <svg viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    ${isWished ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
            </div>

            <div class="pd-details">
                <div class="pd-detail-item">
                    <button class="pd-detail-toggle open" onclick="toggleDetail(this)">
                        Product Details
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="pd-detail-content open">
                        <ul>
                            <li>Premium ${product.category.toLowerCase()} shoe designed for ${product.gender.toLowerCase()}</li>
                            <li>Breathable mesh upper for all-day comfort</li>
                            <li>Cushioned midsole with energy return technology</li>
                            <li>Durable rubber outsole with superior traction</li>
                            <li>Available in ${product.colors.length} color${product.colors.length > 1 ? 's' : ''}</li>
                        </ul>
                    </div>
                </div>
                <div class="pd-detail-item">
                    <button class="pd-detail-toggle" onclick="toggleDetail(this)">
                        Shipping & Returns
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="pd-detail-content">
                        <ul>
                            <li>Free shipping on orders over ₹4,999</li>
                            <li>Standard delivery: 5-7 business days</li>
                            <li>Express delivery: 2-3 business days</li>
                            <li>30-day hassle-free returns</li>
                            <li>Free return shipping on all orders</li>
                        </ul>
                    </div>
                </div>
                <div class="pd-detail-item">
                    <button class="pd-detail-toggle" onclick="toggleDetail(this)">
                        Reviews (${product.reviews})
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="pd-detail-content">
                        <p><strong>${product.rating}/5</strong> based on ${product.reviews} reviews</p>
                        <p style="margin-top: 8px; color: var(--gray-400);">Customer reviews will appear here once verified purchases are made.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('product-detail').innerHTML = detailHTML;

    // Related products
    const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 4);
    document.getElementById('related-products').innerHTML = related.map(renderProductCard).join('');

    // Global functions
    window.switchColor = function(colorIndex) {
        selectedColor = colorIndex;
        const mainImage = document.getElementById('pd-main-image');
        const badge = mainImage.querySelector('.discount-badge');
        mainImage.innerHTML = (badge ? badge.outerHTML : '') + renderShoeSVG(colorIndex);

        document.querySelectorAll('.pd-color-swatch').forEach((s, i) => s.classList.toggle('active', i === colorIndex));
        document.querySelectorAll('.pd-thumb').forEach((t, i) => t.classList.toggle('active', i === colorIndex));

        // Update color label
        const colorLabel = document.querySelector('.pd-section-title');
        if (colorLabel) colorLabel.textContent = `Color — ${product.colors[colorIndex]}`;
    };

    window.selectSize = function(btn, size) {
        selectedSize = size;
        document.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };

    window.changeQty = function(delta) {
        qty = Math.max(1, qty + delta);
        document.getElementById('pd-qty').value = qty;
        const price = hasDiscount ? product.salePrice : product.price;
        document.getElementById('add-to-cart-btn').textContent = `Add to Cart — ${Store.formatPrice(price * qty)}`;
    };

    window.addToCartPD = function() {
        if (!selectedSize) {
            Store.showToast('Please select a size first!', 'error');
            document.getElementById('pd-sizes').style.animation = 'pulse 0.4s ease';
            setTimeout(() => document.getElementById('pd-sizes').style.animation = '', 400);
            return;
        }
        Store.addToCart(product.id, selectedSize, qty);
    };

    window.toggleWishlistPD = function() {
        Store.toggleWishlist(product.id);
        const btn = document.getElementById('pd-wishlist-btn');
        const isNowWished = Store.isInWishlist(product.id);
        btn.classList.toggle('active', isNowWished);
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="${isNowWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${isNowWished ? 'Added to Wishlist' : 'Add to Wishlist'}
        `;
    };

    window.toggleDetail = function(btn) {
        btn.classList.toggle('open');
        const content = btn.nextElementSibling;
        content.classList.toggle('open');
    };
});
