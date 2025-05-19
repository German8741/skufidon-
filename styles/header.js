document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.header__burger');
    const closeButton = document.querySelector('.mobile-menu__close');
    const mobileMenu = document.querySelector('.header__mobile-page');
    const overlay = document.querySelector('.menu-overlay');

    // Check if all required elements exist
    if (!burgerButton || !closeButton || !mobileMenu || !overlay) {
        console.warn('One or more header elements not found. Mobile menu may not function correctly.');
        return;
    }

    // Prevent multiple event listeners by removing existing ones
    const openMenu = () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Remove existing listeners to prevent duplicates
    burgerButton.removeEventListener('click', openMenu);
    closeButton.removeEventListener('click', closeMenu);
    overlay.removeEventListener('click', closeMenu);

    // Add event listeners
    burgerButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Handle window resize to close menu if switching to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when clicking mobile nav links
    const navLinks = document.querySelectorAll('.header__mobile-nav-link');
    navLinks.forEach(link => {
        link.removeEventListener('click', closeMenu); // Prevent duplicates
        link.addEventListener('click', closeMenu);
    });
});