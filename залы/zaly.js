const zalyData = [
    {
        imageUrl: 'https://i.postimg.cc/XvbqSkHn/image.jpg',
        title: 'Концертный зал',
        area: '700',
        capacity: 'до 800 человек',
        link: 'концертный.html',
        minArea: 700
    },
    {
        imageUrl: 'https://i.postimg.cc/bN1d65gm/telegram-cloud-photo-size-2-5474224569859565552-y.jpg',
        title: 'Фойе концертного зала',
        area: '290',
        capacity: 'до 400 человек',
        link: 'фойе.html',
        minArea: 500
    },
    {
        imageUrl: 'https://i.postimg.cc/fy9kQqNT/telegram-cloud-photo-size-2-5474224569859565652-y.jpg',
        title: 'Жуковский зал',
        area: '120',
        capacity: 'до 80 человек',
        link: 'жуковский.html',
        minArea: 300
    },
    {
        imageUrl: 'https://i.postimg.cc/J0qv0MmT/telegram-cloud-photo-size-2-5474224569859565604-y.jpg',
        title: 'Малый зал',
        area: '240',
        capacity: 'до 220 человек',
        link: 'малый.html',
        minArea: 200
    },
    {
        imageUrl: 'https://i.postimg.cc/wvbyW8P3/telegram-cloud-photo-size-2-5469643549151719184-y.jpg',
        title: 'Гусарская баллада',
        area: '60',
        capacity: 'до 50 человек',
        link: 'баллада.html',
        minArea: 150
    }
];

// Функция для рендеринга карточек залов
function renderZalyCards(minArea = 0) {
    const zalyContainer = document.getElementById('zaly-cards');
    if (!zalyContainer) return;

    zalyContainer.innerHTML = ''; // Очищаем текущие карточки
    const filteredZaly = zalyData.filter(zal => zal.minArea >= minArea);

    filteredZaly.forEach(zal => {
        const card = document.createElement('a');
        card.className = 'zaly-card';
        card.href = zal.link;
        card.innerHTML = `
            <div class="zaly-image" style="background-image: url(${zal.imageUrl})"></div>
            <div class="zaly-info">
                <div class="zaly-title">${zal.title}</div>
                <div class="zaly-details">
                    <div class="area">
                        <span class="number">${zal.area}</span>
                        <span class="unit">
                            <span class="meter">м</span>
                            <span class="square">²</span>
                        </span>
                    </div>
                    <div class="zaly-details-dot"></div>
                    <div class="capacity">${zal.capacity}</div>
                </div>
            </div>
        `;
        zalyContainer.appendChild(card);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderZalyCards();
});