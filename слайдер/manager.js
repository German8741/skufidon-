import { events, sortEventsByDate } from '../polnaya-afisha.js';

function initSlider() {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pagination = document.getElementById('pagination');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let slideWidth = window.innerWidth <= 767 ? document.querySelector('.slider-container').offsetWidth : 1018 + 34;
  let totalSlides = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  if (!slider || !pagination) {
    console.warn('Slider or pagination element not found');
    return;
  }

  // Создание пагинации
  function createPagination() {
    pagination.innerHTML = '';
    slides = document.querySelectorAll('.slide:not(.clone)');
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
          updateSlider(true);
          resetAutoSlide();
        }
      });
      pagination.appendChild(dot);
    }
  }

  // Добавление слайда
  function addSlide({ imageUrl, title, date, venue, price, age, link, pushkinCard }, isClone = false) {
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    if (isClone) {
      newSlide.classList.add('clone');
    }
    
    if (!imageUrl) {
      console.warn('Missing imageUrl for slide:', title);
      newSlide.style.backgroundColor = '#ccc';
    } else {
      console.log('Setting background image:', imageUrl);
      newSlide.style.backgroundImage = `url(${imageUrl})`;
    }
    
    newSlide.style.width = window.innerWidth <= 767 ? `${document.querySelector('.slider-container').offsetWidth}px` : `1018px`;
    newSlide.style.height = `${window.innerWidth <= 767 ? document.querySelector('.slider-container').offsetWidth * 0.608 : 464}px`;
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

    if (!newSlide.querySelector('.event-info') || !newSlide.querySelector('.price-container') || !newSlide.querySelector('.age-restriction')) {
      console.warn('Failed to add inner elements to slide:', title);
    }
  }

  // Настройка бесконечных слайдов
  function setupInfiniteSlides() {
    slider.innerHTML = '';
    const filteredSlides = events.filter(slide => slide.watchSlider === true);
    const sortedSlides = sortEventsByDate(filteredSlides);
    totalSlides = sortedSlides.length;

    if (totalSlides === 0) {
      console.warn('No slides to display');
      return;
    }

    addSlide(sortedSlides[totalSlides - 1], true);
    sortedSlides.forEach(slide => addSlide(slide));
    addSlide(sortedSlides[0], true);

    slides = document.querySelectorAll('.slide:not(.clone)');
    totalSlides = slides.length;
  }

  // Обновление слайдера
  function updateSlider(withTransition = true) {
    if (isTransitioning) return;
    isTransitioning = true;

    slideWidth = window.innerWidth <= 767 ? document.querySelector('.slider-container').offsetWidth : 1018 + 34;
    const slideHeight = window.innerWidth <= 767 ? slideWidth * 0.608 : 464;

    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
      slide.style.width = window.innerWidth <= 767 ? `${slideWidth}px` : `1018px`;
      slide.style.height = `${slideHeight}px`;
      if (!slide.style.backgroundImage) {
        console.warn('Slide missing background image:', slide);
        slide.style.backgroundColor = '#ccc';
      }
    });

    const displayIndex = currentIndex + 1;
    slider.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
    slider.style.transform = `translateX(-${displayIndex * slideWidth}px)`;

    const dots = document.querySelectorAll('#pagination .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => {
      if (displayIndex === 0) {
        currentIndex = totalSlides - 1;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
      } else if (displayIndex === totalSlides + 1) {
        currentIndex = 0;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
      }
      isTransitioning = false;
    }, withTransition ? 500 : 0);
  }

  // Автоматическое перелистывание
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isTransitioning) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(true);
      }
    }, 7000);
  }

  // Сброс автопрокрутки
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Инициализация
  setupInfiniteSlides();
  createPagination();
  updateSlider(false);
  startAutoSlide();

  // Обработчики кнопок
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (!isTransitioning) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(true);
        resetAutoSlide();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!isTransitioning) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(true);
        resetAutoSlide();
      }
    });
  }

  // Обработчик клика по слайду
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

  // Обработка касаний
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    if (Math.abs(touchEndX - touchStartX) > 10) {
      e.preventDefault(); // Предотвращаем прокрутку страницы
    }
  });

  slider.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    clearInterval(autoSlideInterval); // Останавливаем автопрокрутку
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(e);
    resetAutoSlide();
  });

  function handleSwipe(e) {
    if (isTransitioning) return;
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 30; // Увеличена чувствительность

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      e.preventDefault();
      if (swipeDistance > 0) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(true);
      } else {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(true);
      }
    }
  }

  // Обработка изменения размера окна
  window.addEventListener('resize', () => {
    slideWidth = window.innerWidth <= 767 ? document.querySelector('.slider-container').offsetWidth : 1018 + 34;
    const slideHeight = window.innerWidth <= 767 ? slideWidth * 0.608 : 464;
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
      slide.style.width = window.innerWidth <= 767 ? `${slideWidth}px` : `1018px`;
      slide.style.height = `${slideHeight}px`;
    });
    updateSlider(false);
  });
}

function initPosters() {
  console.log('Инициализация афиш...');
  const postersContainer = document.querySelector('.posters-container');
  if (!postersContainer) {
    console.warn('Posters container not found');
    return;
  }

  postersContainer.innerHTML = '';

  const sortedEvents = sortEventsByDate(events);
  sortedEvents.forEach(event => {
    const poster = document.createElement('div');
    poster.className = 'poster';
    poster.setAttribute('data-link', event.link);
    poster.innerHTML = `
      <div class="poster-image" style="background-image: url(${event.imageUrl});"></div>
      <div class="poster-info">
        <h3 class="poster-title">${event.title}</h3>
        <p class="poster-date">${event.date}</p>
        <p class="poster-venue">${event.venue}</p>
        <p class="poster-price">${event.price}</p>
        <span class="poster-age">${event.age}</span>
      </div>
    `;
    postersContainer.appendChild(poster);

    poster.addEventListener('click', () => {
      if (event.link) {
        window.location.href = event.link;
      }
    });
  });
}

const manager = {
  initSlider,
  initPosters
};

document.addEventListener('DOMContentLoaded', () => {
  manager.initSlider();
  manager.initPosters();
});