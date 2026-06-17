/* =========================================
   RANGE — Shop Page JS
   Filtering, sorting, URL params, sidebar
   ========================================= */

let currentFilters = {
    gender: null,
    category: null,
    sale: false,
    search: null,
    sort: 'recommended',
    minPrice: null,
    maxPrice: null
};

document.addEventListener('DOMContentLoaded', () => {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);

    if (params.get('cat')) currentFilters.category = params.get('cat');
    if (params.get('gender')) currentFilters.gender = params.get('gender');
    if (params.get('sale') === 'true') currentFilters.sale = true;
    if (params.get('q')) currentFilters.search = params.get('q');
    if (params.get('sort')) currentFilters.sort = params.get('sort');

    // Set sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && currentFilters.sort) {
        sortSelect.value = currentFilters.sort;
    }

    // Update page title based on filters
    updatePageTitle();

    // Render products
    renderShopProducts();

    // Highlight active filter buttons
    updateFilterBtnStates();

    // =========================================
    // Filter Button Quick Toggles
    // =========================================
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            const filterValue = btn.dataset.value;

            if (currentFilters[filterType] === filterValue) {
                currentFilters[filterType] = null;
            } else {
                currentFilters[filterType] = filterValue;
            }

            updateFilterBtnStates();
            renderShopProducts();
            updatePageTitle();
        });
    });

    // =========================================
    // Sort Select
    // =========================================
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentFilters.sort = sortSelect.value;
            renderShopProducts();
        });
    }

    // =========================================
    // Filter Sidebar
    // =========================================
    const openFilters = document.getElementById('open-filters');
    const filterSidebar = document.getElementById('filter-sidebar');
    const filterOverlay = document.getElementById('filter-overlay');
    const closeFilters = document.getElementById('close-filters');

    if (openFilters && filterSidebar) {
        openFilters.addEventListener('click', () => {
            filterSidebar.classList.add('active');
            filterOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeSidebar = () => {
            filterSidebar.classList.remove('active');
            filterOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeFilters) closeFilters.addEventListener('click', closeSidebar);
        if (filterOverlay) filterOverlay.addEventListener('click', closeSidebar);
    }

    // Size filter buttons
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // =========================================
    // View Toggle
    // =========================================
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const grid = document.getElementById('shop-products');
            if (btn.dataset.view === 'list') {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            } else {
                grid.style.gridTemplateColumns = '';
            }
        });
    });
});

function renderShopProducts() {
    const grid = document.getElementById('shop-products');
    const noResults = document.getElementById('no-results');
    const countEl = document.getElementById('product-count');

    const products = Store.getFilteredProducts(currentFilters);

    if (products.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = '';
        noResults.style.display = 'none';
        
        const cards = products.map(renderProductCard);
        
        // Dynamically inject the collab card if not searching, and gender filter is 'men' or null
        if (!currentFilters.search && (!currentFilters.gender || currentFilters.gender === 'men')) {
            const showcaseHtml = `
                <div class="collab-grid-showcase" onclick="window.location.href='product.html?id=18'">
                    <div class="collab-grid-showcase-image">
                        <img src="imgs/prime.jpg" alt="RANGE x THE BOYS COLLAB" class="collab-grid-showcase-img">
                    </div>
                    <div class="collab-grid-showcase-content">
                        <span class="collab-grid-showcase-tag">RANGE x THE BOYS</span>
                        <h3 class="collab-grid-showcase-title">Prime Special Edition</h3>
                        <p class="collab-grid-showcase-desc">Get the exclusive RANGE x THE BOYS drop engineered in collaboration with Vought.</p>
                        <span class="collab-grid-showcase-btn">Shop The Drop</span>
                    </div>
                </div>
            `;
            const insertIndex = Math.min(4, cards.length);
            cards.splice(insertIndex, 0, showcaseHtml);
        }
        
        grid.innerHTML = cards.join('');
    }

    if (countEl) {
        countEl.textContent = `${products.length} PRODUCT${products.length !== 1 ? 'S' : ''}`;
    }
}

function updateFilterBtnStates() {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;
        btn.classList.toggle('active', currentFilters[filterType] === filterValue);
    });
}

function updatePageTitle() {
    const titleEl = document.getElementById('shop-title');
    const breadcrumbEl = document.getElementById('breadcrumb-current');

    let title = 'ALL SHOES';

    if (currentFilters.search) {
        title = `SEARCH: "${currentFilters.search.toUpperCase()}"`;
    } else if (currentFilters.gender && currentFilters.category) {
        title = `${currentFilters.gender.toUpperCase()}'S ${currentFilters.category.toUpperCase()} SHOES`;
    } else if (currentFilters.gender) {
        title = `${currentFilters.gender.toUpperCase()}'S SHOES`;
    } else if (currentFilters.category) {
        title = `${currentFilters.category.toUpperCase()} SHOES`;
    } else if (currentFilters.sale) {
        title = 'SALE';
    }

    if (titleEl) titleEl.textContent = title;
    if (breadcrumbEl) breadcrumbEl.textContent = title.replace(/'/g, "'");
    document.title = `${title} — RANGE`;
}

function clearAllFilters() {
    currentFilters = {
        gender: null,
        category: null,
        sale: false,
        search: null,
        sort: 'recommended',
        minPrice: null,
        maxPrice: null
    };

    // Clear sidebar checkboxes
    document.querySelectorAll('#filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.size-option').forEach(s => s.classList.remove('active'));
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'recommended';

    updateFilterBtnStates();
    renderShopProducts();
    updatePageTitle();

    // Close sidebar
    document.getElementById('filter-sidebar').classList.remove('active');
    document.getElementById('filter-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function applyFilters() {
    // Read sidebar filters
    const genderChecks = document.querySelectorAll('#filter-sidebar input[name="gender"]:checked');
    const catChecks = document.querySelectorAll('#filter-sidebar input[name="category"]:checked');
    const saleCheck = document.getElementById('sale-filter');
    const minPrice = document.getElementById('price-min');
    const maxPrice = document.getElementById('price-max');

    if (genderChecks.length === 1) {
        currentFilters.gender = genderChecks[0].value;
    } else {
        currentFilters.gender = null;
    }

    if (catChecks.length === 1) {
        currentFilters.category = catChecks[0].value;
    } else {
        currentFilters.category = null;
    }

    currentFilters.sale = saleCheck ? saleCheck.checked : false;
    currentFilters.minPrice = minPrice && minPrice.value ? parseInt(minPrice.value) : null;
    currentFilters.maxPrice = maxPrice && maxPrice.value ? parseInt(maxPrice.value) : null;

    updateFilterBtnStates();
    renderShopProducts();
    updatePageTitle();

    // Close sidebar
    document.getElementById('filter-sidebar').classList.remove('active');
    document.getElementById('filter-overlay').classList.remove('active');
    document.body.style.overflow = '';
}
