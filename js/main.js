// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const randomThemeBtn = document.getElementById('random-theme');
const themes = ['blue', 'purple', 'green', 'orange', 'red', 'pink'];

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getRandomTheme() {
    return themes[Math.floor(Math.random() * themes.length)];
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

randomThemeBtn.addEventListener('click', () => {
    const randomTheme = getRandomTheme();
    setTheme(randomTheme);
});

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Scroll to Top
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Language Switcher
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', (e) => {
    const language = e.target.value;
    // Implement language switching logic here
    console.log(`Language changed to: ${language}`);
});

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    // Implement search logic here
    const results = []; // Add your search results here
    displaySearchResults(results);
});

function displaySearchResults(results) {
    searchResults.innerHTML = results.length ? results.map(result => `
        <a href="${result.url}" class="search-result-item">
            <h4>${result.title}</h4>
            <p>${result.description}</p>
        </a>
    `).join('') : '<p>No results found</p>';
    searchResults.style.display = 'block';
}

// Cookie Consent
const cookieConsent = document.getElementById('cookie-consent');
const acceptCookies = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'block';
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    // Implement newsletter subscription logic here
    console.log(`Newsletter subscription for: ${email}`);
    e.target.reset();
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // Implement form submission logic here
        console.log('Form data:', data);
        e.target.reset();
        alert('Message sent successfully!');
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
    }
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Accessibility Improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
}); 