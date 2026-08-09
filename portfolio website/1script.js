const starsContainer = document.getElementById('stars');
const starCount = 150;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

document.querySelector('.contact-form button').addEventListener('click', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('.contact-form input[type="text"]');
    const emailInput = document.querySelector('.contact-form input[type="email"]');
    const messageInput = document.querySelector('.contact-form textarea');

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Vul alle velden in!');
        return;
    }

    const to = '101450@glr.nl';
    const subject = encodeURIComponent(`Portfolio contact - ${nameInput.value}`);

    const body = encodeURIComponent(
`Naam:
${nameInput.value}

Email:
${emailInput.value}

Bericht:
${messageInput.value}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('submarineVideo');
    modal.classList.add('active');
    video.play();
}

function closeVideoModal(event) {
    if (event && event.target !== document.getElementById('videoModal')) return;
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('submarineVideo');
    modal.classList.remove('active');
    video.pause();
    video.currentTime = 0;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
});

// Slideshow
const robotownImages = [
    'robotown1.png'
    // Voeg hier meer afbeeldingen toe: 'robotown2.png', 'robotown3.png', etc.
];
let currentSlide = 0;

function openSlideshowModal() {
    currentSlide = 0;
    updateSlide();
    document.getElementById('slideshowModal').classList.add('active');
}

function closeSlideshowModal(event) {
    if (event && event.target !== document.getElementById('slideshowModal')) return;
    document.getElementById('slideshowModal').classList.remove('active');
}

function changeSlide(dir) {
    currentSlide = (currentSlide + dir + robotownImages.length) % robotownImages.length;
    updateSlide();
}

function updateSlide() {
    document.getElementById('slideshowImg').src = robotownImages[currentSlide];
    document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${robotownImages.length}`;
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('slideshowModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Escape') closeSlideshowModal();
    }
});