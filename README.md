# Dominus Healthcare

Production-ready static website for Dominus Healthcare Private Limited.

The deployable site lives in `dist/`.

## Preview

```powershell
python -m http.server 4173 --directory dist
```

Then open:

```text
http://127.0.0.1:4173/
```

## Main Files

- `dist/index.html` - homepage
- `dist/about.html` - company profile
- `dist/therapies.html` - therapy areas
- `dist/products.html` - product catalogue
- `dist/product.html?p=<slug>` - product detail
- `dist/partner.html` - partnership enquiries
- `dist/contact.html` - contact and pharmacovigilance
- `dist/products-data.js` - product data source
- `dist/product-meta.js` - product detail metadata updater
- `dist/forms.js` - shared contact/partner form handler
- `dist/responsive.css` - responsive and visual polish

See `dist/README.md` for deployment notes and the full production checklist.
