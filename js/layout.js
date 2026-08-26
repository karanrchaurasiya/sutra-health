// =========================
// SHARED COMPONENT HELPER
// =========================

function getComponentUrl(path) {
  return new URL(path, window.location.href).href;
}

// =========================
// LOAD COMPONENT
// =========================

async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }

    const data = await response.text();

    element.innerHTML = data;
  } catch (error) {
    console.error("Component Load Error:", error);
  }
}

// =========================
// NAVBAR
// =========================

function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  // Mobile menu
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show-menu");

      menuBtn.innerHTML = navLinks.classList.contains("show-menu") ? "✕" : "☰";
    });
  }

  // Mobile dropdowns
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(":scope > a");

    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();

        dropdown.classList.toggle("active");
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// =========================
// COMPONENT PATHS
// =========================

// KEEP THESE EXACTLY LIKE OLD WORKING CODE

const navbarPath = getComponentUrl("../Components/Navbar.html");

const footerPath = getComponentUrl("../Components/Footer.html");

// =========================
// LOAD NAVBAR + FOOTER
// =========================

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar", navbarPath);

  initNavbar();

  await loadComponent("footer", footerPath);
});
