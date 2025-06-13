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
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-text h2', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-text .subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-text p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.hero-image', {
        duration: 1.2,
        x: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Features section animations
    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // About section animations
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Team section animations
    gsap.from('.team-member', {
        scrollTrigger: {
            trigger: '.our-team',
            start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Testimonial animations
    function animateSlide(index) {
        gsap.from(slides[index], {
            duration: 0.8,
            x: 100,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -slideWidth * currentIndex;
        gsap.to(track, {
            duration: 0.5,
            x: offset,
            ease: 'power2.inOut'
        });
        updateDots();
        animateSlide(currentIndex);
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    });

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }, 5000);

    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        }, 5000);
    });

    // Initialize first slide animation
    animateSlide(0);
});

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

// Theme Management
document.addEventListener('DOMContentLoaded', () => {
  const themes = ['theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red', 'theme-pink'];
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const randomTheme = document.querySelector('.random-theme');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  const savedColorTheme = localStorage.getItem('colorTheme');
  
  // Apply saved theme
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  if (savedColorTheme) {
    body.classList.add(savedColorTheme);
  }
  
  // Toggle dark/light mode
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
      body.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
  
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