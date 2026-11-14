/* ══════════════════════════════════════
   VS ULTIMATE MultiPlayer — Script
══════════════════════════════════════ */

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Hamburger menu ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Particle generator ───
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1.5;
    const left = Math.random() * 100;
    const delay = Math.random() * 14;
    const dur = Math.random() * 10 + 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%; bottom:-10%;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ─── Scroll-in reveal for cards ───
const revealItems = document.querySelectorAll('.feature-card, .license-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => revealObserver.observe(el));

// ─── Screenshot parallax subtle ───
const playerImg = document.getElementById('player-img');
window.addEventListener('scroll', () => {
  if (!playerImg) return;
  const rect = playerImg.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    playerImg.style.transform = `translateY(${(pct - 0.5) * -18}px)`;
  }
});

// ─── Download link (Google Drive direct) ───
const DOWNLOAD_URL = 'https://www.dropbox.com/scl/fi/9z7w54a5vcfjsw24ruuma/VS-ULTIMATE-Player.exe?rlkey=mfop851n1fe3r41phiudi61nf&st=3ss59p07&dl=1';

// Set href on all download buttons immediately
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#hero-download-btn, #main-download-btn').forEach(btn => {
    btn.href = DOWNLOAD_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.removeAttribute('onclick');
    btn.addEventListener('click', showDownloadToast);
  });
});

function showDownloadToast() {
  const toast = document.getElementById('download-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// Legacy onclick fallback (called by inline onclick in HTML)
function startDownload(e) {
  e.preventDefault();
  showDownloadToast();
  setTimeout(() => { window.open(DOWNLOAD_URL, '_blank'); }, 200);
}

// ─── Smooth scrolling for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') return;
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Stat counter animation ───
function animateCounters() {
  // Numbers are already static text, but we add a flash effect
  document.querySelectorAll('.stat-num').forEach(el => {
    el.style.textShadow = '0 0 30px rgba(229,0,26,0.8)';
    setTimeout(() => {
      el.style.textShadow = '0 0 20px rgba(229,0,26,0.4)';
    }, 600);
  });
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounters(); statsObserver.disconnect(); }
  });
}, { threshold: 0.5 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);
