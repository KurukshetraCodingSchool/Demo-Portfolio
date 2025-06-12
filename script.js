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
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
    };

    // WhatsApp Integration
    const whatsappNumber = '918959478949'; // Your WhatsApp number
    const whatsappMessage = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Message sent successfully!');
    
    // Reset form
    this.reset();
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
