// ========== Page Loader ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 1600);
    }
});

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

// ========== Back to Top Button ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

const fadeElements = document.querySelectorAll(
    '.about-grid, .skill-category, .project-card, .timeline-item, .edu-card, .contact-card, .tools-cloud'
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
        if (char === '<') { inTag = true; buffer += char; i++; addChar(); return; }
        if (char === '>') { inTag = false; buffer += char; i++; codeBody.innerHTML = buffer; setTimeout(addChar, 0); return; }
        if (inTag) { buffer += char; i++; addChar(); return; }
        buffer += char;
        codeBody.innerHTML = buffer;
        i++;
        setTimeout(addChar, 18);
    }
    setTimeout(addChar, 800);
}

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

// ========== Multilingual Support (EN/DE) ==========
const translations = {
    en: {
        // Loader
        'loader.text': 'Loading portfolio...',
        // Nav
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.contact': 'Contact',
        // Hero
        'hero.greeting': "Hello, I'm",
        'hero.role': 'Senior Software Engineer',
        'hero.subtitle': 'Specialist for UI/UX and Embedded Systems with 10+ years of experience building high-performance real-time systems in Automotive & Medical Technology.',
        'hero.cta1': 'Get in Touch',
        'hero.cta2': 'View My Work',
        'hero.cv': 'View CV',
        'hero.stat1': 'Years Experience',
        'hero.stat2': 'Companies',
        'hero.stat3': 'Industries',
        // About
        'about.title': 'About Me',
        'about.intro': 'I\'m a <strong>Senior Software Engineer</strong> based in <strong>Munich, Germany</strong>, specializing in building high-performance C++ applications with Qt and QML for embedded and backend systems.',
        'about.p2': 'With expertise spanning the <strong>automotive</strong> and <strong>medical technology</strong> sectors, I bring deep knowledge of real-time systems, multithreading, socket programming, and STL. I thrive in agile, cross-functional teams and am passionate about crafting user-friendly, reliable software solutions.',
        'about.p3': 'My career has taken me from developing AUTOSAR modules and infotainment HMIs at KPIT Technologies, to leading HMI teams at Faurecia, to building embedded Linux applications and medical device interfaces at Technology and Strategy Engineering in Munich.',
        'about.h1': 'UI/UX Expert',
        'about.h1d': 'Dynamic interfaces with Qt/QML',
        'about.h2': 'C++ Specialist',
        'about.h2d': 'High-performance applications',
        'about.h3': 'Embedded Systems',
        'about.h3d': 'Linux, RTOS, QNX platforms',
        'about.facts': 'Quick Facts',
        'about.fk1': 'Location',
        'about.fv1': 'Munich, Germany',
        // Skills
        'skills.title': 'Technical Skills',
        // Projects
        'projects.title': 'Key Projects',
        // Experience
        'exp.title': 'Professional Experience',
        // Education
        'edu.title': 'Education & Certifications',
        // Contact
        'contact.title': "Let's Connect",
        'contact.intro': "I'm always open to discussing new opportunities, interesting projects, or just having a chat about C++ and embedded systems.",
    },
    de: {
        // Loader
        'loader.text': 'Portfolio wird geladen...',
        // Nav
        'nav.about': '\u00DCber mich',
        'nav.skills': 'F\u00E4higkeiten',
        'nav.projects': 'Projekte',
        'nav.experience': 'Erfahrung',
        'nav.education': 'Bildung',
        'nav.contact': 'Kontakt',
        // Hero
        'hero.greeting': 'Hallo, ich bin',
        'hero.role': 'Senior Softwareentwicklerin',
        'hero.subtitle': 'Spezialistin f\u00FCr UI/UX und Embedded-Systeme mit \u00FCber 10 Jahren Erfahrung in der Entwicklung leistungsstarker Echtzeitsysteme im Automotive- und Medizintechnikbereich.',
        'hero.cta1': 'Kontakt aufnehmen',
        'hero.cta2': 'Meine Arbeit',
        'hero.cv': 'Lebenslauf ansehen',
        'hero.stat1': 'Jahre Erfahrung',
        'hero.stat2': 'Unternehmen',
        'hero.stat3': 'Branchen',
        // About
        'about.title': '\u00DCber mich',
        'about.intro': 'Ich bin eine <strong>Senior Softwareentwicklerin</strong> in <strong>M\u00FCnchen, Deutschland</strong>, spezialisiert auf die Entwicklung leistungsstarker C++-Anwendungen mit Qt und QML f\u00FCr Embedded- und Backend-Systeme.',
        'about.p2': 'Mit Fachwissen im <strong>Automotive-</strong> und <strong>Medizintechnikbereich</strong> bringe ich fundierte Kenntnisse in Echtzeitsystemen, Multithreading, Socket-Programmierung und STL mit. Ich arbeite gerne in agilen, interdisziplin\u00E4ren Teams und bin leidenschaftlich daran interessiert, benutzerfreundliche und zuverl\u00E4ssige Softwarel\u00F6sungen zu entwickeln.',
        'about.p3': 'Meine Karriere hat mich von der Entwicklung von AUTOSAR-Modulen und Infotainment-HMIs bei KPIT Technologies \u00FCber die Leitung von HMI-Teams bei Faurecia bis hin zur Entwicklung von Embedded-Linux-Anwendungen und medizinischen Ger\u00E4teschnittstellen bei Technology and Strategy Engineering in M\u00FCnchen gef\u00FChrt.',
        'about.h1': 'UI/UX-Expertin',
        'about.h1d': 'Dynamische Oberfl\u00E4chen mit Qt/QML',
        'about.h2': 'C++-Spezialistin',
        'about.h2d': 'Hochleistungsanwendungen',
        'about.h3': 'Embedded-Systeme',
        'about.h3d': 'Linux, RTOS, QNX Plattformen',
        'about.facts': 'Kurzprofil',
        'about.fk1': 'Standort',
        'about.fv1': 'M\u00FCnchen, Deutschland',
        // Skills
        'skills.title': 'Technische F\u00E4higkeiten',
        // Projects
        'projects.title': 'Wichtige Projekte',
        // Experience
        'exp.title': 'Berufserfahrung',
        // Education
        'edu.title': 'Bildung & Zertifizierungen',
        // Contact
        'contact.title': 'Kontakt aufnehmen',
        'contact.intro': 'Ich bin immer offen f\u00FCr neue M\u00F6glichkeiten, interessante Projekte oder einfach ein Gespr\u00E4ch \u00FCber C++ und Embedded-Systeme.',
    }
};

