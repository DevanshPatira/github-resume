/* ===== Helpers ===== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/* ===== One-time hero animation =====
   Plays ONLY on the first load in this tab. */
window.addEventListener("DOMContentLoaded", () => {
  const heroBox = document.querySelector(".header__text-box");
  const played = sessionStorage.getItem("heroPlayed");
  if (!played) {
    heroBox.classList.add("hero-enter");
    sessionStorage.setItem("heroPlayed", "1");
  } else {
    // ensure content is visible without animation on subsequent visits
    $$(".heading-primary, .tagline, .sub, .cta", heroBox).forEach(el => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }

  /* ===== Optional: One-time typewriter for the tagline ===== */
  const target = $("#typeTarget");
  const caret = $(".caret");
  if (target) {
    const text = "B.E. Artificial Intelligence & Data Science Student |";
    if (!played) {
      let i = 0;
      const tick = () => {
        target.textContent = text.slice(0, i++);
        if (i <= text.length) {
          requestAnimationFrame(tick);
        } else if (caret) {
          caret.style.opacity = 0.7;
        }
      };
      requestAnimationFrame(tick);
    } else {
      target.textContent = text;
      if (caret) caret.style.opacity = 0.7;
    }
  }

  /* ===== Animate skill bars on first view ===== */
  const bars = $$(".skill__bar");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        const pct = +bar.dataset.percent || 0;
        const fill = $(".skill__fill", bar);
        fill.style.inset = `0 ${(100 - pct)}% 0 0`;
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));

  /* ===== Year + Back to top ===== */
  const y = $("#y"); if (y) y.textContent = new Date().getFullYear();
  const backTop = $("#backTop");
  if (backTop) backTop.addEventListener("click", (e) => {
    e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
