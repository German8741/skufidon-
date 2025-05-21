const events = [
  {
    id: 10,
    imageUrl: 'https://i.postimg.cc/15XxbL3F/image.png',
    imageAfisha: 'https://i.postimg.cc/VNQHDf0q/02.png',
    title: 'РЕПИН: единица мощности',
    date: '21 мая, 18:30',
    venue: 'Малый зал',
    price: '400 р',
    age: '12+',
    link: './polnaya-afisha.html?id=10',
    pushkinCard: false,
    watchSlider: true,
    kassyLink: 'https://ekb.kassy.ru/events/seminary/2-64555/sections/?t=1746348293',
    odoLink: 'https://ekb.kassy.ru/events/seminary/2-64555/sections/?t=1746348293',
    description: 'Илья Ефимович Репин (1844-1930) - это имя известно каждому в нашей стране. Знамениты картины прославленного живописца: "Бурлаки на Волге", "Крестный ход в Курской губернии", "Запорожцы пишут письмо турецкому султану", "Иван Грозный и сын его Иван", портреты Мусоргского, Толстого, Третьякова... Великое наследие русской живописи! "Ах, жизнь, жизнь... Что это художники так её обходят!" - писал он в 1881 году. Масштабы творческих задач "богатыря русского искусства" заставляют испытывать искреннее восхищение личностью художника, а глубина созданных Ильёй Ефимовичем Репиным живописных образов потрясает своей мощью.'
  },
  {
    id: 11,
    imageUrl: 'https://i.postimg.cc/W1RBcxgf/image.png',
    imageAfisha: 'https://i.postimg.cc/T2mjyQ66/image.png',
    title: 'Душа',
    date: '22 мая, 19:30',
    venue: 'Малый зал',
    price: 'от 800 р',
    age: '16+',
    link: './polnaya-afisha.html?id=11',
    pushkinCard: false,
    watchSlider: true,
    kassyLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64654/',
    odoLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64654/',
    description: '✨Живые инструменты: Виртуозная скрипка Александра Рассказова (лидер группы Красная скрипка) 🎻 и нежный рояль 🎹 Светланы Смирновой, художественное оформление в виде песочной анимации 🌪️от Елены Кадыровой, вокал Ольги Семенищевой (солистки УралОпераБалет) ✨и непременные приятные сюрпризы в программе.💥 Все это концертная программа под названием "Душа".🌺 Человеческая душа - самое нежное и хрупкое чудо на свете. Такая ранимая, но такая сильная. Полная загадок и секретов, а иногда очень чуткая и понятная.'
  },
  {
    id: 12,
    imageUrl: 'https://i.postimg.cc/HkMC0vTY/image.png',
    imageAfisha: 'https://i.postimg.cc/HkMC0vTY/image.png',
    title: 'Ансамбль Толока',
    date: '27 мая, 19:00',
    venue: 'Большой зал',
    price: 'от 1200 р',
    age: '6+',
    link: './polnaya-afisha.html?id=12',
    pushkinCard: false,
    watchSlider: false,
    kassyLink: 'https://ns.show/artists/toloka',
    odoLink: 'https://ns.show/artists/toloka',
    description: 'Ансамбль Толóка — это молодые исследователи, исполнители настоящей русской народной музыки, которые ездят в экспедиции по всей России, расшифровывают архивные материалы и дают им новую жизнь. На сцене вы услышите родную музыку из разных областей России в живом исполнении ансамбля. Ту, что ещё недавно звучала в домах ваших бабушек и дедушек, на свадьбах и во время застолья. Не упустите возможность встретиться с родной культурой.'
  },
  {
    id: 13,
    imageUrl: 'https://i.postimg.cc/j5BNtVrj/image.png',
    imageAfisha: 'https://i.postimg.cc/fb1s7gvM/image.png',
    title: 'О чем молчит женщина',
    date: '19 июня, 19:00',
    venue: 'Арт-Холл «Малый зал»',
    price: 'от 500 р',
    age: '18+',
    link: './polnaya-afisha.html?id=13',
    pushkinCard: false,
    watchSlider: true,
    kassyLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64710/',
    odoLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64710/',
    description: 'СВЕТЛАНА КОТОВА в концерте за столиками "О чем молчит женщина". Поводов для молчания женщины ... достаточно. О любви и разлуке, о радости и неудаче, о мечтах и чаяниях... Женщина молчит. Нет! Женщина поёт! ✓ Любимые песни в новом прочтении; ✓ Разговоры о личном; ✓ Романтическая гитара РОМАНА ГУСЕВА. Приходите! Давайте вместе услышим, о чем молчит женщина.'
  }
];

