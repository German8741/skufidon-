document.addEventListener('DOMContentLoaded', () => {
  // Force reload styles to avoid caching issues
  const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
  styleSheets.forEach(sheet => {
    const href = sheet.href;
    sheet.href = `${href}?v=${Date.now()}`;
  });

  // Mobile Menu
  const burger = document.querySelector('.header__burger');
  const close = document.querySelector('.mobile-menu__close');
  const mobilePage = document.querySelector('.header__mobile-page');
  const overlay = document.querySelector('.menu-overlay');

  if (burger && close && mobilePage && overlay) {
    burger.addEventListener('click', () => {
      mobilePage.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      mobilePage.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    overlay.addEventListener('click', () => {
      mobilePage.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    document.querySelectorAll('.header__mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobilePage.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  } else {
    console.warn('One or more menu elements not found');
  }

  // Slider
  const slider = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (slider && slides.length && dots.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 40;

    function updateSlider() {
      slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  } else {
    console.warn('One or more slider elements not found');
  }
});