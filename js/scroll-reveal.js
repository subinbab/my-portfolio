// Scroll reveal functionality
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to elements we want to animate
    const elements = document.querySelectorAll('.work-card, .expertise-card, .contact-method, .skills-list li');
    elements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});
