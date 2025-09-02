// Page Loading Animation
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
});

// Navigation Toggle for Mobile
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate stats counter when stats section is visible
      if (entry.target.classList.contains("stats")) {
        animateStats();
      }
    }
  });
}, observerOptions);

// Add animation classes and observe elements
function initScrollAnimations() {
  // Add fade-in-up animation to various elements
  const fadeUpElements = document.querySelectorAll(
    ".section-header, .service-card, .contact-item, .footer-section"
  );

  fadeUpElements.forEach((el, index) => {
    el.classList.add("fade-in-up");
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add fade-in-left animation to vision card
  const visionCard = document.querySelector(".vision-card");
  if (visionCard) {
    visionCard.classList.add("fade-in-left");
    observer.observe(visionCard);
  }

  // Add fade-in-right animation to mission card
  const missionCard = document.querySelector(".mission-card");
  if (missionCard) {
    missionCard.classList.add("fade-in-right");
    observer.observe(missionCard);
  }

  // Observe stats section
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Stats Counter Animation
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;

  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent =
          target + (stat.textContent.includes("%") ? "%" : "+");
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 20);
  });
}

// Service Cards Hover Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Contact Form Handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Form validation
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate form submission
    showNotification("Message sent successfully!", "success");
    this.reset();
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Mouse Trail Effect
let mouseTrail = [];
const trailLength = 10;

document.addEventListener("mousemove", function (e) {
  mouseTrail.push({ x: e.clientX, y: e.clientY });

  if (mouseTrail.length > trailLength) {
    mouseTrail.shift();
  }

  updateTrail();
});

function updateTrail() {
  const existingTrails = document.querySelectorAll(".mouse-trail");
  existingTrails.forEach((trail) => trail.remove());

  mouseTrail.forEach((point, index) => {
    const trail = document.createElement("div");
    trail.className = "mouse-trail";
    trail.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${10 - index}px;
            height: ${10 - index}px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;

    document.body.appendChild(trail);

    setTimeout(() => {
      trail.style.opacity = "0";
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 300);
    }, 100);
  });
}

// Particle Animation for Background
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  const size = Math.random() * 4 + 1;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const duration = Math.random() * 20 + 10;

  particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 50%;
        animation: float-particle ${duration}s infinite linear;
    `;

  container.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, duration * 1000);
}

// Add CSS animation for particles
const style = document.createElement("style");
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Service Card Click Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Create ripple effect
    const ripple = document.createElement("div");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy Loading for Images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Text Reveal Animation
function revealText() {
  const textElements = document.querySelectorAll(".reveal-text");

  textElements.forEach((element) => {
    const text = element.textContent;
    element.innerHTML = "";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.cssText = `
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                transition-delay: ${index * 0.02}s;
            `;
      element.appendChild(span);
    });

    // Trigger animation when element is visible
    observer.observe(element);
  });
}

// Initialize all animations and effects
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  createParticles();
  lazyLoadImages();

  // Add reveal-text class to section titles
  document.querySelectorAll(".section-title").forEach((title) => {
    title.classList.add("reveal-text");
  });

  // revealText();

  // Continuously create new particles
  setInterval(createParticles, 10000);
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
  // Your scroll-dependent code here
  ticking = false;
}

document.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// Add custom cursor effect
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(102, 126, 234, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        display: none;
    `;

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.display = "block";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mouseenter", function () {
    cursor.style.display = "block";
  });

  document.addEventListener("mouseleave", function () {
    cursor.style.display = "none";
  });

  // Scale cursor on hover over interactive elements
  document.querySelectorAll("a, button, .service-card").forEach((element) => {
    element.addEventListener("mouseenter", function () {
      cursor.style.transform = "scale(2)";
    });

    element.addEventListener("mouseleave", function () {
      cursor.style.transform = "scale(1)";
    });
  });
});

// Social media sharing functionality
function shareContent(platform) {
  const url = window.location.href;
  const text = "Check out Skyline Digital Labs - IT Solutions & Training";

  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
}

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Navigate with arrow keys
  if (e.key === "ArrowDown") {
    window.scrollBy(0, 100);
  } else if (e.key === "ArrowUp") {
    window.scrollBy(0, -100);
  }

  // Navigate to sections with number keys
  const sections = ["home", "about", "services", "contact"];
  const keyNumber = parseInt(e.key);

  if (keyNumber >= 1 && keyNumber <= sections.length) {
    const targetSection = document.getElementById(sections[keyNumber - 1]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Add accessibility improvements
function improveAccessibility() {
  // Add skip navigation link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
        transition: top 0.3s ease;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const mainContent = document.querySelector(".hero");
  if (mainContent) {
    mainContent.id = "main-content";
  }
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveAccessibility);
