// sponsors/sponsor.js
document.addEventListener('DOMContentLoaded', function() {
    const sponsorsSection = document.getElementById('sponsors-section');
    
    // Массив спонсоров (можно заменить на загрузку из API)
    const sponsors = [
      { image: 'https://i.postimg.cc/ncv6m252/image.png', alt: 'Sponsor 1' },
      { image: 'https://i.postimg.cc/C56G9GB2/Sponsor2.png', alt: 'Sponsor 2' },
      { image: 'https://i.postimg.cc/ncv6m252/image.png', alt: 'Sponsor 3' },
      { image: 'https://i.postimg.cc/C56G9GB2/Sponsor2.png', alt: 'Sponsor 4' },
      { image: 'https://i.postimg.cc/ncv6m252/image.png', alt: 'Sponsor 5' },
      { image: 'https://i.postimg.cc/C56G9GB2/Sponsor2.png', alt: 'Sponsor 6' }
    ];
  
    // Создаем HTML для спонсоров
    let sponsorsHTML = `
      <div class="sponsors-container">
        <div class="sponsors-track" id="sponsors-track">
    `;
  
    // Добавляем спонсоров дважды для бесконечной анимации
    sponsors.forEach(sponsor => {
      sponsorsHTML += `
        <div class="sponsor-item">
          <img src="${sponsor.image}" alt="${sponsor.alt}" class="sponsor-logo">
        </div>
      `;
    });
  
    // Дублируем для бесшовной анимации
    sponsors.forEach(sponsor => {
      sponsorsHTML += `
        <div class="sponsor-item">
          <img src="${sponsor.image}" alt="${sponsor.alt}" class="sponsor-logo">
        </div>
      `;
    });
  
    sponsorsHTML += `
        </div>
      </div>
    `;
  
    // Вставляем HTML в секцию
    sponsorsSection.innerHTML = sponsorsHTML;
  
    // Инициализируем анимацию
    initSponsorsAnimation();
  });
  
  function initSponsorsAnimation() {
    const track = document.getElementById('sponsors-track');
    let animation;
  
    function startAnimation() {
      animation = track.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-50%)' }
        ],
        {
          duration: 30000,
          iterations: Infinity
        }
      );
    }
  
    // Запускаем анимацию
    startAnimation();
  
    // Останавливаем при наведении
    track.addEventListener('mouseenter', () => {
      animation.pause();
    });
  
    // Возобновляем при уходе курсора
    track.addEventListener('mouseleave', () => {
      animation.play();
    });
  }