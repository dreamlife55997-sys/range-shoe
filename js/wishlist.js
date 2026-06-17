/* =========================================
   RANGE — Wishlist Page JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    document.addEventListener('wishlistUpdated', renderWishlist);
});

function renderWishlist() {
    const wishlist = Store.getWishlist();
    const grid = document.getElementById('wishlist-grid');
    const empty = document.getElementById('empty-wishlist');
    const title = document.getElementById('wishlist-title');

    if (wishlist.length === 0) {
        grid.style.display = 'none';
        empty.style.display = '';
    } else {
        grid.style.display = '';
        empty.style.display = 'none';

        const products = wishlist.map(id => Store.getProduct(id)).filter(Boolean);
        grid.innerHTML = products.map(renderProductCard).join('');
    }

    if (title) {
        title.textContent = `WISHLIST (${wishlist.length})`;
    }
}
