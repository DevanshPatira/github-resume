// Year in footer
document.getElementById('y').textContent = new Date().getFullYear?.() || new Date().getFullYear();

// Active link highlight on scroll
const navLinks = [...document.querySelectorAll('.nav__link')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      const i = sections.indexOf(e.target);
      if (i > -1 && e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[i].classList.add('active');
      }
    });
  },
  { root: null, rootMargin: '-55% 0px -40% 0px', threshold: 0 }
);
sections.forEach(s => io.observe(s));

// Typing animation
const phrases = [
  "B.E. Artificial Intelligence & Data Science Student",
  "AI • Web • Data Science",
  "Building clean UX + real-world AI"
];
const target = document.getElementById('typeTarget');
let p = 0, c = 0, dir = 1; // 1 typing, -1 deleting
(function typeLoop(){
  const text = phrases[p];
  c += dir;
  target.textContent = text.slice(0, c);
  if (c === text.length + 2) dir = -1;
  if (c === 0) { dir = 1; p = (p + 1) % phrases.length; }
  setTimeout(typeLoop, dir === 1 ? 70 : 40);
})();

// Animate skills bars when visible
const bars = [...document.querySelectorAll('.skill__bar')];
const barObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target;
      const pct = +bar.dataset.percent || 0;
      const fill = bar.querySelector('.skill__fill');
      fill.style.transition = 'width 1100ms ease';
      requestAnimationFrame(() => (fill.style.width = pct + '%'));
      barObs.unobserve(bar);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObs.observe(b));

// Back to top show/hide
const backTop = document.getElementById('backTop');
const showBackTop = () => {
  if (window.scrollY > 400) backTop.style.display = 'inline-block';
  else backTop.style.display = 'none';
};
showBackTop();
window.addEventListener('scroll', showBackTop);
