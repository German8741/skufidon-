document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Рассчитываем ширину слайда в пикселях
  const getSlideWidth = () => slider.offsetWidth;

  function updateSlider() {
    currentTranslate = -currentIndex * getSlideWidth();
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateSlider();
  }

  // Обработчики кнопок
  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  // Touch-события
  slider.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение (например, скролл страницы)
    isDragging = true;
    startPos = e.touches[0].clientX;
    slider.style.transition = 'none';
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + (currentPosition - startPos);
    slider.style.transform = `translateX(${currentTranslate}px)`;
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out';
    const movedBy = currentTranslate - prevTranslate;

    // Порог свайпа (20% ширины слайда)
    if (movedBy < -getSlideWidth() * 0.2) {
      goToSlide(currentIndex + 1);
    } else if (movedBy > getSlideWidth() * 0.2) {
      goToSlide(currentIndex - 1);
    } else {
      updateSlider();
    }
  });

  // Mouse-события для десктопа
  let isMouseDragging = false;
  slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMouseDragging = true;
    startPos = e.clientX;
    slider.style.transition = 'none';
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + (currentPosition - startPos);
    slider.style.transform = `translateX(${currentTranslate}px)`;
  });

  slider.addEventListener('mouseup', () => {
    isMouseDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out';
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -getSlideWidth() * 0.2) {
      goToSlide(currentIndex + 1);
    } else if (movedBy > getSlideWidth() * 0.2) {
      goToSlide(currentIndex - 1);
    } else {
      updateSlider();
    }
  });

  slider.addEventListener('mouseleave', () => {
    if (isMouseDragging) {
      isMouseDragging = false;
      slider.style.transition = 'transform  W0.5s ease-in-out';
      updateSlider();
    }
  });

  // Предотвращение перетаскивания изображений
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    img.addEventListener('dragstart', (e) => e.preventDefault());
    img.setAttribute('loading', 'lazy');
  });

  // Обновление слайдера при изменении размера окна
  window.addEventListener('resize', updateSlider);

  // Инициализация
  updateSlider();
});