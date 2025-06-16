// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-item, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial check and scroll event
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
  
  // Update dots
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

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
testimonialTrack.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

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
  
  // Hide loader when all resources are loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1000); // Show loader for at least 1 second
  });
});

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const themeTransitionOverlay = document.createElement('div');
themeTransitionOverlay.className = 'theme-transition-overlay';
document.body.appendChild(themeTransitionOverlay);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Add transition overlay
  themeTransitionOverlay.classList.add('active');
  
  // Update theme after a short delay
  setTimeout(() => {
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Remove transition overlay
    setTimeout(() => {
      themeTransitionOverlay.classList.remove('active');
    }, 300);
  }, 150);
});

// Update theme icon
function updateThemeIcon(theme) {
  const moonIcon = themeToggle.querySelector('.fa-moon');
  const sunIcon = themeToggle.querySelector('.fa-sun');
  
  if (theme === 'dark') {
    moonIcon.classList.add('theme-toggle-exit');
    sunIcon.classList.add('theme-toggle-enter');
    setTimeout(() => {
      moonIcon.classList.remove('theme-toggle-exit');
      sunIcon.classList.remove('theme-toggle-enter');
    }, 300);
  } else {
    sunIcon.classList.add('theme-toggle-exit');
    moonIcon.classList.add('theme-toggle-enter');
    setTimeout(() => {
      sunIcon.classList.remove('theme-toggle-exit');
      moonIcon.classList.remove('theme-toggle-enter');
    }, 300);
  }
}

// Check system theme preference
if (!savedTheme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!savedTheme) {
    const newTheme = e.matches ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
  }
});

// Theme Management
document.addEventListener('DOMContentLoaded', () => {
  const themes = ['theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red', 'theme-pink'];
  const body = document.body;
  const randomTheme = document.querySelector('.random-theme');
  
  // Random theme
  randomTheme.addEventListener('click', () => {
    // Remove all theme classes
    themes.forEach(theme => body.classList.remove(theme));
    
    // Get random theme
    const randomThemeClass = themes[Math.floor(Math.random() * themes.length)];
    
    // Apply new theme
    body.classList.add(randomThemeClass);
    localStorage.setItem('colorTheme', randomThemeClass);
    
    // Add animation
    randomTheme.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      randomTheme.style.transform = 'scale(1.1)';
    }, 300);
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Add loading state
  submitButton.classList.add('loading');
  submitButton.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  try {
    // Simulate API call (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showSuccessMessage('Message sent successfully!');
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    showSuccessMessage('Error sending message. Please try again.', true);
  } finally {
    // Remove loading state
    submitButton.classList.remove('loading');
    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

// Form Validation
const inputs = contactForm.querySelectorAll('input, textarea');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    validateInput(input);
  });
  
  input.addEventListener('blur', () => {
    validateInput(input);
  });
});

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
  
  // Remove existing error message if any
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Add error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  formGroup.appendChild(errorMessage);
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  
  // Remove error message if any
  const errorMessage = formGroup.querySelector('.error-message');
  if (errorMessage) errorMessage.remove();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}

function showSuccessMessage(message, isError = false) {
  // Remove existing message if any
  const existingMessage = document.querySelector('.success-message');
  if (existingMessage) existingMessage.remove();
  
  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `success-message ${isError ? 'error' : ''}`;
  messageElement.textContent = message;
  document.body.appendChild(messageElement);
  
  // Show message
  setTimeout(() => {
    messageElement.classList.add('show');
  }, 100);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    messageElement.classList.remove('show');
    setTimeout(() => {
      messageElement.remove();
    }, 300);
  }, 5000);
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
const newsletterInput = newsletterForm.querySelector('input[type="email"]');
const newsletterButton = newsletterForm.querySelector('button');

newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate email
  const email = newsletterInput.value.trim();
  if (!isValidEmail(email)) {
    showNewsletterError('Please enter a valid email address');
    return;
  }
  
  // Add loading state
  newsletterButton.classList.add('loading');
  newsletterButton.innerHTML = '<i class="fas fa-spinner"></i> Subscribing...';
  
  try {
    // Simulate API call (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showNewsletterSuccess('Thank you for subscribing!');
    
    // Reset form
    newsletterForm.reset();
    
  } catch (error) {
    showNewsletterError('Error subscribing. Please try again.');
  } finally {
    // Remove loading state
    newsletterButton.classList.remove('loading');
    newsletterButton.innerHTML = 'Subscribe';
  }
});

// Real-time email validation
newsletterInput.addEventListener('input', () => {
  const email = newsletterInput.value.trim();
  if (email && !isValidEmail(email)) {
    newsletterForm.classList.add('error');
  } else {
    newsletterForm.classList.remove('error');
  }
});

function showNewsletterSuccess(message) {
  // Remove existing messages
  const existingSuccess = document.querySelector('.newsletter-success');
  const existingError = document.querySelector('.newsletter-error');
  if (existingSuccess) existingSuccess.remove();
  if (existingError) existingError.remove();
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'newsletter-success';
  successMessage.textContent = message;
  newsletterForm.appendChild(successMessage);
  
  // Show message
  setTimeout(() => {
    successMessage.classList.add('show');
  }, 100);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
    setTimeout(() => {
      successMessage.remove();
    }, 300);
  }, 5000);
}

function showNewsletterError(message) {
  // Remove existing messages
  const existingSuccess = document.querySelector('.newsletter-success');
  const existingError = document.querySelector('.newsletter-error');
  if (existingSuccess) existingSuccess.remove();
  if (existingError) existingError.remove();
  
  // Create error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'newsletter-error';
  errorMessage.textContent = message;
  newsletterForm.appendChild(errorMessage);
  
  // Add error class to form
  newsletterForm.classList.add('error');
  
  // Remove error state after 3 seconds
  setTimeout(() => {
    newsletterForm.classList.remove('error');
    errorMessage.remove();
  }, 3000);
}

// Mobile Menu Toggle
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
      // Close mobile menu if open
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
  });
}

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature-item, .project-card, .about-content');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 