const images = [
    "https://i.postimg.cc/B6vPcQmd/telegram-cloud-photo-size-2-5469643549151719183-y.jpg",
    "https://i.postimg.cc/wvbyW8P3/telegram-cloud-photo-size-2-5469643549151719184-y.jpg",
    "https://i.postimg.cc/T1zy6jT6/telegram-cloud-photo-size-2-5469643549151719179-y.jpg",
    "https://i.postimg.cc/htqJZ0C8/telegram-cloud-photo-size-2-5469643549151719180-y.jpg"
];
let currentIndex = 0;
const mainImage = document.querySelector('.venue-section .main-image');
const thumbnails = document.querySelectorAll('.venue-section .thumbnail-section img');
const thumbnailSection = document.querySelector('.venue-section .thumbnail-section');
const leftArrow = document.querySelector('.venue-section .nav-arrow.left');
const rightArrow = document.querySelector('.venue-section .nav-arrow.right');
const slideCounter = document.querySelector('.venue-section .slide-counter');
const mainImageContainer = document.querySelector('.venue-section .main-image-container');

function updateSlider(index) {
    currentIndex = index;
    mainImage.src = images[currentIndex];
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('active', i === currentIndex);
    });

    if (slideCounter) {
        slideCounter.textContent = (currentIndex + 1).toString();
    }

    const thumbnail = thumbnails[currentIndex];
    const thumbnailWidth = thumbnail.offsetWidth;
    const thumbnailSectionWidth = thumbnailSection.offsetWidth;
    const thumbnailPosition = thumbnail.offsetLeft;

    const scrollTo = thumbnailPosition - (thumbnailSectionWidth / 2) + (thumbnailWidth / 2);

    thumbnailSection.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
    });
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateSlider(index);
    });
});

leftArrow.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider(newIndex);
});

rightArrow.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;
    updateSlider(newIndex);
});

let touchStartX = 0;
let touchEndX = 0;

mainImageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

mainImageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < swipeThreshold) return;

    if (swipeDistance > 0) {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider(newIndex);
    } else {
        const newIndex = (currentIndex + 1) % images.length;
        updateSlider(newIndex);
    }
}

updateSlider(0);
