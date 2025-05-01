function initSlider() {
  const cardsContainer = document.querySelector('.cards');
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // Для мыши
  cardsContainer.addEventListener('mousedown', startDragging);
  cardsContainer.addEventListener('mouseup', stopDragging);
  cardsContainer.addEventListener('mouseleave', stopDragging);
  cardsContainer.addEventListener('mousemove', drag);
  
  // Для тач-устройств
  cardsContainer.addEventListener('touchstart', touchStart, { passive: false });
  cardsContainer.addEventListener('touchend', stopDragging, { passive: true });
  cardsContainer.addEventListener('touchmove', touchMove, { passive: false });

  function startDragging(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    cardsContainer.style.cursor = 'grabbing';
    cardsContainer.style.scrollBehavior = 'auto'; // Отключаем плавную прокрутку при drag
  }
  
  function touchStart(event) {
    startDragging(event);
    event.preventDefault(); // Блокируем стандартную прокрутку
  }

  function stopDragging() {
    isDragging = false;
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationID);
    cardsContainer.style.cursor = 'grab';
    cardsContainer.style.scrollBehavior = 'smooth'; // Восстанавливаем плавную прокрутку
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }
  
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      event.preventDefault(); // Блокируем стандартную прокрутку
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
    cardsContainer.scrollLeft = -currentTranslate;
    if (isDragging) requestAnimationFrame(animation);
  }
}

document.addEventListener('DOMContentLoaded', initSlider);