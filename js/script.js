const counters = [
    { selector: ".experience", end: 3 },
    { selector: ".projects", end: 20 },
    { selector: ".students", end: 150 }
  ];

  counters.forEach(counter => {
    let obj = { val: 0 };
    gsap.to(obj, {
      val: counter.end,
      duration: 2,
      ease: "power1.out",
      onUpdate: () => {
        const el = document.querySelector(counter.selector);
        el.textContent = Math.floor(obj.val);
      }
    });
  });

  const toggleBtn = document.querySelector("#theme-toggle");
  const toggleIcon = document.querySelector("#theme-toggle i");
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
  toggleIcon.classList.toggle("fa-sun");
  toggleIcon.classList.toggle("fa-moon");
  body.classList.toggle("dark-mode");

  // Store preference
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    localStorage.setItem("theme", "light");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
  }

  // Optional: change icon
  toggleBtn.innerHTML = body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Contact Form Handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formStatus = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
        
        // Reset form
        form.reset();
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
    
    return false;
}

// Initialize animations for contact page
function initContactAnimations() {
    // Animate form elements
    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    });
    
    // Animate map section
    gsap.from('.map-container', {
        scrollTrigger: {
            trigger: '.map-section',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
    
    gsap.from('.map-overlay', {
        scrollTrigger: {
            trigger: '.map-section',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3
    });
}

// Initialize animations when the page loads
window.addEventListener('load', () => {
    if (document.querySelector('.contact-page')) {
        initContactAnimations();
    }
});

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial animations
function initAnimations() {
    // Hero section
    gsap.from('.hero-text', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.hero-image', {
        duration: 1,
        x: 30,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.3
    });

    // Achievements Section
    gsap.utils.toArray('.achievement-category').forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'bottom bottom',
                end: 'top center',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            delay: i * 0.2
        });
    });

    gsap.utils.toArray('.achievement-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'bottom bottom',
                end: 'top center',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            x: -30,
            opacity: 0,
            ease: 'power2.out',
            delay: i * 0.1
        });
    });

    // Features section
    gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.1
        });
    });

    // About section
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 30,
        opacity: 0
    });

    // Projects section
    gsap.utils.toArray('.course-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.2
        });
    });

    // Teaching skills
    gsap.utils.toArray('.skill-item').forEach((skill, i) => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.1
        });
    });

    // Team members
    gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.from(member, {
            scrollTrigger: {
                trigger: member,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.2
        });
    });

    // Join team features
    gsap.utils.toArray('.join-feature').forEach((feature, i) => {
        gsap.from(feature, {
            scrollTrigger: {
                trigger: feature,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.1
        });
    });

    // Contact form
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 30,
        opacity: 0
    });

    // Footer sections
    gsap.utils.toArray('.footer-section').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            delay: i * 0.1
        });
    });
}

// Initialize animations when the page loads
window.addEventListener('load', initAnimations);

// Mobile Menu Handling
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

// Toggle mobile menu
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Testimonial Slider
const slider = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const slideWidth = 100;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Event listeners for buttons
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Loading Animation
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 500);
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .feature-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = `${rate}px`;
    });
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
