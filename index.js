// Animation and Scroll Handling
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-item, .testimonial-card, .project-card, .about-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate');
        }
    });
}

// Initialize animations
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const slideCount = slides.length;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Slider event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide with pause on hover
let slideInterval = setInterval(nextSlide, 5000);

testimonialTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
testimonialTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loading-overlay');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
});

// Form Validation and Handling
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitButton.classList.add('loading');
        submitButton.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showMessage('Message sent successfully!');
            contactForm.reset();
            
        } catch (error) {
            showMessage('Error sending message. Please try again.', true);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
}

if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    const newsletterButton = newsletterForm.querySelector('button');

    newsletterInput.addEventListener('input', () => {
        const email = newsletterInput.value.trim();
        newsletterForm.classList.toggle('error', email && !isValidEmail(email));
    });

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        if (!isValidEmail(email)) {
            showNewsletterMessage('Please enter a valid email address', true);
            return;
        }
        
        newsletterButton.classList.add('loading');
        newsletterButton.innerHTML = '<i class="fas fa-spinner"></i> Subscribing...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            showNewsletterMessage('Thank you for subscribing!');
            newsletterForm.reset();
            
        } catch (error) {
            showNewsletterMessage('Error subscribing. Please try again.', true);
        } finally {
            newsletterButton.classList.remove('loading');
            newsletterButton.innerHTML = 'Subscribe';
        }
    });
}

// Utility Functions
function validateInput(input) {
    const value = input.value.trim();
    
    if (input.required && !value) {
        setError(input, 'This field is required');
    } else if (input.type === 'email' && !isValidEmail(value)) {
        setError(input, 'Please enter a valid email');
    } else if (input.type === 'tel' && !isValidPhone(value)) {
        setError(input, 'Please enter a valid phone number');
    } else {
        setSuccess(input);
    }
}

function setError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

function setSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function showMessage(message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `success-message ${isError ? 'error' : ''}`;
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    
    setTimeout(() => messageElement.classList.add('show'), 100);
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

function showNewsletterMessage(message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `newsletter-${isError ? 'error' : 'success'}`;
    messageElement.textContent = message;
    newsletterForm.appendChild(messageElement);
    
    if (isError) {
        newsletterForm.classList.add('error');
        setTimeout(() => {
            newsletterForm.classList.remove('error');
            messageElement.remove();
        }, 3000);
    } else {
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => messageElement.remove(), 300);
        }, 5000);
    }
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}); 