function initSlider() {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pagination = document.getElementById('pagination');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let slideWidth = window.innerWidth <= 767 ? 375 : 1201 + 40;
  let totalSlides = slides.length;
  let autoSlideInterval;
  let isTransitioning = false;

  function createPagination() {
    pagination.innerHTML = ''; // Clear existing dots
    slides = document.querySelectorAll('.slide'); // Update slides
    totalSlides = slides.length;
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        if (!isTransitioning) {
          currentIndex = i;
          updateSlider();
          resetAutoSlide();
        }
      });
      pagination.appendChild(dot);
    }
  }

  function updateSlider() {
    if (isTransitioning) return;
    isTransitioning = true;

    slideWidth = window.innerWidth <= 767 ? 375 : 1201 + 40;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    const dots = document.querySelectorAll('#pagination .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function addSlide({ imageUrl, title, date, venue, price, age, link, pushkinCard }) {
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    newSlide.style.backgroundImage = `url(${imageUrl})`;
    newSlide.setAttribute('data-link', link);

    const priceIconClass = pushkinCard ? '' : 'hidden';

    newSlide.innerHTML = `
      <div class="price-container">
        <div class="price-icon ${priceIconClass}"><img src="../assets/svg_icons/pushkin.png" /></div>
        <div class="price-box"><div class="price-text">${price}</div></div>
      </div>
      <div class="event-info">
        <div class="event-title">${title}</div>
        <div class="event-details">
          <div class="event-detail">${date}</div>
          <div class="dot-separator"></div>
          <div class="event-detail">${venue}</div>
        </div>
      </div>
      <div class="age-restriction"><div class="age-text">${age}</div></div>
    `;
    slider.appendChild(newSlide);
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isTransitioning) {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
      }
    }, 7000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Очищаем слайдер перед добавлением новых слайдов
  slider.innerHTML = '';

  // Проверяем, существует ли window.slidesData
  if (window.slidesData && Array.isArray(window.slidesData)) {
    const filteredSlides = window.slidesData.filter(slide => slide.watchSlider === true);
    console.log('Filtered slides:', filteredSlides); // Для отладки
    filteredSlides.forEach(slide => addSlide(slide));
  } else {
    console.error('slidesData is not defined or not an array');
  }

  createPagination();
  updateSlider();
  startAutoSlide();

  prevButton.addEventListener('click', () => {
    if (!isTransitioning) {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      updateSlider();
      resetAutoSlide();
    }
  });

  nextButton.addEventListener('click', () => {
    if (!isTransitioning) {
      currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      updateSlider();
      resetAutoSlide();
    }
  });

  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      if (!e.target.closest('#prev') && !e.target.closest('#next') && !e.target.closest('.dot')) {
        const link = slide.getAttribute('data-link');
        if (link) {
          window.location.href = link;
        }
      }
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetAutoSlide();
  });

  function handleSwipe() {
    if (isTransitioning) return;
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      updateSlider();
    } else if (swipeDistance < -minSwipeDistance) {
      currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      updateSlider();
    }
  }

  window.addEventListener('resize', () => {
    updateSlider();
  });
}

// Функция для управления афишами (заглушка для будущего расширения)
function initPosters() {
  console.log('Инициализация афиш...');
}

// Экспорт функций для управления различными блоками
const manager = {
  initSlider,
  initPosters
};