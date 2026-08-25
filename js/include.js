// =========================
// SHARED COMPONENT HELPER
// =========================

function getComponentUrl(path) {
  return new URL(path, window.location.href).href;
}

function injectStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function createLoader() {
  if (document.getElementById('preloader')) return;

  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-card">
      <div class="preloader-spinner"></div>
      <p>Loading Sutra Health</p>
    </div>
  `;
  document.body.prepend(preloader);

  const style = document.createElement('style');
  style.textContent = `
    #preloader {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, rgba(5, 10, 6, 0.9), rgba(6, 14, 9, 0.98));
      z-index: 99999;
      transition: opacity 0.35s ease, visibility 0.35s ease;
    }

    #preloader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .preloader-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 28px;
      border-radius: 24px;
      background: rgba(15, 34, 19, 0.95);
      box-shadow: 0 20px 60px rgba(0,0,0,0.28);
      backdrop-filter: blur(10px);
    }

    .preloader-spinner {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 5px solid rgba(255,255,255,0.14);
      border-top-color: #2eb872;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .preloader-card p {
      color: #eef5ec;
      letter-spacing: 0.2em;
      font-size: 0.92rem;
      text-transform: uppercase;
      margin: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

function hideLoader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  preloader.classList.add('hidden');
  setTimeout(() => preloader.remove(), 450);
}

async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;
  } catch (error) {
    console.error('Component Load Error:', error);
  }
}

function initNavbar() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show-menu');
      menuBtn.innerHTML = navLinks.classList.contains('show-menu') ? '✕' : '☰';
    });
  }

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

createLoader();

const navbarCss = getComponentUrl('../styles/Navbar.css');
const footerCss = getComponentUrl('../styles/Footer.css');
injectStylesheet(navbarCss);
injectStylesheet(footerCss);

const navbarPath = getComponentUrl('../Components/Navbar.html');
const testimonialsPath = getComponentUrl('../Components/testimonials.html');
const yogaPath = getComponentUrl('/yoga.html');
const footerPath = getComponentUrl('../Components/Footer.html');

// ✅ Yeh lagao:
(async () => {
  await loadComponent('navbar', navbarPath);
  initNavbar();
  await loadComponent('yoga', yogaPath);
  await loadComponent('testimonials', testimonialsPath);
  await loadComponent('footer', footerPath);
})();

window.addEventListener('load', hideLoader);

