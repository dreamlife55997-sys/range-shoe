/* =========================================
   RANGE — Landing Page JS
   Populates trending & new arrival grids
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Render Trending Products
    const trendingGrid = document.getElementById('trending-products');
    if (trendingGrid) {
        const trending = Store.getFilteredProducts({ sort: 'trending' }).slice(0, 4);
        trendingGrid.innerHTML = trending.map(renderProductCard).join('');
    }

    // Render New Arrivals
    const newGrid = document.getElementById('new-arrival-products');
    if (newGrid) {
        const newArrivals = Store.getFilteredProducts({ sort: 'newest' }).slice(0, 4);
        newGrid.innerHTML = newArrivals.map(renderProductCard).join('');
    }

});
