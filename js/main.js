// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Profile image parallax effect
const profileImage = document.querySelector('.profile-image-wrapper');
if (profileImage) {
    window.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = profileImage.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        profileImage.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    });
}

// Interactive elements hover effect
document.querySelectorAll('.project-card, .nav-link, .cta-primary, .cta-secondary, .profile-image-wrapper').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.border = '1px solid var(--primary-color)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.border = '2px solid var(--primary-color)';
    });
});

// Dynamic text effect for hero section
const typeWriter = (text, element, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Initialize typing effect
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-content p');
    typeWriter('Crafting Digital Excellence Through Code', subtitle, 100);
});

// Enhanced animations: hero entrance, headline shimmer, and reveal observer
window.addEventListener('load', () => {
    // hero entrance
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-hero');
        // shimmer only on the main H1 to not overwhelm
        const h1 = heroContent.querySelector('h1');
        if (h1) h1.classList.add('shimmer-text');
    }

    // reveal observer for project cards, timeline items, contact boxes, and skill items
    const revealSelectors = ['.project-card', '.timeline-item', '.contact-box', '.skill-items span', '.project-tech li'];
    const revealElements = Array.from(document.querySelectorAll(revealSelectors.join(',')));
    if (!revealElements.length) return;

    // add base reveal class
    revealElements.forEach((el, idx) => {
        el.classList.add('reveal');
        // store index for group staggers
        el.style.setProperty('--i', String(idx % 10));
    });

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // small stagger per group: if parent is reveal-group, stagger children
                if (el.parentElement && el.parentElement.classList.contains('reveal-group')) {
                    Array.from(el.parentElement.children).forEach((child, i) => {
                        child.style.transitionDelay = (i * 80) + 'ms';
                        child.classList.add('in-view');
                    });
                } else {
                    el.classList.add('in-view');
                }
                obs.unobserve(el);
            }
        });
    }, { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
});