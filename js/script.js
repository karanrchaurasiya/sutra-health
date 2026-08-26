  // ===== Navbar (hamburger, dropdowns, mobile menu) =====
  // navbar.html is injected asynchronously by layout.js, so this code must
  // NOT run until that injection is done — otherwise hamburger/navRight are
  // null and the whole file crashes, silently killing every script below it
  // (FAQ, slider, scroll-reveal, everything).
  let navbarInitialized = false;

  function initNavbar() {
    if (navbarInitialized) return; // avoid double-binding listeners
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('navRight');
    const overlay = document.getElementById('overlay');

    if (!hamburger || !navRight || !overlay) return; // navbar not in the DOM yet
    navbarInitialized = true;

    const dropdownParents = document.querySelectorAll('.has-dropdown');

    function closeMenu(){
      hamburger.classList.remove('active');
      navRight.classList.remove('open');
      overlay.classList.remove('show');
      dropdownParents.forEach(li => {
        li.classList.remove('open');
        const trigger = li.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    function closeSiblingDropdowns(current){
      const parent = current.parentElement;
      if (!parent) return;

      parent.querySelectorAll(':scope > .has-dropdown').forEach(sibling => {
        if (sibling === current) return;
        sibling.classList.remove('open');
        const trigger = sibling.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    // Mark the current page's nav item active (works across any page that
    // includes navbar.html, via <body data-page="...">).
    const currentPage = document.body.dataset.page;
    if (currentPage) {
      const activeItem = document.querySelector(`.nav-links li[data-nav="${currentPage}"]`);
      if (activeItem) activeItem.classList.add('active');
    }

    hamburger.addEventListener('click', () => {
      const isOpen = navRight.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      overlay.classList.toggle('show', isOpen);
    });

    overlay.addEventListener('click', closeMenu);

    // Dropdowns: hover/focus on desktop; click on mobile.
    dropdownParents.forEach(li => {
      const link = li.querySelector(':scope > a');
      if (!link) return;

      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();

          const isOpen = li.classList.contains('open');
          closeSiblingDropdowns(li);
          li.classList.toggle('open', !isOpen);
          link.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });

    // Close mobile menu when a real destination link is clicked.
    document.querySelectorAll('.nav-links a').forEach(a => {
      // Dropdown trigger links are handled above.
      if (a.parentElement.classList.contains('has-dropdown')) return;

      a.addEventListener('click', () => {
        if (window.innerWidth <= 992) closeMenu();
      });
    });

    // Reset state on resize back to desktop.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) closeMenu();
    });
  }

  // Covers both cases: navbar already in the HTML (init immediately),
  // or injected later by layout.js (init once it fires 'navbar:loaded').
  document.addEventListener('DOMContentLoaded', initNavbar);
  document.addEventListener('navbar:loaded', initNavbar);

  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (!preloader) return; // preloader markup is currently commented out in HTML

    setTimeout(function () {
      preloader.classList.add("hide");
    }, 500);
  });

  // ===== Yoga image slider =====
  (function(){
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('#sliderDots button');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!track) return;

    let current = 0;
    const total = dots.length;
    let autoTimer;

    function goTo(i){
      current = (i + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
      resetAuto();
    }

    function resetAuto(){
  clearInterval(autoTimer);
  autoTimer = setTimeout(() => {
    goTo(current + 1);
    resetAuto();
  }, 3000);
}

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.i))));

 

    resetAuto();
  })();

document.addEventListener("DOMContentLoaded", function () {

 // ===== FAQ accordion =====
const items = document.querySelectorAll("#faqList .faq-item");

items.forEach(function (item) {

  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", function () {
    item.classList.toggle("open");
  });

});

});

 // ===== Site-wide scroll-reveal animation =====
  (function(){
    if (!('IntersectionObserver' in window)) return;
 
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // CSS fallback already shows everything statically
 
    // Sections/elements to animate on scroll — grouped so grid items can stagger
    const staggerGroups = [
      '.hero-stats',
      '.whoweare-grid',
      '.conditions-grid',
      '.evidence-features',
      '.wwa-cards',
      '.stat-row',
      '.yoga-timeline',
      '.marquee-wrap .review-card',
      '.footer-inner > *'
    ];
 
    const singleTargets = [
      '.hero-badge', '.hero h2', '.hero p.lead', '.hero-ctas',
      '.whoweare-media', '.whoweare-eyebrow, .whoweare h2, .whoweare-lead',
      '.programs-left', '.programs-right .approach-card', '.programs-right .score-card',
      '.conditions-head',
      '.evidence-card',
      '.yoga-left h2, .yoga-eyebrow, .yoga-left p.desc',
      '.yoga-slider',
      '.traffic-left', '.traffic-visual',
      '.assessment-card',
      '.results-inner > h2', '.approach-checklist', '.contact-card',
      '.faq-head', '.faq-item',
      '.testimonials-head'
    ];
 
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
 
    // Apply reveal class to single (non-grouped) targets
    singleTargets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    });
 
    // Apply reveal class with staggered delay to grouped children
    staggerGroups.forEach(sel => {
      // If selector targets children directly (has a space before last part), grab matched elements;
      // otherwise treat the selector as a container and stagger its direct children.
      const isDirectMatch = sel.includes(' .review-card') || sel.includes(' > *');
      const elements = isDirectMatch
        ? document.querySelectorAll(sel)
        : document.querySelectorAll(sel + ' > *');
 
      elements.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 0.08, 0.48) + 's';
        observer.observe(el);
      });
    });
  })();



// ===== Testimonial marquee controls =====
(function(){
  const toggle = document.querySelector('.testimonial-toggle');
  const track = document.querySelector('.marquee-track');
  if (!toggle || !track) return;

  toggle.addEventListener('click', function(){
    const paused = track.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play testimonials' : 'Pause testimonials');
  });
})();

