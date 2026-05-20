// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
    : (spans[0].style.transform = '', spans[1].style.opacity = '', spans[2].style.transform = '');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => (s.style.transform = '', s.style.opacity = ''));
}));

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
  // scroll-top button
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
});

// ===== SCROLL TO TOP =====
document.getElementById('scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== TYPED EFFECT =====
const titles = ['Java Full Stack Developer', 'Spring Boot Engineer', 'React.js Developer', 'Problem Solver'];
let ti = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const word = titles[ti];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
  if (deleting && ci < 0) { deleting = false; ti = (ti + 1) % titles.length; ci = 0; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== FADE-IN ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => (success.style.display = 'none'), 4000);
});
