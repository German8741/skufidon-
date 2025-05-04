// Открытие меню
document.querySelector('.header__burger').addEventListener('click', function() {
    document.querySelector('.header__mobile-page').classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  });
  
  // Закрытие меню
  document.querySelector('.mobile-menu__close').addEventListener('click', function() {
    document.querySelector('.header__mobile-page').classList.remove('active');
    document.body.style.overflow = '';
  });