  const hamburger = document.getElementById('hamburger');
  const navRight = document.getElementById('navRight');
  const overlay = document.getElementById('overlay');
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  function closeMenu(){
    hamburger.classList.remove('active');
    navRight.classList.remove('open');
    overlay.classList.remove('show');
    dropdownParents.forEach(li => li.classList.remove('open'));
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navRight.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    overlay.classList.toggle('show', isOpen);
  });

  overlay.addEventListener('click', closeMenu);

  // Dropdown toggle: click on mobile, hover on desktop (hover handled via CSS)
  dropdownParents.forEach(li => {
    const link = li.querySelector('a');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 992){
        e.preventDefault();
        const isOpen = li.classList.contains('open');
        dropdownParents.forEach(other => other.classList.remove('open'));
        li.classList.toggle('open', !isOpen);
      }
    });
  });

  // Close mobile menu when a normal link (no dropdown) is clicked
  document.querySelectorAll('.nav-links > li:not(.has-dropdown) > a, .dropdown a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 992) closeMenu();
    });
  });

  // Reset state on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenu();
  });