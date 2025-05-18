import events from './афиши/afisha.js';

function getEventById(id) {
  return events.find(event => event.id === parseInt(id));
}

function renderEventDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  const event = getEventById(eventId);

  console.log('Extracted eventId:', eventId); // Отладка
  console.log('Found event:', event); // Отладка

  if (!event) {
    document.querySelector('.events-detail-section').innerHTML = '<p>Событие не найдено</p>';
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

document.addEventListener('DOMContentLoaded', renderEventDetails);