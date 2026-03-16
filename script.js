// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ========== Active Nav Link on Scroll ==========
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========== Animated Counter ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// ========== Skill Bar Animation ==========
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
    });
}

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Fade-in elements
const fadeElements = document.querySelectorAll(
    '.about-grid, .skill-category, .timeline-item, .edu-card, .contact-card, .tools-cloud'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// Counter animation trigger
const heroStats = document.querySelector('.hero-stats');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (heroStats) counterObserver.observe(heroStats);

// Skill bars animation trigger
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            animateSkillBars();
        }
    });
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

// ========== Smooth Scroll for Safari ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== Typing Effect for Code Window ==========
function typeCode() {
    const codeBody = document.querySelector('.code-body code');
    if (!codeBody) return;

    const html = codeBody.innerHTML;
    codeBody.innerHTML = '';
    codeBody.style.visibility = 'visible';

    let i = 0;
    let inTag = false;
    let buffer = '';

    function addChar() {
        if (i >= html.length) return;

        const char = html[i];

        if (char === '<') {
            inTag = true;
            buffer += char;
            i++;
            addChar();
            return;
        }

        if (char === '>') {
            inTag = false;
            buffer += char;
            i++;
            codeBody.innerHTML = buffer;
            setTimeout(addChar, 0);
            return;
        }

        if (inTag) {
            buffer += char;
            i++;
            addChar();
            return;
        }

        buffer += char;
        codeBody.innerHTML = buffer;
        i++;
        setTimeout(addChar, 18);
    }

    // Start typing after a short delay
    setTimeout(addChar, 800);
}

// Run typing effect when hero is visible
const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeCode();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (heroSection) heroObserver.observe(heroSection);
