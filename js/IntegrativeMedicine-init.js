(function () {
  function init() {
    if (window.AOS) {
      AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: "ease-out-cubic"
      });
    }

    window.dataLayer = window.dataLayer || [];

    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", "G-70BG55XT3Q");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();