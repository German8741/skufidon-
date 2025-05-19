import { events, sortEventsByDate } from '../polnaya-afisha.js';

function initSlider() {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pagination = document.getElementById('pagination');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let slideWidth = window.innerWidth <= 767 ? window.innerWidth : 1201 + 40;
  let totalSlides = slides.length;
  let autoSlideInterval;
  let isTransitioning = false;

  if (!slider || !pagination) {
    console.warn('Slider or pagination element not found');
    return;
  }

  function createPagination() {
    pagination.innerHTML = '';
    slides = document.querySelectorAll('.slide');
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

    // Вычисляем ширину и высоту слайда
    slideWidth = window.innerWidth <= 767 ? window.innerWidth : 1201 + 40;
    const slideHeight = window.innerWidth <= 767 ? window.innerWidth * 0.608 : 547; // 60.8% от ширины для мобильных

    // Устанавливаем размеры каждого слайда
    slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
      slide.style.height = `${slideHeight}px`;
    });

    // Перемещаем слайдер
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Обновляем пагинацию
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
    newSlide.style.width = `${slideWidth}px`;
    newSlide.style.height = `${window.innerWidth <= 767 ? window.innerWidth * 0.608 : 547}px`;
    newSlide.setAttribute('data-link', link);

    const priceIconClass = pushkinCard ? '' : 'hidden';

    newSlide.innerHTML = `
      <div class="price-container">
        <div class="price-icon ${priceIconClass}"><img src="../assets/svg_icons/pushkin.png" alt="Pushkin Card" /></div>
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

  // Фильтруем и сортируем события для слайдера
  const filteredSlides = events.filter(slide => slide.watchSlider === true);
  const sortedSlides = sortEventsByDate(filteredSlides);
  console.log('Sorted slides:', sortedSlides);
  sortedSlides.forEach(slide => addSlide(slide));

  createPagination();
  updateSlider();
  startAutoSlide();

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (!isTransitioning) {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
        resetAutoSlide();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!isTransitioning) {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
        resetAutoSlide();
      }
    });
  }

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
    slideWidth = window.innerWidth <= 767 ? window.innerWidth : 1201 + 40;
    const slideHeight = window.innerWidth <= 767 ? window.innerWidth * 0.608 : 547;
    slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
      slide.style.height = `${slideHeight}px`;
    });
    updateSlider();
  });
}

function initPosters() {
  console.log('Инициализация афиш...');
}

const manager = {
  initSlider,
  initPosters
};

document.addEventListener('DOMContentLoaded', () => {
  manager.initSlider();
});