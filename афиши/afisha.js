const events = [
 
// 1. Арт-лекция «РЕПИН: единица мощности»
{
  id: 10,
  imageUrl: 'https://i.postimg.cc/15XxbL3F/image.png',
  imageAfisha: 'https://i.postimg.cc/VNQHDf0q/02.png',
  title: 'РЕПИН: единица мощности',
  date: '21 мая, 18:30',
  venue: 'Малый зал',
  price: '400 р',
  age: '12+',
  link: '/polnaya-afisha.html?id=10',
  pushkinCard: false,
  watchSlider: true,
  kassyLink: 'https://ekb.kassy.ru/events/seminary/2-64555/sections/?t=1746348293',
  odoLink: 'https://ekb.kassy.ru/events/seminary/2-64555/sections/?t=1746348293',
  description: 'Илья Ефимович Репин (1844-1930) - это имя известно каждому в нашей стране. Знамениты картины прославленного живописца: "Бурлаки на Волге", "Крестный ход в Курской губернии", "Запорожцы пишут письмо турецкому султану", "Иван Грозный и сын его Иван", портреты Мусоргского, Толстого, Третьякова... Великое наследие русской живописи! "Ах, жизнь, жизнь... Что это художники так её обходят!" - писал он в 1881 году. Масштабы творческих задач "богатыря русского искусства" заставляют испытывать искреннее восхищение личностью художника, а глубина созданных Ильёй Ефимовичем Репиным живописных образов потрясает своей мощью.'
},

// 2. Душа
{
  id: 11,
  imageUrl: 'https://i.postimg.cc/W1RBcxgf/image.png',
  imageAfisha: 'https://i.postimg.cc/T2mjyQ66/image.png',
  title: 'Душа',
  date: '22 мая, 19:30',
  venue: 'Малый зал',
  price: 'от 800 р',
  age: '16+',
  link: '/polnaya-afisha.html?id=11',
  pushkinCard: false,
  watchSlider: false,
  kassyLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64654/',
  odoLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64654/',
  description: '✨Живые инструменты: Виртуозная скрипка Александра Рассказова (лидер группы Красная скрипка) 🎻 и нежный рояль 🎹 Светланы Смирновой, художественное оформление в виде песочной анимации 🌪️от Елены Кадыровой, вокал Ольги Семенищевой (солистки УралОпераБалет) ✨и непременные приятные сюрпризы в программе.💥 Все это концертная программа под названием "Душа".🌺 Человеческая душа - самое нежное и хрупкое чудо на свете. Такая ранимая, но такая сильная. Полная загадок и секретов, а иногда очень чуткая и понятная.'
},

// 3. Ансамбль Толóка
{
  id: 12,
  imageUrl: 'https://i.postimg.cc/HkMC0vTY/image.png',
  imageAfisha: 'https://i.postimg.cc/HkMC0vTY/image.png',
  title: 'Ансамбль Толока',
  date: '27 мая, 19:00',
  venue: 'Большой зал',
  price: 'от 1200 р',
  age: '6+',
  link: '/polnaya-afisha.html?id=12',
  pushkinCard: false,
  watchSlider: false,
  kassyLink: 'https://ns.show/artists/toloka',
  odoLink: 'https://ns.show/artists/toloka',
  description: 'Ансамбль Толóка — это молодые исследователи, исполнители настоящей русской народной музыки, которые ездят в экспедиции по всей России, расшифровывают архивные материалы и дают им новую жизнь. На сцене вы услышите родную музыку из разных областей России в живом исполнении ансамбля. Ту, что ещё недавно звучала в домах ваших бабушек и дедушек, на свадьбах и во время застолья. Не упустите возможность встретиться с родной культурой.'
},

// 4. О чем молчит женщина
{
  id: 13,
  imageUrl: 'https://i.postimg.cc/j5BNtVrj/image.png',
  imageAfisha: 'https://i.postimg.cc/fb1s7gvM/image.png',
  title: 'О чем молчит женщина',
  date: '19 июня, 19:00',
  venue: 'Арт-Холл «Малый зал»',
  price: 'от 500 р',
  age: '18+',
  link: '/polnaya-afisha.html?id=13',
  pushkinCard: false,
  watchSlider: true,
  kassyLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64710/',
  odoLink: 'https://ekb.kassy.ru/events/koncerty-i-shou/2-64710/',
  description: 'СВЕТЛАНА КОТОВА в концерте за столиками "О чем молчит женщина". Поводов для молчания женщины ... достаточно. О любви и разлуке, о радости и неудаче, о мечтах и чаяниях... Женщина молчит. Нет! Женщина поёт! ✓ Любимые песни в новом прочтении; ✓ Разговоры о личном; ✓ Романтическая гитара РОМАНА ГУСЕВА. Приходите! Давайте вместе услышим, о чем молчит женщина.'
}

];

















































// Функция для преобразования строки даты в объект Date
function parseDate(dateStr) {
  const [dayMonth, time] = dateStr.split(', ');
  const [day, month] = dayMonth.split(' ');
  const monthIndex = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(month.toLowerCase());
  const [hours, minutes] = time.split(':');
  const year = 2025;
  return new Date(year, monthIndex, parseInt(day), parseInt(hours), parseInt(minutes));
}

// Функция для получения дня недели
function getDayOfWeek(dateStr) {
  const [dayMonth, time] = dateStr.split(', ');
  const [day, month] = dayMonth.split(' ');
  const monthIndex = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(month.toLowerCase());
  const date = new Date(2025, monthIndex, parseInt(day));
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  return days[date.getDay()];
}

// Функция для сортировки событий по дате
export function sortEventsByDate(eventsArray) {
  return [...eventsArray].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA - dateB;
  });
}

function renderAfishaCards() {
  const cardsContainer = document.getElementById('cards');
  if (!cardsContainer) return;

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
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let touchStartTime = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 10;

  cardsContainer.addEventListener('mousedown', startDragging);
  cardsContainer.addEventListener('mouseup', stopDragging);
  cardsContainer.addEventListener('mouseleave', stopDragging);
  cardsContainer.addEventListener('mousemove', drag);
  
  cardsContainer.addEventListener('touchstart', touchStart, { passive: false });
  cardsContainer.addEventListener('touchend', touchEnd, { passive: true });
  cardsContainer.addEventListener('touchmove', touchMove, { passive: false });

  function startDragging(event) {
    isDragging = true;
    startPos = getPositionX(event);
    touchStartX = startPos;
    touchStartTime = new Date().getTime();
    animationID = requestAnimationFrame(animation);
    cardsContainer.style.cursor = 'grabbing';
    cardsContainer.style.scrollBehavior = 'auto';
  }
  
  function touchStart(event) {
    startDragging(event);
  }

  function stopDragging(event) {
    isDragging = false;
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationID);
    cardsContainer.style.cursor = 'grab';
    cardsContainer.style.scrollBehavior = 'smooth';

    const touchEndTime = new Date().getTime();
    const touchDuration = touchEndTime - touchStartTime;
    const swipeDistance = Math.abs(touchEndX - touchStartX);

    if (touchDuration < 300 && swipeDistance < minSwipeDistance) {
      const card = event.target.closest('.card');
      if (card && card.href) {
        window.location.href = card.href;
      }
    }
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      touchEndX = currentPosition;
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }
  
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      touchEndX = currentPosition;
      currentTranslate = prevTranslate + currentPosition - startPos;
      event.preventDefault();
    }
  }

  function touchEnd(event) {
    stopDragging(event);
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

export default events;