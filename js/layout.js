// =========================
// SHARED COMPONENT HELPER
// =========================

function getComponentUrl(path) {
  return new URL(path, window.location.origin).href;
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

// =========================
// NAVBAR
// =========================

function initNavbar() {
  const menuBtn = document.getElementById("hamburger");
  const navRight = document.getElementById("navRight");

  if (!menuBtn || !navRight) return;

  // Mobile menu
  menuBtn.addEventListener("click", () => {
    const isOpen = navRight.classList.toggle("open");

    menuBtn.classList.toggle("active", isOpen);

    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Dropdowns
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(":scope > a");

    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      if (window.innerWidth <= 992) {
        event.preventDefault();

        // Close other dropdowns
        dropdownItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });

        // Toggle current dropdown
        item.classList.toggle("open");
      }
    });
  });

  // Close mobile menu when clicking a normal link
  const normalLinks = document.querySelectorAll(
    ".nav-links a:not(.has-dropdown > a)",
  );

  normalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        navRight.classList.remove("open");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (window.innerWidth > 992) return;

    if (!navRight.contains(event.target) && !menuBtn.contains(event.target)) {
      navRight.classList.remove("open");
      menuBtn.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      dropdownItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });

  // Reset mobile menu when returning to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      navRight.classList.remove("open");
      menuBtn.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      dropdownItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });

  // Navbar scroll state
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    const updateNavbar = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, { passive: true });
  }
}

// =========================
// COMPONENT PATHS
// =========================

const navbarPath = getComponentUrl("/components/navbar.html");

const footerPath = getComponentUrl("/components/footer.html");

// =========================
// LOAD COMPONENTS
// =========================

(async () => {
  await loadComponent("navbar", navbarPath);

  initNavbar();

  await loadComponent("footer", footerPath);
})();
