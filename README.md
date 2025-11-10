# Paulina — Portfolio

A simple, responsive, and accessible portfolio site built with plain HTML, CSS, and JavaScript. No build tools or frameworks required.

## Quick Start

1. Open `index.html` in your browser:
   - Double‑click it in Finder, or
   - Serve the folder with a simple HTTP server (optional).

```bash
# macOS (Python 3)
cd /Users/paulina/Portfolio
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Customize

- Update name and content in `index.html`:
  - Hero title, subtitle
  - About text and skills under the `About` section
  - Project titles, descriptions, and links in the `Projects` section
  - Email and social links in the `Contact` section
- Tweak colors, spacing, and layout in `styles.css`.
- Navigation and smooth scrolling are handled by `script.js`.

## Structure

```
/Users/paulina/Portfolio
├─ index.html   # Semantic markup and content
├─ styles.css   # Responsive, accessible styling
└─ script.js    # Small enhancements (mobile menu & smooth scroll)
```

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`)
- Skip link for keyboard users
- Visible focus styles and proper `aria-expanded` on the mobile menu

## License

MIT


