// SHARED COMPONENT HELPER

function getComponentUrl(path) {
  return new URL(path, window.location.origin).href;
}

function injectStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }

    element.innerHTML = await response.text();

  } catch (error) {
    console.error("Component Load Error:", error);
  }
}

function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show-menu");

      menuBtn.innerHTML =
        navLinks.classList.contains("show-menu")
          ? "✕"
          : "☰";
    });
  }

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

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });
}


// SHARED CSS

injectStylesheet(
  getComponentUrl("/styles/home.css")
);


// COMPONENT PATHS

const navbarPath =
  getComponentUrl("/components/navbar.html");

const footerPath =
  getComponentUrl("/components/footer.html");

// LOAD COMPONENTS


(async () => {
  await loadComponent("navbar", navbarPath);
  initNavbar();

  await loadComponent("footer", footerPath);
})();