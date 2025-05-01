const zalyData = [
    {
        imageUrl: 'https://i.postimg.cc/7P7kdyxq/image.png',
        title: 'Концертный зал',
        area: '700',
        capacity: 'до 800 человек',
        link: 'https://example.com/zal1',
        minArea: 700
    },
    {
        imageUrl: 'https://i.postimg.cc/7P7kdyxq/image.png',
        title: 'Фойе концертного зала',
        area: '500',
        capacity: 'до 600 человек',
        link: 'https://example.com/zal2',
        minArea: 500
    },
    {
        imageUrl: 'https://i.postimg.cc/7P7kdyxq/image.png',
        title: 'Жуковский зал',
        area: '300',
        capacity: 'до 400 человек',
        link: 'https://example.com/zal3',
        minArea: 300
    },
    {
        imageUrl: 'https://i.postimg.cc/7P7kdyxq/image.png',
        title: 'Малый зал',
        area: '200',
        capacity: 'до 200 человек',
        link: 'https://example.com/zal4',
        minArea: 200
    },
    {
        imageUrl: 'https://i.postimg.cc/7P7kdyxq/image.png',
        title: 'Гусарская баллада',
        area: '150',
        capacity: 'до 150 человек',
        link: 'https://example.com/zal5',
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