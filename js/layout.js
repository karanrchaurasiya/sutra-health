// =========================
// COMPONENT LOADER
// =========================

async function loadComponent(id, path) {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(`Missing element: #${id}`);
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} - ${path}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error("Component loading error:", error);
  }
}

// =========================
// NAVBAR
// =========================

function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navRight = document.getElementById("navRight");

  if (!hamburger || !navRight) return;

  hamburger.addEventListener("click", () => {
    const open = navRight.classList.toggle("open");

    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  // Dropdowns on mobile
  document.querySelectorAll(".has-dropdown > a").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (window.innerWidth <= 992) {
        event.preventDefault();

        const parent = trigger.parentElement;

        document.querySelectorAll(".has-dropdown").forEach((item) => {
          if (item !== parent) {
            item.classList.remove("open");
          }
        });

        parent.classList.toggle("open");
      }
    });
  });

  // Close menu after normal link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth <= 992 &&
        !link.parentElement.classList.contains("has-dropdown")
      ) {
        navRight.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Navbar scroll
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true },
    );
  }
}

// =========================
// LOAD
// =========================

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar", "/components/navbar.html");

  initNavbar();

  await loadComponent("footer", "/components/footer.html");
});
