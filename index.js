/* ===== UTIL ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ===== THEME TOGGLE ===== */
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.classList.toggle("light", savedTheme === "light");
$("#themeToggle").addEventListener("click", () => {
  const isLight = root.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ===== MOBILE DRAWER ===== */
const drawer = $("#drawer");
const overlay = $("#overlay");
$("#menuToggle").addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("show");
});
overlay.addEventListener("click", () => {
  drawer.classList.remove("open");
  overlay.classList.remove("show");
});

/* ===== STICKY HEADER SHADOW ===== */
const header = document.querySelector("[data-header]");
const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===== SMOOTH REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting));
}, { threshold: 0.12 });
$$(".section, .card, .timeline .item").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

/* ===== COUNTERS ===== */
$$(".num").forEach((el) => {
  const target = Number(el.dataset.count || 0);
  let cur = 0;
  const step = Math.max(1, Math.round(target / 40));
  const tick = () => {
    cur = Math.min(target, cur + step);
    el.textContent = cur;
    if (cur < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* ===== FILTERS ===== */
const grid = $("#projectGrid");
$$(".filters .chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filters .chip").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const tag = btn.dataset.filter;
    $$("article.card", grid).forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").split(",");
      const show = tag === "all" || tags.map((t) => t.trim()).includes(tag);
      card.style.display = show ? "" : "none";
    });
  });
});

/* ===== CONTACT FORM (client-side validation demo) ===== */
const form = $("#contactForm");
const status = $("#formStatus");
const showErr = (name, msg) => {
  const small = $(`.error[data-for="${name}"]`);
  if (small) small.textContent = msg || "";
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showErr("name"); showErr("email"); showErr("message");
  const data = Object.fromEntries(new FormData(form).entries());
  let ok = true;
  if (!data.name || data.name.length < 2) { showErr("name", "Please enter your name."); ok = false; }
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) { showErr("email", "Valid email required."); ok = false; }
  if (!data.message || data.message.length < 10) { showErr("message", "Message must be at least 10 characters."); ok = false; }
  if (!ok) return;

  // Demo: simulate network request
  status.textContent = "Sending…";
  await new Promise(r => setTimeout(r, 900));
  status.textContent = "Thanks! I’ll get back to you soon.";
  form.reset();
});

/* ===== YEAR + BACK TO TOP ===== */
$("#year").textContent = new Date().getFullYear();
$("#toTop").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
