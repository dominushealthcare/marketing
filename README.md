# Dominus Healthcare Website

Static production website for Dominus Healthcare Private Limited.

## Production Routes

Primary route files use lowercase names:

| File | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `about.html` | Company profile and quality model |
| `therapies.html` | Therapy area overview |
| `products.html` | Filterable product catalogue |
| `product.html?p=<slug>` | Product detail page |
| `partner.html` | Business development and partner enquiry |
| `contact.html` | Contact, careers, pharmacovigilance and enquiry form |

Mixed-case route files are not used. Keep public page filenames lowercase for
portable hosting and predictable URLs.

## Shared Files

| File | Purpose |
| --- | --- |
| `site-nav.dc.html` | Shared navigation and analytics tags |
| `site-footer.dc.html` | Shared footer and compliance note |
| `molecule-field.dc.html` | Animated background component |
| `products-data.js` | Single source of product catalogue/detail data |
| `product-meta.js` | Product detail title, canonical and social metadata updater |
| `forms.js` | Shared contact and partner form submission handler |
| `responsive.css` | Responsive layout fixes and homepage light-band styling |
| `support.js` | Runtime required for `.dc.html` component imports |
| `assets/` | Logos, product artwork, team images and brand logo crops |
| `robots.txt` / `sitemap.xml` | Search crawl configuration |

## Local Preview

This branch is published by GitHub Pages from `main / root`, so the production
HTML files live directly at the repository root.

From the repository root:

```powershell
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

## Forms

`partner.html` and `contact.html` post to the Google Apps Script URL stored in:

```javascript
window.__DOMINUS_FORM_ENDPOINT
```

See `forms-setup.md` before changing the endpoint. Keep both pages aligned if
the endpoint changes.

## Deployment

GitHub Pages is configured to publish from the `main` branch root. Required
production files at the repository root:

- all lowercase `.html` routes
- `.dc.html` shared components
- `support.js`
- `responsive.css`
- `products-data.js`
- `product-meta.js`
- `forms.js`
- `assets/`
- `.nojekyll`
- `CNAME`
- `robots.txt`
- `sitemap.xml`

Keep `.nojekyll` present so files are served as-is. Keep `CNAME` present with
`dominushealthcare.com` so GitHub Pages continues serving the custom domain.

## Production Checklist

- Canonical URLs point to `https://dominushealthcare.com/`.
- Sitemap product details use `https://dominushealthcare.com/product?p=<slug>`.
- Public links use lowercase route files.
- Mixed-case route files are absent; public links use lowercase routes only.
- Product catalogue/detail data is edited in `products-data.js`.
- Desktop and mobile pages should have no horizontal overflow.
