
document.addEventListener('DOMContentLoaded', () => {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let header = document.querySelector('header');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    let aboutImg = document.querySelector('.about-img');
    let homeImg = document.querySelector('.home-img');
    let aboutLink = document.querySelector('.aboutLink');

    // Toggle navbar and icon
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Scroll behavior
    window.addEventListener('scroll', () => {
        // Sticky header
        header.classList.toggle('sticky', window.scrollY > 100);

        // Auto-close navbar on scroll
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        // Scroll spy effect
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                let currentLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    });

    // Wipe outline animation on clicking the About link
    if (aboutLink) {
        aboutLink.addEventListener('click', () => {
            if (aboutImg) {
                aboutImg.classList.remove('trigger-animation');
                void aboutImg.offsetWidth;
                aboutImg.classList.add('trigger-animation');
            }

            if (homeImg) {
                homeImg.classList.remove('trigger-animation');
                void homeImg.offsetWidth;
                homeImg.classList.add('trigger-animation');
            }
        });
    }

    // ScrollReveal animations
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .services-box, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
});

// Typed.js text animation
const typed = new Typed('.multiple-text', {
    strings: ['Open To Work','Front End Developer', 'Innovator'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1500,
    loop: true
});
