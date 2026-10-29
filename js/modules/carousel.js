export function initCarousel() {

    // КАРУСЕЛЬ

    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.querySelector('.testimonials__grid');
        const cards = document.querySelectorAll('.testimonials__item');
        const dotsContainer = document.querySelector('.testimonials__dots'); // Контейнер для точек
        const arrowLeft = document.querySelector('.testimonials__arrow--left');
        const arrowRight = document.querySelector('.testimonials__arrow--right');

        let currentIndex = 0;

        const visibleCards = 3;

        const gap = 20;

        const maxIndex = cards.length - visibleCards;

        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('span');
            dot.classList.add('testimonials__dot');

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.testimonials__dot');

        function updateCarousel() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const offset = currentIndex * (cardWidth + gap);

            cards.forEach((card) => {
                card.style.transform = `translateX(-${offset}px)`;
            });

            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('testimonials__dot--active');
                } else {
                    dot.classList.remove('testimonials__dot--active');
                }
            });
        }

        arrowRight.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });

        arrowLeft.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateCarousel();
        });

        const intervalId = setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 4000);

        document.querySelector('.testimonials').addEventListener(('click'), () => {
            clearInterval(intervalId);
        })

        updateCarousel();
    });

}