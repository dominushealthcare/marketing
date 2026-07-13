(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.documentElement.classList.add('motion-reduced');
    return;
  }

  var selectors = [
    'main section > *',
    '.home-light-band > *',
    '.home-portfolio-light > *',
    '.brand-logo-chip',
    '[data-card]',
    '[data-reveal]',
    '.site-footer-grid > *'
  ];
  var selector = selectors.join(',');
  var seen = new WeakSet();
  var revealObserver = null;
  var scanQueued = false;

  function isUsableElement(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest('script, style, helmet')) return false;
    if (el.getAttribute('data-motion') === 'off') return false;
    return true;
  }

  function collect(root) {
    var nodes = [];
    if (root.nodeType === 1 && root.matches && root.matches(selector)) nodes.push(root);
    if (root.querySelectorAll) nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll(selector)));
    return nodes.filter(isUsableElement);
  }

  function reveal(el) {
    if (!revealObserver) {
      el.classList.add('is-visible');
      return;
    }
    revealObserver.observe(el);
  }

  function scan(root) {
    collect(root || document).forEach(function (el, index) {
      if (seen.has(el) && el.classList.contains('motion-reveal')) return;
      seen.add(el);
      el.classList.add('motion-reveal');
      el.style.setProperty('--motion-delay', Math.min(index % 8, 7) * 55 + 'ms');
      reveal(el);
    });
  }

  function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(function () {
      scanQueued = false;
      scan(document);
    });
  }

  function ready() {
    document.documentElement.classList.add('motion-ready');

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    scan(document);

    if ('MutationObserver' in window) {
      var mutationObserver = new MutationObserver(queueScan);
      mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
    }

    window.__dominusMotionRefresh = queueScan;
    window.addEventListener('load', queueScan, { once: true });

    var warmupTimer = setInterval(queueScan, 500);
    setTimeout(function () {
      clearInterval(warmupTimer);
      queueScan();
    }, 6500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
