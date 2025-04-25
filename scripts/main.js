document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize burger menu
  function initializeBurgerMenu() {
    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.mobile-menu__close');
    const mobilePage = document.querySelector('.header__mobile-page');
    const overlay = document.querySelector('.menu-overlay');
    if (burger && close && mobilePage && overlay) {
      burger.addEventListener('click', () => {
        mobilePage.classList.toggle('active');
        overlay.classList.toggle('active');
      });
      close.addEventListener('click', () => {
        mobilePage.classList.remove('active');
        overlay.classList.remove('active');
      });
      overlay.addEventListener('click', () => {
        mobilePage.classList.remove('active');
        overlay.classList.remove('active');
      });
      const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobilePage.classList.remove('active');
          overlay.classList.remove('active');
        });
      });
    } else {
      console.warn('Burger menu, close button, mobile page, or overlay not found');
    }
  }

  initializeBurgerMenu();
});