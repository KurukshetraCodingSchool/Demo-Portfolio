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
    const whatsappUrl = `https://wa.me/${918959478949}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Message sent successfully!');
    
    // Reset form
    this.reset();
});
