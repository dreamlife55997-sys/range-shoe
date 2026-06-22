/* =========================================
   RANGE — Store Data & State Management
   Central data store, cart, wishlist, auth
   ========================================= */

// =========================================
// Product Catalog Data
// =========================================
const PRODUCTS = [
    {
        id: 1,
        name: "Velocity Pro Running Shoes",
        category: "Running",
        gender: "Men",
        price: 7999,
        salePrice: 5199,
        discount: 35,
        colors: ["Black/Neon", "White/Blue", "Gray"],
        colorHexes: ["#1a1a1a", "#f0f4ff", "#9ca3af"],
        sizes: [6, 7, 8, 9, 10, 11],
        rating: 4.7,
        reviews: 234,
        isNew: true,
        isTrending: true,
        image: "imgs/img1.webp",
        brand: "pro"
    },
    {
        id: 2,
        name: "Stride Max Casual Sneakers",
        category: "Casual",
        gender: "Men",
        price: 5999,
        salePrice: 3599,
        discount: 40,
        colors: ["White", "Black", "Navy", "Tan", "Olive"],
        colorHexes: ["#ffffff", "#1a1a1a", "#1e3a5f", "#d2b48c", "#556b2f"],
        sizes: [7, 8, 9, 10, 11],
        rating: 4.5,
        reviews: 189,
        isNew: false,
        isTrending: true,
        image: "imgs/img2.webp",
        brand: "plus"
    },
    {
        id: 3,
        name: "AirGlide Ultra Training Shoes",
        category: "Training",
        gender: "Men",
        price: 8999,
        salePrice: 4499,
        discount: 50,
        colors: ["Black/Red", "White/Black", "Gray/Lime", "Navy/Orange", "All Black"],
        colorHexes: ["#1a1a1a", "#f5f5f5", "#9ca3af", "#1e3a5f", "#0a0a0a"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        rating: 4.8,
        reviews: 412,
        isNew: false,
        isTrending: true,
        image: "imgs/img3.webp",
        brand: "pro"
    },
    {
        id: 4,
        name: "CloudWalk Men's Sport Lifestyle",
        category: "Lifestyle",
        gender: "Women",
        price: 6999,
        salePrice: 4899,
        discount: 30,
        colors: ["White/Pink", "All White", "Black", "Beige", "Lavender"],
        colorHexes: ["#fff0f5", "#ffffff", "#1a1a1a", "#f5f0e8", "#e6e0f5"],
        sizes: [4, 5, 6, 7, 8, 9],
        rating: 4.6,
        reviews: 167,
        isNew: true,
        isTrending: false,
        image: "imgs/img4.webp",
        brand: "plus"
    },
    {
        id: 5,
        name: "Blaze Runner Sports Shoes",
        category: "Sports",
        gender: "Men",
        price: 9999,
        salePrice: 6499,
        discount: 35,
        colors: ["Red/Black", "Blue/White", "Neon/Black"],
        colorHexes: ["#dc2626", "#2563eb", "#84cc16"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 523,
        isNew: false,
        isTrending: true,
        image: "imgs/img5.webp",
        brand: "pro"
    },
    {
        id: 6,
        name: "Urban Flex Men's Daily Trainer",
        category: "Casual",
        gender: "Women",
        price: 4999,
        salePrice: 2999,
        discount: 40,
        colors: ["Pastel Pink", "Mint", "White", "Black"],
        colorHexes: ["#fbb6ce", "#a7f3d0", "#ffffff", "#1a1a1a"],
        sizes: [4, 5, 6, 7, 8],
        rating: 4.4,
        reviews: 98,
        isNew: true,
        isTrending: false,
        image: "imgs/img6.webp",
        brand: "plus"
    },
    {
        id: 7,
        name: "Trail Storm Hiking Shoes",
        category: "Trail",
        gender: "Men",
        price: 11999,
        salePrice: 8399,
        discount: 30,
        colors: ["Olive/Brown", "Black/Orange", "Gray"],
        colorHexes: ["#556b2f", "#1a1a1a", "#6b7280"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.7,
        reviews: 201,
        isNew: false,
        isTrending: false,
        image: "imgs/img7.webp",
        brand: "pro"
    },
    {
        id: 8,
        name: "Nitro Speed Racing Shoes",
        category: "Running",
        gender: "Men",
        price: 14999,
        salePrice: 9749,
        discount: 35,
        colors: ["Hot Pink/Black", "Neon Yellow", "White/Blue"],
        colorHexes: ["#ec4899", "#facc15", "#dbeafe"],
        sizes: [7, 8, 9, 10, 11],
        rating: 4.9,
        reviews: 678,
        isNew: true,
        isTrending: true,
        image: "imgs/img8.webp",
        brand: "pro"
    },
    {
        id: 9,
        name: "Classic Court Men's Sport",
        category: "Lifestyle",
        gender: "Unisex",
        price: 5499,
        salePrice: null,
        discount: 0,
        colors: ["White/Green", "White/Navy", "All White"],
        colorHexes: ["#f0fff4", "#f0f4ff", "#ffffff"],
        sizes: [5, 6, 7, 8, 9, 10, 11],
        rating: 4.3,
        reviews: 145,
        isNew: false,
        isTrending: false,
        image: "imgs/img1.webp",
        brand: "plus"
    },
    {
        id: 10,
        name: "Power Surge Training Pro",
        category: "Training",
        gender: "Men",
        price: 8499,
        salePrice: 5949,
        discount: 30,
        colors: ["Black/Volt", "White/Red", "Navy"],
        colorHexes: ["#1a1a1a", "#fff5f5", "#1e3a5f"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.6,
        reviews: 312,
        isNew: false,
        isTrending: true,
        image: "imgs/img2.webp",
        brand: "pro"
    },
    {
        id: 11,
        name: "Breeze Walk Men's Performance Runner",
        category: "Running",
        gender: "Women",
        price: 6999,
        salePrice: 3849,
        discount: 45,
        colors: ["Coral", "Sky Blue", "White", "Black/Pink"],
        colorHexes: ["#f87171", "#7dd3fc", "#ffffff", "#1a1a1a"],
        sizes: [4, 5, 6, 7, 8],
        rating: 4.5,
        reviews: 189,
        isNew: true,
        isTrending: false,
        image: "imgs/img3.webp",
        brand: "pro"
    },
    {
        id: 12,
        name: "Retro Glide Men's Sport",
        category: "Lifestyle",
        gender: "Unisex",
        price: 4999,
        salePrice: 3499,
        discount: 30,
        colors: ["White/Red", "Black/White", "Navy/Gold"],
        colorHexes: ["#fff5f5", "#1a1a1a", "#1e3a5f"],
        sizes: [5, 6, 7, 8, 9, 10, 11],
        rating: 4.2,
        reviews: 87,
        isNew: false,
        isTrending: false,
        image: "imgs/img4.webp",
        brand: "plus"
    },
    {
        id: 13,
        name: "Spark Men's Running Shoes",
        category: "Running",
        gender: "Kids",
        price: 3499,
        salePrice: 2449,
        discount: 30,
        colors: ["Blue/Orange", "Pink/Purple", "Green/Yellow"],
        colorHexes: ["#3b82f6", "#ec4899", "#22c55e"],
        sizes: [1, 2, 3, 4, 5],
        rating: 4.8,
        reviews: 256,
        isNew: true,
        isTrending: true,
        image: "imgs/img5.webp",
        brand: "plus"
    },
    {
        id: 14,
        name: "Elite Marathon Racer",
        category: "Running",
        gender: "Men",
        price: 19999,
        salePrice: 12999,
        discount: 35,
        colors: ["Carbon/Neon", "White/Silver"],
        colorHexes: ["#374151", "#f8fafc"],
        sizes: [7, 8, 9, 10, 11],
        rating: 4.9,
        reviews: 892,
        isNew: false,
        isTrending: true,
        image: "imgs/img6.webp",
        brand: "pro"
    },
    {
        id: 15,
        name: "Comfy Men's Sport Slide",
        category: "Casual",
        gender: "Women",
        price: 2999,
        salePrice: 1649,
        discount: 45,
        colors: ["Blush", "Sage", "Cream", "Black"],
        colorHexes: ["#fecdd3", "#d1fae5", "#fef3c7", "#1a1a1a"],
        sizes: [4, 5, 6, 7, 8],
        rating: 4.3,
        reviews: 134,
        isNew: false,
        isTrending: false,
        image: "imgs/img7.webp",
        brand: "plus"
    },
    {
        id: 16,
        name: "Fusion Men's Track & Field",
        category: "Sports",
        gender: "Unisex",
        price: 7999,
        salePrice: 5599,
        discount: 30,
        colors: ["Rainbow/White", "All Black", "Red/Blue"],
        colorHexes: ["#fef3c7", "#0a0a0a", "#dc2626"],
        sizes: [5, 6, 7, 8, 9, 10, 11, 12],
        rating: 4.7,
        reviews: 345,
        isNew: true,
        isTrending: false,
        image: "imgs/img8.webp",
        brand: "pro"
    },
    {
        id: 17,
        name: "RANGE x THE BOYS: Homelander Special Edition",
        category: "Lifestyle",
        gender: "Men",
        price: 12999,
        salePrice: null,
        discount: 0,
        colors: ["Heroic Blue/Gold/Red"],
        colorHexes: ["#1e3a8a"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 5.0,
        reviews: 742,
        isNew: true,
        isTrending: true,
        image: "imgs/landing.png",
        brand: "collab"
    },
    {
        id: 18,
        name: "RANGE x THE BOYS: Butcher Special Edition",
        category: "Training",
        gender: "Men",
        price: 13999,
        salePrice: null,
        discount: 0,
        colors: ["Tactical Black/Blood Red"],
        colorHexes: ["#1a1a1a"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 124,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/butcher.png",
        brand: "collab"
    },
    {
        id: 19,
        name: "RANGE x THE BOYS: Frenchie Special Edition",
        category: "Sports",
        gender: "Men",
        price: 10999,
        salePrice: null,
        discount: 0,
        colors: ["Bohemian Khaki/Olive"],
        colorHexes: ["#556b2f"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.7,
        reviews: 84,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/frenche-shoe.png",
        brand: "collab"
    },
    {
        id: 20,
        name: "RANGE x THE BOYS: Kimiko Special Edition",
        category: "Sports",
        gender: "Men",
        price: 11499,
        salePrice: null,
        discount: 0,
        colors: ["Midnight Shadow/Crimson"],
        colorHexes: ["#111827"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 94,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/kimiko edition.png",
        brand: "collab"
    },
    {
        id: 21,
        name: "RANGE x THE BOYS: M.M. Tactical Edition",
        category: "Training",
        gender: "Men",
        price: 11999,
        salePrice: null,
        discount: 0,
        colors: ["Tactical Army Green/Black"],
        colorHexes: ["#2f4f4f"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 132,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/mother-milk-shoe.png",
        brand: "collab"
    },
    {
        id: 22,
        name: "RANGE x THE BOYS: A-Train Special Edition",
        category: "Running",
        gender: "Men",
        price: 11999,
        salePrice: null,
        discount: 0,
        colors: ["Lightning Blue/Silver"],
        colorHexes: ["#1e40af"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.8,
        reviews: 147,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/a-train-shoe.png",
        brand: "collab"
    },
    {
        id: 23,
        name: "RANGE x THE BOYS: Black Noir Special Edition",
        category: "Training",
        gender: "Men",
        price: 12999,
        salePrice: null,
        discount: 0,
        colors: ["Noir Pitch Black"],
        colorHexes: ["#09090b"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 165,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/black-noir.png",
        brand: "collab"
    },
    {
        id: 24,
        name: "RANGE x THE BOYS: The Deep Special Edition",
        category: "Sports",
        gender: "Men",
        price: 10999,
        salePrice: null,
        discount: 0,
        colors: ["Deep Ocean Teal/Gold"],
        colorHexes: ["#0d9488"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.6,
        reviews: 92,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/deep-shoe.png",
        brand: "collab"
    },
    {
        id: 25,
        name: "RANGE x THE BOYS: Queen Maeve Special Edition",
        category: "Sports",
        gender: "Men",
        price: 11999,
        salePrice: null,
        discount: 0,
        colors: ["Maeve Crimson/Silver"],
        colorHexes: ["#b91c1c"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.8,
        reviews: 110,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/queen-mave-shoe.png",
        brand: "collab"
    },
    {
        id: 26,
        name: "RANGE x THE BOYS: Terror Special Edition",
        category: "Casual",
        gender: "Men",
        price: 8999,
        salePrice: null,
        discount: 0,
        colors: ["Terror Bulldog Brown/Black"],
        colorHexes: ["#78350f"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.7,
        reviews: 73,
        isNew: true,
        isTrending: true,
        image: "the boys shoes/terror.png",
        brand: "collab"
    }
];


// =========================================
// State Management with localStorage
// =========================================
const Store = {
    // Cart
    getCart() {
        try {
            return JSON.parse(localStorage.getItem('sk_cart')) || [];
        } catch { return []; }
    },

    saveCart(cart) {
        localStorage.setItem('sk_cart', JSON.stringify(cart));
        Store.updateCartCount();
        document.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    },

    addToCart(productId, size = null, qty = 1) {
        const cart = Store.getCart();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const selectedSize = size || product.sizes[0];
        const existing = cart.find(item => item.productId === productId && item.size === selectedSize);

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ productId, size: selectedSize, qty, addedAt: Date.now() });
        }

        Store.saveCart(cart);
        Store.showToast(`${product.name} added to cart!`, 'success');
    },

    removeFromCart(productId, size) {
        let cart = Store.getCart();
        cart = cart.filter(item => !(item.productId === productId && item.size === size));
        Store.saveCart(cart);
    },

    updateCartQty(productId, size, qty) {
        const cart = Store.getCart();
        const item = cart.find(i => i.productId === productId && i.size === size);
        if (item) {
            item.qty = Math.max(1, qty);
            Store.saveCart(cart);
        }
    },

    getCartTotal() {
        const cart = Store.getCart();
        return cart.reduce((total, item) => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            if (!product) return total;
            const price = product.salePrice || product.price;
            return total + (price * item.qty);
        }, 0);
    },

    getCartCount() {
        return Store.getCart().reduce((sum, item) => sum + item.qty, 0);
    },

    updateCartCount() {
        const count = Store.getCartCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    // Wishlist
    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem('sk_wishlist')) || [];
        } catch { return []; }
    },

    saveWishlist(wishlist) {
        localStorage.setItem('sk_wishlist', JSON.stringify(wishlist));
        Store.updateWishlistCount();
        document.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlist }));
    },

    toggleWishlist(productId) {
        let wishlist = Store.getWishlist();
        const index = wishlist.indexOf(productId);
        const product = PRODUCTS.find(p => p.id === productId);

        if (index > -1) {
            wishlist.splice(index, 1);
            Store.showToast(`Removed from wishlist`, 'success');
        } else {
            wishlist.push(productId);
            Store.showToast(`${product?.name || 'Item'} added to wishlist!`, 'success');
        }

        Store.saveWishlist(wishlist);
    },

    isInWishlist(productId) {
        return Store.getWishlist().includes(productId);
    },

    updateWishlistCount() {
        const count = Store.getWishlist().length;
        document.querySelectorAll('.wishlist-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    // User Account
    getUser() {
        try {
            return JSON.parse(localStorage.getItem('sk_user')) || null;
        } catch { return null; }
    },

    saveUser(user) {
        localStorage.setItem('sk_user', JSON.stringify(user));
    },

    login(email, password) {
        // Simulated login
        const user = {
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email: email,
            joinDate: new Date().toISOString(),
            orders: []
        };
        Store.saveUser(user);
        Store.showToast('Welcome back! You are now signed in.', 'success');
        return user;
    },

    register(name, email, password) {
        const user = {
            name: name,
            email: email,
            joinDate: new Date().toISOString(),
            orders: []
        };
        Store.saveUser(user);
        Store.showToast('Account created successfully!', 'success');
        return user;
    },

    logout() {
        localStorage.removeItem('sk_user');
        Store.showToast('You have been signed out.', 'success');
    },

    // Toast Notifications
    showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✓' : '✕'}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    },

    // Product helpers
    getProduct(id) {
        return PRODUCTS.find(p => p.id === id);
    },

    formatPrice(price) {
        return '₹' + price.toLocaleString('en-IN');
    },

    getFilteredProducts(filters = {}) {
        let products = [...PRODUCTS];

        if (filters.category) {
            products = products.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters.gender) {
            products = products.filter(p => p.gender.toLowerCase() === filters.gender.toLowerCase() || p.gender === 'Unisex');
        }
        if (filters.sale) {
            products = products.filter(p => p.salePrice !== null);
        }
        if (filters.minPrice) {
            products = products.filter(p => (p.salePrice || p.price) >= filters.minPrice);
        }
        if (filters.maxPrice) {
            products = products.filter(p => (p.salePrice || p.price) <= filters.maxPrice);
        }
        if (filters.brand) {
            products = products.filter(p => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase());
        }

        if (filters.search) {
            const q = filters.search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.gender.toLowerCase().includes(q) ||
                (p.brand && p.brand.toLowerCase().includes(q))
            );
        }

        // Sort
        switch (filters.sort) {
            case 'price-low':
                products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'price-high':
                products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'newest':
                products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'trending':
                products.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
                break;
            default: // recommended
                products.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.rating - a.rating);
        }

        return products;
    }
};

function getGenderLabel(gender) {
    const map = {
        'Men': "Men's Pro",
        'Women': "Men's Elite",
        'Kids': "Men's Trail",
        'Unisex': "Men's Classic"
    };
    return map[gender] || "Men's Sport";
}

// =========================================
// Product Card Renderer
// =========================================
function renderProductCard(product) {
    const isWished = Store.isInWishlist(product.id);
    const hasDiscount = product.salePrice !== null;

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${hasDiscount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                <button class="product-wishlist ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); Store.toggleWishlist(${product.id}); this.classList.toggle('active');" aria-label="Toggle wishlist">
                    <svg viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <div class="product-placeholder">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-card-img" style="width: 100%; height: 100%; object-fit: contain; padding: 12px; transition: transform var(--transition-slow);">` : `
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="100" cy="135" rx="70" ry="10" fill="${product.colorHexes[0] === '#ffffff' ? '#e5e5e5' : '#f0f0f0'}"/>
                        <path d="M30 100 C30 75, 55 50, 100 50 C145 50, 170 70, 180 90 L180 110 C180 116, 174 120, 168 120 L42 120 C36 120, 30 116, 30 110 Z" fill="${product.colorHexes[0]}"/>
                        <path d="M50 90 C60 70, 90 55, 140 60 L160 80 L50 100 Z" fill="${adjustColor(product.colorHexes[0], 30)}"/>
                        <path d="M30 110 L180 110 L180 118 C180 122, 176 125, 172 125 L38 125 C34 125, 30 122, 30 118 Z" fill="#e5e5e5"/>
                    </svg>
                    `}
                </div>
                <button class="product-quick-add" onclick="event.stopPropagation(); Store.addToCart(${product.id})">Add to Cart</button>
            </div>
            <div class="product-info" onclick="window.location.href='product.html?id=${product.id}'">
                <div class="product-colors">${product.colors.length} COLORS</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-category">${getGenderLabel(product.gender)} ${product.category}</div>
                <div class="product-price">
                    ${hasDiscount
                        ? `<span class="price-current">${Store.formatPrice(product.salePrice)}</span>
                           <span class="price-original">${Store.formatPrice(product.price)}</span>`
                        : `<span class="price-current price-no-sale">${Store.formatPrice(product.price)}</span>`
                    }
                </div>
                <div class="product-swatches">
                    ${product.colorHexes.slice(0, 4).map((hex, i) =>
                        `<span class="color-swatch ${i === 0 ? 'active' : ''}" style="background: ${hex}; ${hex === '#ffffff' ? 'border-color: #d4d4d4;' : ''}"></span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Color utility
function adjustColor(hex, amount) {
    if (hex === '#ffffff') return '#f0f0f0';
    if (hex === '#1a1a1a' || hex === '#0a0a0a') return '#333333';
    try {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.min(255, r + amount);
        g = Math.min(255, g + amount);
        b = Math.min(255, b + amount);
        return `rgb(${r}, ${g}, ${b})`;
    } catch {
        return '#666666';
    }
}

// Initialize counts on load
document.addEventListener('DOMContentLoaded', () => {
    Store.updateCartCount();
    Store.updateWishlistCount();
});
