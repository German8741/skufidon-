  // Массив новостей для быстрого редактирования
    const newsData = [
      {
        title: "Заголовок новости 1",
        summary: "Краткое описание новости, чтобы заинтересовать читателя...",
        date: "20 мая 2025",
        image: "https://images.a-a-ah.ru/uploads/items/150621/311122/large_7.jpg",
        link: "news1.html" // Ссылка на отдельный файл новости
      },
      {
        title: "Заголовок новости 2",
        summary: "Краткое описание новости для привлечения внимания...",
        date: "19 мая 2025",
        image: "https://images.a-a-ah.ru/uploads/items/150621/311122/large_7.jpg",
        link: "news2.html"
      },
       {
        title: "Заголовок новости 2",
        summary: "Краткое описание новости для привлечения внимания...",
        date: "19 мая 2025",
        image: "https://images.a-a-ah.ru/uploads/items/150621/311122/large_7.jpg",
        link: "news2.html"
      },
      {
        title: "Заголовок новости 3",
        summary: "Краткое описание новости, чтобы заинтересовать...",
        date: "18 мая 2025",
        image: "https://images.a-a-ah.ru/uploads/items/150621/311122/large_7.jpg",
        link: "news3.html"
      }
    ];

    function renderNews() {
      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = '';
      newsData.forEach(news => {
        const newsCard = `
          <a href="${news.link}" class="news-card bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">${news.title}</h3>
              <p class="text-gray-600 mb-2">${news.summary}</p>
              <p class="text-sm text-gray-500">${news.date}</p>
            </div>
          </a>`;
        newsContainer.insertAdjacentHTML('beforeend', newsCard);
      });
    }

    document.addEventListener('DOMContentLoaded', renderNews);
