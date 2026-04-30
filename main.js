/* ─── main.js ─── */

// ── Theme Toggle ──
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

// Check local storage or system preference
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
  iconSun.style.display = 'none';
  iconMoon.style.display = 'inline';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  if (isDark) {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'inline';
  } else {
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  }
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Custom Cursor ──
const cursor = document.getElementById('customCursor');
const follower = document.getElementById('customCursorFollower');

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move main cursor immediately
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Follower animation loop for smooth trailing effect
  function animateFollower() {
    // Easing factor - lower is slower/smoother
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Add hover states for interactive elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .skill-pill, .tool-badge, .project-card');

  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Intersection Observer: reveal sections ──
const revealEls = document.querySelectorAll(
  '.about-grid, .projects-grid, .skills-grid, .tools-row, .resume-inner, .contact-form, .section-tag, .section-title, .section-sub'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Animated counter ──
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start    = performance.now();
    const animate  = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = target;
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ── EmailJS — Contact form ──
const EMAILJS_PUBLIC_KEY  = 'eOIaJ6sq7tETY7HYp';
const EMAILJS_SERVICE_ID  = 'service_uzk19vb';
const EMAILJS_TEMPLATE_ID = 'template_j5btg4p';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form        = document.getElementById('contactForm');
const successMsg  = document.getElementById('formSuccess');
const errorMsg    = document.getElementById('formError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');

  // Hide previous feedback
  successMsg.classList.remove('show');
  errorMsg.classList.remove('show');

  // Basic validation
  const fname   = document.getElementById('fname').value.trim();
  const lname   = document.getElementById('lname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!fname || !email || !message) {
    errorMsg.textContent = '⚠️ Please fill in all required fields.';
    errorMsg.classList.add('show');
    return;
  }

  // Loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:    `${fname} ${lname}`.trim(),
      from_email:   email,
      email:        email,
      message:      message,
      time:         new Date().toLocaleString(),
    });

    form.reset();
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  } catch (err) {
    console.error('EmailJS error:', err);
    errorMsg.textContent = '❌ Failed to send. Please email me directly at sm.hariprasath16@gmail.com';
    errorMsg.classList.add('show');
    setTimeout(() => errorMsg.classList.remove('show'), 6000);
  } finally {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
  }
});

// ── Cursor glow effect on hero ──
const hero = document.querySelector('.hero');
if (hero && !isTouchDevice) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--gx', x + 'px');
    hero.style.setProperty('--gy', y + 'px');
  });
}

// ── Skill pills stagger ──
const pills = document.querySelectorAll('.skill-pill');
pills.forEach((pill, i) => {
  pill.style.transitionDelay = (i * 30) + 'ms';
});

// ── Smooth active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--orange)';
    }
  });
}, { passive: true });

// ── Add reveal to project cards individually ──
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = (i * 80) + 'ms';
  observer.observe(card);
});
