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
  let isTransitioning = false; // Флаг для предотвращения наложения переходов

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
    if (isTransitioning) return; // Предотвращаем наложение переходов
    isTransitioning = true;

    slideWidth = window.innerWidth <= 767 ? 375 : 1201 + 40;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    const dots = document.querySelectorAll('#pagination .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Разрешаем следующий переход после завершения текущего
    setTimeout(() => {
      isTransitioning = false;
    }, 500); // Длительность перехода (соответствует transition: 0.5s)
  }

  function addSlide({ imageUrl, title, date, venue, price, age, link, pushkinCard }) {
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    newSlide.style.backgroundImage = `url(${imageUrl})`;
    newSlide.setAttribute('data-link', link);

    // Добавляем div.price-icon всегда, но с классом hidden, если pushkinCard === false
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

  // Auto-slide functionality
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval); // Очищаем существующий интервал
    autoSlideInterval = setInterval(() => {
      if (!isTransitioning) {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
      }
    }, 7000); // 7 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Останавливаем автопрокрутку
    startAutoSlide(); // Перезапускаем с новым интервалом
  }

  // Load slides from slidesData
  slidesData.forEach(slide => addSlide(slide));
  createPagination();
  updateSlider();
  startAutoSlide(); // Start auto-slide on page load

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
    if (isTransitioning) return; // Предотвращаем наложение переходов
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