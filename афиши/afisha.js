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

function renderAfishaCards() {
    const cardsContainer = document.getElementById('cards');
    if (!cardsContainer) return;
    
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

function initSlider() {
    const cardsContainer = document.querySelector('.cards');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    cardsContainer.addEventListener('mousedown', startDragging);
    cardsContainer.addEventListener('mouseup', stopDragging);
    cardsContainer.addEventListener('mouseleave', stopDragging);
    cardsContainer.addEventListener('mousemove', drag);
    
    cardsContainer.addEventListener('touchstart', touchStart, { passive: false });
    cardsContainer.addEventListener('touchend', stopDragging, { passive: true });
    cardsContainer.addEventListener('touchmove', touchMove, { passive: false });

    function startDragging(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        cardsContainer.style.cursor = 'grabbing';
        cardsContainer.style.scrollBehavior = 'auto';
    }
    
    function touchStart(event) {
        startDragging(event);
        event.preventDefault();
    }

    function stopDragging() {
        isDragging = false;
        prevTranslate = currentTranslate;
        cancelAnimationFrame(animationID);
        cardsContainer.style.cursor = 'grab';
        cardsContainer.style.scrollBehavior = 'smooth';
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
            event.preventDefault();
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

document.addEventListener('DOMContentLoaded', () => {
    renderAfishaCards();
    initSlider();
});