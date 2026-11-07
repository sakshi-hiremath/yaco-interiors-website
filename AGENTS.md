# YACO Interiors & Contractor — website

Static multi-page marketing site (plain HTML/CSS/JS, no build step). See README.md for the folder tree.

## Structure (important when editing)
- `index.html` (root) = Home. Every other page lives in `pages/` (`pages/projects/index.html` + `pages/projects/project-1..5.html`, `services`, `process`, `commercial`, `about`, `contact`).
- Shared code: `assets/css/style.css`, `assets/js/main.js`, `assets/js/reel.js` (home only). Fonts: `assets/fonts/`. Images: `assets/images/{brand,projects/project-N,commercial,general,gallery}/`. Hero clips + posters: `assets/videos/`.
- Paths are RELATIVE: root page uses `assets/...`; pages in `pages/` use `../assets/...`; pages in `pages/projects/` use `../../assets/...`. Links between pages use the same relative style. Keep this when adding pages.
- Every page repeats the same `<nav>`, mobile menu, WhatsApp button and `<footer>`; change one → change all. Mark the current page's nav link with `class="active"`.
- Add a project: copy `pages/projects/project-N.html`, add its card to `pages/projects/index.html` and `index.html`, update prev/next links, put photos in `assets/images/projects/project-N/`. Project 5 = Villa Parla retail showroom (portrait photos → `pd-grid tall`).

## Notes
- Brand logo: `assets/images/brand/logo-light.png` (cream, for dark nav/hero/footer), `logo-bronze.png` (light backgrounds), `logo-full-light.png` (with tagline), `logo-original.jpg`, favicon + touch icon.
- Hero reel: `assets/js/reel.js` — edit the `PHOTOS` list (clip, poster, title) and `PX` (scroll distance per clip). Clips: muted H.264 ≤1080p, ≤4 Mbps.
- Fonts: Inter (variable) + Playfair Display italic accents. Palette tokens at the end of `style.css`: white / `#f7f4f0`, bronze `#a8855f`, text `#3b3530`, medium brown `#6d4f3a` (footer `#5f4533`).
- Section titles get a taupe→bronze gradient on the last 1–2 words automatically (`main.js`). Work icons: `.tl-ic` (process) and `.ic` (execution, why-YACO, stats, contact).
- "Book a Consultation" buttons open WhatsApp (+91 88798 03635) with a prefilled message in the `text=` parameter — identical on every page.
- Keep it dependency-free; compress new images (~250 KB, 1920px wide).
