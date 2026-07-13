(function () {
  if (!/\/product\.html$/i.test(location.pathname)) return;

  function loadProducts(done) {
    if (window.DOMINUS_PRODUCTS && window.DOMINUS_PRODUCTS.length) {
      done(window.DOMINUS_PRODUCTS);
      return;
    }

    fetch("products-data.js").then(function (response) {
      return response.text();
    }).then(function (text) {
      var box = {};
      Function("window", text + ";return window.DOMINUS_PRODUCTS || [];")(box);
      done(box.DOMINUS_PRODUCTS || []);
    }).catch(function () {
      done([]);
    });
  }

  function setAttr(selector, attr, value) {
    var node = document.querySelector(selector);
    if (node && node.getAttribute(attr) !== value) node.setAttribute(attr, value);
  }

  function applyMeta(product) {
    var title = product.name + " | Dominus Healthcare";
    var url = "https://dominushealthcare.com/product?p=" + encodeURIComponent(product.slug);
    var description = product.name + " - " + product.composition + ". " + product.headline;
    var image = "https://dominushealthcare.com/" + (product.image || "assets/dominus-logo.png");

    if (document.title !== title) document.title = title;
    document.documentElement.setAttribute("data-dominus-product-meta", product.slug);
    setAttr("link[rel='canonical']", "href", url);
    setAttr("meta[name='description']", "content", description);
    setAttr("meta[property='og:title']", "content", title);
    setAttr("meta[property='og:description']", "content", description);
    setAttr("meta[property='og:url']", "content", url);
    setAttr("meta[property='og:image']", "content", image);
  }

  loadProducts(function (products) {
    var slug = new URLSearchParams(location.search).get("p");
    var product = products.find(function (item) {
      return item.slug === slug;
    }) || products[0];

    if (!product) return;

    applyMeta(product);

    var observer = new MutationObserver(function () {
      applyMeta(product);
    });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true });

    [100, 350, 900, 1800].forEach(function (delay) {
      setTimeout(function () {
        applyMeta(product);
      }, delay);
    });

    setTimeout(function () {
      observer.disconnect();
      applyMeta(product);
    }, 2600);
  });
})();
