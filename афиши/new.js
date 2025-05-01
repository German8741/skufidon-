function initSlider() {
    const cardsContainer = document.getElementById('cards');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
  
    cardsContainer.addEventListener('mousedown', startDragging);
    cardsContainer.addEventListener('mouseup', stopDragging);
    cardsContainer.addEventListener('mouseleave', stopDragging);
    cardsContainer.addEventListener('mousemove', drag);
    cardsContainer.addEventListener('touchstart', startDragging);
    cardsContainer.addEventListener('touchend', stopDragging);
    cardsContainer.addEventListener('touchmove', drag);
  
    function startDragging(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      cardsContainer.style.cursor = 'grabbing';
    }
  
    function stopDragging() {
      isDragging = false;
      prevTranslate = currentTranslate;
      cancelAnimationFrame(animationID);
      cardsContainer.style.cursor = 'grab';
    }
  
    function drag(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function animation() {
      cardsContainer.style.transform = `translateX(${currentTranslate}px)`;
      if (isDragging) requestAnimationFrame(animation);
    }
  
    // Smooth scrolling for arrow key navigation
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
      } else if (event.key === 'ArrowRight') {
        cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', initSlider);