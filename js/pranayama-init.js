/* Pranayama page initialization
   Keeps page-specific third-party setup out of HTML. */

(function () {
  "use strict";

  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "G-70BG55XT3Q");

  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-70BG55XT3Q";
  document.head.appendChild(ga);

  // AOS is only loaded when this page actually uses AOS.
  if (!document.querySelector("[data-aos]")) return;

  var aosCss = document.createElement("link");
  aosCss.rel = "stylesheet";
  aosCss.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
  document.head.appendChild(aosCss);

  var aosScript = document.createElement("script");
  aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
  aosScript.onload = function () {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: "ease-out-cubic"
      });
    }
  };
  document.body.appendChild(aosScript);
})();
