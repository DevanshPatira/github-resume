// ====== Year ======
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Mobile nav ======
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click (mobile)
  navMenu.querySelectorAll('a.nav-link').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );
}

// ====== Scroll reveal ======
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ====== Active link highlight ======
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-link')];

const spy = () => {
  const pos = window.scrollY + 96;
  let current = sections[0].id;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop) current = sec.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
};
spy();
window.addEventListener('scroll', () => {
  spy();
}, { passive: true });

// ====== Theme toggle (persisted) ======
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const setTheme = (mode) => {
  if (mode === 'dark') {
    root.style.colorScheme = 'dark';
    localStorage.setItem('theme', 'dark');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f172a');
  } else {
    root.style.colorScheme = 'light';
    localStorage.setItem('theme', 'light');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
  }
};

const stored = localStorage.getItem('theme');
if (stored) setTheme(stored);

themeToggle?.addEventListener('click', () => {
  const next = (localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// ====== Smooth focus for skip hash (accessibility) ======
window.addEventListener('hashchange', () => {
  const el = document.getElementById(location.hash.slice(1));
  if (el) el.setAttribute('tabindex', '-1'), el.focus();
});

// ====== Fake form handler (demo) ======
const form = document.querySelector('form.form');
form?.addEventListener('submit', () => {
  alert('Thanks! Connect this form to Formspree/EmailJS or your backend to receive messages.');
});
