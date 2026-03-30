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
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const tabSections = Array.from(document.querySelectorAll('.tab-section'));

    if (!tabSections.length) return;

    const sectionIds = new Set(tabSections.map((section) => section.id));

    const setActiveSection = (id, updateHash = true) => {
        const targetId = sectionIds.has(id) ? id : 'about';

        tabSections.forEach((section) => {
            section.hidden = section.id !== targetId;
        });

        navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + targetId);
        });

        if (updateHash) {
            history.replaceState(null, '', '#' + targetId);
        }

        const top = nav ? nav.offsetHeight : 0;
        window.scrollTo({ top, behavior: 'smooth' });

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const hash = anchor.getAttribute('href') || '';
            const id = hash.replace('#', '');
            if (!sectionIds.has(id)) return;
            e.preventDefault();
            setActiveSection(id);
        });
    });

    const initialHash = window.location.hash.replace('#', '');
    setActiveSection(initialHash || 'about', false);

    window.addEventListener('hashchange', () => {
        const id = window.location.hash.replace('#', '');
        setActiveSection(id || 'about', false);
    });
});