function parseDate(dateStr) {
  const [dayMonth, time] = dateStr.split(', ');
  const [day, month] = dayMonth.split(' ');
  const monthIndex = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(month.toLowerCase());
  const [hours, minutes] = time.split(':');
  const year = 2025;
  return new Date(year, monthIndex, parseInt(day), parseInt(hours), parseInt(minutes));
}

function getDayOfWeek(dateStr) {
  const [dayMonth, time] = dateStr.split(', ');
  const [day, month] = dayMonth.split(' ');
  const monthIndex = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(month.toLowerCase());
  const date = new Date(2025, monthIndex, parseInt(day));
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  return days[date.getDay()];
}

function sortEventsByDate(eventsArray) {
  return [...eventsArray].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA - dateB;
  });
}

function renderAfishaCards() {
  const cardsContainer = document.getElementById('cards');
  if (!cardsContainer) {
    console.warn('Cards container not found');
    return;
  }

  const sortedEvents = sortEventsByDate(events);
  
  sortedEvents.forEach(slide => {
    console.log('Rendering card with link:', slide.link);
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
    card.addEventListener('click', (e) => {
      console.log('Card clicked, navigating to:', card.href);
    });
    cardsContainer.appendChild(card);
  });
}

function initSlider() {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) {
    console.warn('Cards container not found for slider');
    return;
  }

  // Обрабатываем только клики, чтобы избежать свайпов как кликов
  cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card && card.href) {
      event.preventDefault(); // Предотвращаем стандартный клик
      window.location.href = card.href; // Переходим по ссылке
    }
  });

  // Отключаем контекстное меню для предотвращения конфликтов
  cardsContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}

function getEventById(id) {
  return events.find(event => event.id === parseInt(id));
}

function renderEventDetails() {
  // Вызываем только на странице polnaya-afisha.html
  if (!window.location.pathname.includes('polnaya-afisha.html')) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  const event = getEventById(eventId);

  console.log('Extracted eventId:', eventId);
  console.log('Found event:', event);

  if (!event) {
    const section = document.querySelector('.events-detail-section');
    if (section) {
      section.innerHTML = '<p>Событие не найдено</p>';
    }
    return;
  }

  document.querySelector('.event-image').src = event.imageAfisha;
  document.querySelector('.age-badge').textContent = event.age;
  document.querySelector('.event-title').textContent = event.title;
  document.querySelector('.event-button').href = event.odoLink;
  document.querySelector('.details-item:nth-child(1)').innerHTML = `<span class="details-label">Дата:</span> ${event.date.split(', ')[0]}`;
  document.querySelector('.details-item:nth-child(2)').innerHTML = `<span class="details-label">Время:</span> ${event.date.split(', ')[1]}`;
  document.querySelector('.details-item:nth-child(3) .details-link').textContent = event.venue;
  document.querySelector('.details-item:nth-child(4)').innerHTML = `<span class="details-label">Цена:</span> ${event.price}`;
  document.querySelector('.ticket-button').href = event.kassyLink;
  document.querySelector('.event-description p').textContent = event.description;
}

// Заглушка для zalyManager
const zalyManager = {
  initZaly: () => {
    console.log('zalyManager.initZaly() called (placeholder)');
  }
};

// Заглушка для manager (слайдер обрабатывается в slider/manager.js)
const manager = {
  initSlider: () => {
    console.log('manager.initSlider() called (placeholder)');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderAfishaCards();
  initSlider();
  renderEventDetails();
});

export { events, sortEventsByDate, renderAfishaCards, manager, zalyManager };