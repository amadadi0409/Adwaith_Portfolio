function animateCounter(id, target, duration, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    let current = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    function tick() {
        current += step;
        if (current >= target) {
            el.textContent = String(target) + suffix;
            return;
        }
        el.textContent = String(current) + suffix;
        requestAnimationFrame(tick);
    }

    tick();
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            once: true,
            offset: 70,
            easing: 'ease-out-cubic'
        });
    }

    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;
            if (!target) return;

            e.preventDefault();
            const navOffset = nav ? nav.offsetHeight + 14 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    const setActiveNav = () => {
        const navOffset = nav ? nav.offsetHeight + 30 : 80;
        const scrollPos = window.scrollY + navOffset;

        let currentId = sections.length ? sections[0].id : '';
        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === '#' + currentId;
            link.classList.toggle('is-active', isActive);
        });
    };

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter('projects-count', 3, 900);
                animateCounter('languages-count', 5, 900, '+');
                animateCounter('domains-count', 2, 900);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.35 });
        counterObserver.observe(aboutSection);
    }

    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });
});
