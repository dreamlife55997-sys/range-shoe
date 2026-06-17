/* =========================================
   RANGE — Shared Components JS
   Nav, search, mobile menu, scroll reveal,
   page transitions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Page Transitions System
    // =========================================
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = '<div class="page-transition-logo">RANGE</div>';
    document.body.appendChild(overlay);

    document.body.classList.add('page-animating');

    setTimeout(() => {
        overlay.classList.add('active-logo');
    }, 50);

    setTimeout(() => {
        overlay.classList.add('fade-out');
        document.body.classList.remove('page-animating');
        document.body.classList.add('page-ready');
    }, 600);

    // Intercept navigation for smooth page exit
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        if (
            href && 
            !href.startsWith('#') && 
            !href.startsWith('javascript:') && 
            !href.startsWith('mailto:') && 
            !href.startsWith('tel:') && 
            (!target || target === '_self') &&
            (link.hostname === window.location.hostname || !link.hostname)
        ) {
            e.preventDefault();
            
            overlay.classList.remove('fade-out');
            overlay.classList.remove('active-logo');
            overlay.classList.add('fade-in');
            
            setTimeout(() => {
                overlay.classList.add('active-logo');
            }, 50);

            setTimeout(() => {
                window.location.href = href;
            }, 600);
        }
    });

    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.classList.add('fade-out');
            overlay.classList.remove('fade-in');
            document.body.classList.remove('page-animating');
            document.body.classList.add('page-ready');
        }
    });

    // =========================================
    // Announcement Bar Close
    // =========================================
    const announcementClose = document.getElementById('close-announcement');
    const announcementBar = document.getElementById('announcement-bar');

    if (announcementClose && announcementBar) {
        announcementClose.addEventListener('click', () => {
            announcementBar.classList.add('hidden');
            sessionStorage.setItem('sk_announcement_closed', 'true');
        });

        if (sessionStorage.getItem('sk_announcement_closed') === 'true') {
            announcementBar.classList.add('hidden');
        }
    }

    // =========================================
    // Search Toggle
    // =========================================
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.toggle('active');
            if (searchOverlay.classList.contains('active') && searchInput) {
                setTimeout(() => searchInput.focus(), 200);
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && searchInput.value.trim()) {
                    window.location.href = `shop.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                }
                if (e.key === 'Escape') {
                    searchOverlay.classList.remove('active');
                }
            });
        }

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (searchOverlay.classList.contains('active') &&
                !searchOverlay.contains(e.target) &&
                !searchToggle.contains(e.target)) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // =========================================
    // Mobile Menu
    // =========================================
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-menu-close');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // =========================================
    // Navbar scroll behavior
    // =========================================
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScrollY = scrollY;
        }, { passive: true });
    }

    // =========================================
    // Scroll Reveal Animation
    // =========================================
    const revealElements = document.querySelectorAll('.reveal, .product-card, .category-card, .feature-card');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // =========================================
    // Newsletter Form
    // =========================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            if (email && email.value) {
                Store.showToast('Thank you! You\'re now subscribed to our newsletter.', 'success');
                email.value = '';
            }
        });
    }

    // =========================================
    // Category Card Navigation
    // =========================================
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            if (category) {
                window.location.href = `shop.html?cat=${category}`;
            }
        });
    });

});
