document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger');
  const close = document.querySelector('.mobile-menu__close');
  const mobilePage = document.querySelector('.header__mobile-page');
  const overlay = document.querySelector('.menu-overlay');

  if (burger && close && mobilePage && overlay) {
    burger.addEventListener('click', () => {
      mobilePage.classList.add('active');
      overlay.classList.add('active');
    });

    close.addEventListener('click', () => {
      mobilePage.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      mobilePage.classList.remove('active');
      overlay.classList.remove('active');
    });

    document.querySelectorAll('.header__mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobilePage.classList.remove('active');
        overlay.classList.remove('active');
      });
    });
  } else {
    console.warn('One or more menu elements not found');
  }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
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
        if(currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if(currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
});