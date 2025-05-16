// static/gh-pages.js
(function() {
  // Redirect non-root paths back to the root with a hash
  const { pathname } = window.location;
  const base = '/governance-framework-site';
  
  if (pathname.startsWith(base) && pathname !== base && pathname !== base + '/') {
    // Extract the path after the base
    const path = pathname.slice(base.length);
    // Redirect to the base with the path as a hash
    window.location.href = base + '/#' + path;
  }
})();
