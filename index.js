// index.js
document.addEventListener('DOMContentLoaded', () => {
  // 0) Let CSS know JS is running (used for reveal fallback)
  document.documentElement.classList.add('js');

  // 1) Year in footer (safe)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Mobile menu
  const navToggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu when a link is clicked
    menu.querySelectorAll('a.nav-link').forEach((a) =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  // 3) Reveal on scroll (safe even if no .reveal exists)
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // 4) Active link highlight
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const spy = () => {
    if (!sections.length || !links.length) return;
    const pos = window.scrollY + 96;
    let current = sections[0].id;
    sections.forEach((sec) => {
      if (pos >= sec.offsetTop) current = sec.id;
    });
    links.forEach((l) =>
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`)
    );
  };
  spy();
  window.addEventListener('scroll', spy, { passive: true });

  // 5) Theme toggle with persistence
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const setTheme = (mode) => {
    if (mode === 'dark') {
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#0f1226');
    } else {
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#ffffff');
    }
  };
  const stored = localStorage.getItem('theme');
  if (stored) {
    setTheme(stored);
  } else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = localStorage.getItem('theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 6) Smooth focus for hash navigation
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: false });
    }
  });

  // 7) Demo form handler
  const form = document.querySelector('form.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks! Connect this form to Formspree/EmailJS or your backend to receive messages.');
    });
  }
});
