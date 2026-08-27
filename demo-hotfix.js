(() => {
  const allowed = new Set([
    "Ayr DPI Research Station",
    "Pleystowe Sugar Mill",
    "Bundaberg Aero (BoM 039128)",
  ]);
  const blocked = [
    "Clare",
    "Proserpine Airport",
    "Plane Creek Sugar Mill",
    "Eton Sunwater",
  ];

  const hideUnsupportedStations = () => {
    document.querySelectorAll('.leaflet-marker-icon').forEach((marker) => {
      const text = (marker.textContent || '').trim();
      if (blocked.some((name) => text.includes(name))) {
        marker.style.display = 'none';
        marker.style.pointerEvents = 'none';
        marker.setAttribute('aria-hidden', 'true');
      } else if (Array.from(allowed).some((name) => text.includes(name))) {
        marker.style.display = '';
        marker.style.pointerEvents = '';
      }
    });
  };

  const observer = new MutationObserver(hideUnsupportedStations);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', hideUnsupportedStations);
  setInterval(hideUnsupportedStations, 500);
})();
