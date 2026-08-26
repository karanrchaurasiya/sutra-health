

(function () {
  function loadComponent(placeholderId, url, doneEvent) {
    const el = document.getElementById(placeholderId);
    if (!el) return; // this page doesn't use this component, skip silently

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
        return res.text();
      })
      .then((html) => {
        el.innerHTML = html;
        document.dispatchEvent(new Event(doneEvent));
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = `<p style="padding:12px;color:#900;">Failed to load ${url}. Are you running this through a local server?</p>`;
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar', '../components/navbar.html', 'navbar:loaded');
    loadComponent('site-footer', '../components/footer.html', 'footer:loaded');
  });
})();
