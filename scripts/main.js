document.addEventListener('DOMContentLoaded', () => {
  // Function to load header
  const headerElements = document.querySelectorAll('xai-header');
  if (headerElements.length > 0) {
    fetch('header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load header.html: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        headerElements.forEach(element => {
          element.outerHTML = data;
        });
        initializeBurgerMenu();
      })
      .catch(error => console.error('Error loading header:', error));
  } else {
    initializeBurgerMenu();
  }

  function initializeBurgerMenu() {
    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.mobile-menu__close');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    if (burger && close && mobileMenu) {
      burger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
      close.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
      const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
        });
      });
    } else {
      console.warn('Burger menu, close button, or mobile menu not found');
    }
  }
});