let currentLang = localStorage.getItem('portfolio-lang') || 'en';

function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button appearance
    const langLabel = document.getElementById('langLabel');
    const toggle = document.getElementById('langToggle');
    if (langLabel && toggle) {
        const spans = toggle.querySelectorAll('span');
        if (lang === 'de') {
            spans[0].textContent = 'EN';
            spans[0].className = 'lang-inactive';
            spans[2].textContent = 'DE';
            spans[2].className = 'lang-active';
        } else {
            spans[0].textContent = 'EN';
            spans[0].className = 'lang-active';
            spans[2].textContent = 'DE';
            spans[2].className = 'lang-inactive';
        }
    }
}

// Language toggle
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        localStorage.setItem('portfolio-lang', currentLang);
        applyTranslations(currentLang);
    });
}

// Apply saved language on load
if (currentLang !== 'en') {
    applyTranslations(currentLang);
}

// ========== PDF Viewer Modal ==========
function openPdfModal() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    frame.src = 'Nivedita_Chaudhari_CV.pdf';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { frame.src = ''; }, 300);
}

document.getElementById('pdfClose').addEventListener('click', closePdfModal);
document.getElementById('pdfModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePdfModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePdfModal();
});

// ========== GitHub Activity Widget ==========
const GITHUB_USERNAME = 'Nivedita-debug';
const LANG_COLORS = {
    'C++': '#f34b7d', 'Python': '#3572A5', 'JavaScript': '#f1e05a',
    'QML': '#44a51c', 'HTML': '#e34c26', 'CSS': '#563d7c',
    'CMake': '#DA3434', 'C': '#555555', 'Shell': '#89e051'
};

async function loadGitHubProfile() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!res.ok) return;
        const user = await res.json();

        const avatar = document.getElementById('githubAvatar');
        const name = document.getElementById('githubName');
        const bio = document.getElementById('githubBio');
        const repos = document.getElementById('githubRepos');
        const followers = document.getElementById('githubFollowers');
        const following = document.getElementById('githubFollowing');

        avatar.src = user.avatar_url;
        name.textContent = user.name || GITHUB_USERNAME;
        bio.textContent = user.bio || 'Software Engineer passionate about C++ and embedded systems';
        repos.textContent = user.public_repos;
        followers.textContent = user.followers;
        following.textContent = user.following;
    } catch (e) {
        console.log('GitHub profile fetch failed:', e);
    }
}

