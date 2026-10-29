export function initPricingAnimation() {

    // АНИМАЦИЯ ГАЛОЧЕК
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featuresObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    const lists = document.querySelectorAll('.card__list');
    lists.forEach(list => featuresObserver.observe(list));
}
