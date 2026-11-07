# YACO Interiors & Contractor — Website

Static multi-page website (plain HTML, CSS and JavaScript — no build step, no frameworks).

## Open it
Double-click **`index.html`**. Keep the folder together — pages load files from `assets/`.
To preview on a local server instead: `npm run dev` (needs Node) or `python3 -m http.server 8000`.

## Folder structure
```
YACO-Interiors-Website/
├── index.html                  Home (scroll-driven video hero)
├── pages/
│   ├── projects/
│   │   ├── index.html          All projects
│   │   └── project-1.html … project-5.html
│   ├── services.html
│   ├── process.html
│   ├── commercial.html
│   ├── about.html
│   └── contact.html
├── assets/
│   ├── css/style.css           All styles (colours/fonts are variables at the top and end)
│   ├── js/
│   │   ├── main.js             Nav, mobile menu, FAQ, lightbox, accent-word gradient
│   │   └── reel.js             Home hero video reel (edit the PHOTOS list to change clips/titles)
│   ├── fonts/                  Inter + Playfair Display (bundled, with licences)
│   ├── images/
│   │   ├── brand/              YACO logo (light / bronze / full), favicon, touch icon
│   │   ├── projects/project-1 … project-5/
│   │   ├── commercial/
│   │   ├── general/            hero + intro photos
│   │   └── gallery/            spare photos (not currently used)
│   └── videos/                 Hero walkthrough clips + poster frames
├── README.md · START-HERE.txt
└── AGENTS.md · GEMINI.md · .agents/ · package.json · .gitignore    (project/editor config)
```

## Deploy
Upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, cPanel). `index.html` is the entry point.

## Deploy on Vercel
This folder is a plain static site — `vercel.json` already tells Vercel there is no build step.
- **CLI (simplest):** install Node.js, open a terminal in this folder, run `npx vercel` (log in, accept the defaults, answer **N** to "link to existing project"), then `npx vercel --prod` for the live URL.
- **GitHub:** push this folder to a GitHub repo → vercel.com/new → import the repo → Framework Preset **Other** → leave build/output blank → Deploy.
