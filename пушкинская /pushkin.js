document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
  
    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      prevTranslate = -currentIndex * 100;
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
  
    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  
    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  
    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      startPos = e.touches[0].clientX;
      slider.style.transition = 'none';
    });
  
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentPosition = e.touches[0].clientX;
      currentTranslate = prevTranslate + ((currentPosition - startPos) / slider.offsetWidth) * 100;
      slider.style.transform = `translateX(${currentTranslate}%)`;
    });
  
    slider.addEventListener('touchend', () => {
      isDragging = false;
      slider.style.transition = 'transform 0.5s ease-in-out';
      const movedBy = currentTranslate - prevTranslate;
      
      if (movedBy < -20) {
        goToSlide(currentIndex + 1);
      } else if (movedBy > 20) {
        goToSlide(currentIndex - 1);
      } else {
        updateSlider();
      }
    });
  
    // Prevent image dragging
    slides.forEach(slide => {
      slide.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault());
    });
  
    // Lazy load images
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      img.setAttribute('loading', 'lazy');
    });
  });