async function loadGitHubRepos() {
    const grid = document.getElementById('githubReposGrid');
    grid.innerHTML = '<div class="github-loading">Loading repositories...</div>';

    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error('Failed to fetch');
        const repos = await res.json();

        if (repos.length === 0) {
            grid.innerHTML = '<div class="github-loading">No public repositories yet.</div>';
            return;
        }

        grid.innerHTML = repos.map(repo => {
            const langColor = LANG_COLORS[repo.language] || '#8b83ff';
            const desc = repo.description || 'No description provided';
            const stars = repo.stargazers_count;
            const forks = repo.forks_count;
            const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return `
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="github-repo-card">
                    <div class="github-repo-header">
                        <svg class="github-repo-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        <span class="github-repo-name">${repo.name}</span>
                    </div>
                    <p class="github-repo-desc">${desc}</p>
                    <div class="github-repo-meta">
                        ${repo.language ? `<span><span class="lang-dot-gh" style="background:${langColor}"></span>${repo.language}</span>` : ''}
                        ${stars > 0 ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${stars}</span>` : ''}
                        ${forks > 0 ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>${forks}</span>` : ''}
                        <span>Updated ${updated}</span>
                    </div>
                </a>
            `;
        }).join('');
    } catch (e) {
        grid.innerHTML = '<div class="github-loading">Unable to load repositories. Please visit the GitHub profile directly.</div>';
    }
}

loadGitHubProfile();
loadGitHubRepos();

// ========== Visitor Counter / Analytics ==========
function initVisitorStats() {
    const storageKey = 'portfolio-visitor-stats';
    const sessionKey = 'portfolio-session-id';
    const today = new Date().toISOString().split('T')[0];

    let stats = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!stats) {
        stats = { totalVisits: 0, uniqueVisitors: 0, visitors: [], dailyVisits: {}, sessions: [] };
    }

    // Track visit
    stats.totalVisits++;
    stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + 1;

    // Track unique visitors (by generating a persistent ID)
    let visitorId = localStorage.getItem('portfolio-visitor-id');
    if (!visitorId) {
        visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('portfolio-visitor-id', visitorId);
        stats.uniqueVisitors++;
    }

    // Track session for avg time calculation
    let sessionId = sessionStorage.getItem(sessionKey);
    if (!sessionId) {
        sessionId = 's_' + Date.now();
        sessionStorage.setItem(sessionKey, sessionId);
        sessionStorage.setItem('portfolio-session-start', Date.now().toString());
    }

    localStorage.setItem(storageKey, JSON.stringify(stats));

    // Animate the numbers
    animateVisitorStat('totalVisits', stats.totalVisits);
    animateVisitorStat('uniqueVisitors', stats.uniqueVisitors);
    animateVisitorStat('todayVisits', stats.dailyVisits[today] || 0);

    // Calculate avg time on site
    updateAvgTime();
    setInterval(updateAvgTime, 1000);

    // Save session duration on page unload
    window.addEventListener('beforeunload', () => {
        const start = parseInt(sessionStorage.getItem('portfolio-session-start') || '0');
        if (start) {
            const duration = Math.round((Date.now() - start) / 1000);
            const sessions = JSON.parse(localStorage.getItem('portfolio-sessions') || '[]');
            sessions.push(duration);
            if (sessions.length > 50) sessions.shift();
            localStorage.setItem('portfolio-sessions', JSON.stringify(sessions));
        }
    });
}

function animateVisitorStat(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 1200;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function updateAvgTime() {
    const el = document.getElementById('avgTime');
    if (!el) return;

    const start = parseInt(sessionStorage.getItem('portfolio-session-start') || '0');
    const currentDuration = start ? Math.round((Date.now() - start) / 1000) : 0;

    const sessions = JSON.parse(localStorage.getItem('portfolio-sessions') || '[]');
    const allDurations = [...sessions, currentDuration];
    const avg = allDurations.length > 0 ? Math.round(allDurations.reduce((a, b) => a + b, 0) / allDurations.length) : 0;

    if (avg >= 60) {
        const mins = Math.floor(avg / 60);
        const secs = avg % 60;
        el.textContent = `${mins}m ${secs}s`;
    } else {
        el.textContent = `${avg}s`;
    }
}

initVisitorStats();
