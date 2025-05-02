window.slidesData = [
    {
        imageUrl: 'https://i.postimg.cc/02b8jS2W/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Любовь, танго',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 500 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: true,
        watchSlider: true
    },
    {
        imageUrl: 'https://i.postimg.cc/ZqpXG4Fm/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Егор Крид',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 4 000 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: false,
        watchSlider:  true
    },
    {
        imageUrl: 'https://i.postimg.cc/02b8jS2W/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Егор Крид клоун ебать меня',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 4 000 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: true,
        watchSlider: true
    },
    {
        imageUrl: 'https://i.postimg.cc/02b8jS2W/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Егор Крид клоун ебать меня',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 4 000 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: false,
        watchSlider: true
    },
    {
        imageUrl: 'https://i.postimg.cc/02b8jS2W/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Егор Крид клоун ебать меня',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 4 000 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: false,
        watchSlider: true 
    },
    {
        imageUrl: 'https://i.postimg.cc/02b8jS2W/image.png',
        imageAfisha: 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg',
        title: 'Короткое название',
        date: '27 апреля, 17:00',
        venue: 'Малый зал',
        price: 'от 4 000 р',
        age: '16+',
        link: 'https://vk.com',
        pushkinCard: true,
        watchSlider: false 
    }
];

function getDayOfWeek(dateStr) {
    const [dayMonth, time] = dateStr.split(', ');
    const [day, month] = dayMonth.split(' ');
    const monthIndex = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(month.toLowerCase());
    const date = new Date(2025, monthIndex, parseInt(day));
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
}

// Функция для рендеринга карточек афиш
function renderAfishaCards() {
    const cardsContainer = document.getElementById('cards');
    if (!cardsContainer) return; // Если контейнера нет - выходим
    
    window.slidesData.forEach(slide => {
        const [dayMonth, time] = slide.date.split(', ');
        const dayOfWeek = getDayOfWeek(slide.date);
        const card = document.createElement('a');
        card.className = 'card';
        card.href = slide.link;
        card.innerHTML = `
            <div class="card-image" style="background-image: url(${slide.imageAfisha || 'https://i.postimg.cc/k5PW2SHr/afisha-zaglushka.jpg'})">
                <div class="age-badge">${slide.age}</div>
                <div class="price-badge">${slide.price}</div>
                ${slide.pushkinCard ? `
                    <div class="pushkin-badge">
                        <img src="assets/svg_icons/pushkin.png" class="pushkin-icon" alt="Pushkin Card">
                    </div>
                ` : ''}
            </div>
            <div class="card-info">
                <div class="card-title">${slide.title}</div>
                <div class="card-date">
                    <span>${dayMonth}, ${dayOfWeek}</span>
                    <div class="date-dot"></div>
                    <span>${time}</span>
                </div>
                <div class="card-venue">${slide.venue}</div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Функция для рендеринга слайдера
function renderSlider() {
    const sliderContainer = document.getElementById('slider');
    if (!sliderContainer) return; // Если контейнера нет - выходим
    // Удаляем добавление слайдов, так как это делает initSlider()
}

document.addEventListener('DOMContentLoaded', () => {
    renderAfishaCards();
    renderSlider();
});