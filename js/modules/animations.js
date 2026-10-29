export function initFeaturesAnimation() {

    // АНИМАЦИЯ ГАЛОЧЕК
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featuresObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    featuresObserver.observe(document.querySelector('.features__list'));

}
