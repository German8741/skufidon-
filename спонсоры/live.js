// sponsors/live.js
class SponsorsManager {
  constructor() {
    this.sponsors = [];
    this.trackElement = null;
  }

  init() {
    this.trackElement = document.getElementById('sponsors-track');
    this.loadSponsors();
  }

  async loadSponsors() {
    try {
      // Здесь можно загружать спонсоров из API
      // const response = await fetch('/api/sponsors');
      // this.sponsors = await response.json();
      
      // Временные данные для примера
  this.sponsors = [
    { image: 'https://i.postimg.cc/KYLgVhGv/image.png', alt: 'Sponsor 1' },
    { image: 'https://i.postimg.cc/d1jZsRZb/1.png', alt: 'Sponsor 2' },
    { image: 'https://i.postimg.cc/Yq9L7WrP/2.png', alt: 'Sponsor 3' },
    { image: 'https://i.postimg.cc/HxzjDpfH/3.png', alt: 'Sponsor 4' },
    { image: 'https://i.postimg.cc/y8Rd6hwL/4.png', alt: 'Sponsor 5' },
    { image: 'https://i.postimg.cc/nzSZGMys/5.png', alt: 'Sponsor 6' },
    { image: 'https://i.postimg.cc/jSYTXpFh/6.png', alt: 'Sponsor 7' }
];
      
      this.renderSponsors();
    } catch (error) {
      console.error('Error loading sponsors:', error);
    }
  }

  renderSponsors() {
    let html = '';
    
    // Рендерим спонсоров дважды для бесконечной анимации
    this.sponsors.forEach(sponsor => {
      html += this.createSponsorItem(sponsor);
    });
    
    this.sponsors.forEach(sponsor => {
      html += this.createSponsorItem(sponsor);
    });
    
    this.trackElement.innerHTML = html;
  }

  createSponsorItem(sponsor) {
    return `
      <div class="sponsor-item">
        <img src="${sponsor.image}" alt="${sponsor.alt}" class="sponsor-logo">
      </div>
    `;
  }

  // Метод для динамического добавления спонсора
  addSponsor(sponsorData) {
    this.sponsors.push(sponsorData);
    this.renderSponsors();
  }

  // Метод для удаления спонсора
  removeSponsor(index) {
    this.sponsors.splice(index, 1);
    this.renderSponsors();
  }
}

// Инициализация менеджера спонсоров
const sponsorsManager = new SponsorsManager();
document.addEventListener('DOMContentLoaded', () => sponsorsManager.init());