document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.header__burger');
    const closeButton = document.querySelector('.mobile-menu__close');
    const mobileMenu = document.querySelector('.header__mobile-page');
    const overlay = document.querySelector('.menu-overlay');
  
    function openMenu() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeMenu() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    burgerButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
  });