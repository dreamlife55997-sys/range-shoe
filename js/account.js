/* =========================================
   RANGE — Account Page JS
   Login, Register, Dashboard, Tabs
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const user = Store.getUser();

    if (user) {
        showDashboard(user);
    } else {
        showAuth();
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (email && password) {
                const user = Store.login(email, password);
                showDashboard(user);
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            if (name && email && password) {
                const user = Store.register(name, email, password);
                showDashboard(user);
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Store.logout();
            showAuth();
        });
    }

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tab = document.getElementById(`tab-${btn.dataset.tab}`);
            if (tab) tab.classList.add('active');
        });
    });

    // Address form
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Store.showToast('Address saved successfully!', 'success');
            addressForm.reset();
        });
    }
});

function showAuth() {
    document.getElementById('auth-section').style.display = '';
    document.getElementById('dashboard-section').style.display = 'none';
}

function showDashboard(user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = '';

    // Populate user info
    document.getElementById('dashboard-name').textContent = user.name;
    document.getElementById('dashboard-email').textContent = user.email;
    document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();

    // Update counts
    document.getElementById('dash-wishlist-count').textContent = `${Store.getWishlist().length} items saved`;
    document.getElementById('dash-cart-count').textContent = `${Store.getCartCount()} items in cart`;
}
