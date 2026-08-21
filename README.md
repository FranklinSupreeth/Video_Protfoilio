# Franklin Supreeth — Portfolio

A React + Vite + Tailwind portfolio, adapted from a video-portfolio template, personalized with
Franklin's real bio, education, skills, and projects.

## ⚠️ Before you run this: add your two media files

The build works right now, but the Hero video and About photo are **empty placeholder files**.
Drop your real files in at these exact paths (same filenames, so no code changes needed):

| What | Path |
|---|---|
| Intro video (Hero background) | `src/assets/hero-video/franklin-intro.mp4` |
| Profile photo (About badge) | `src/assets/about/franklin-profile.png` |

Just replace the empty files at those paths with your real ones (keep the same filenames), or
rename your files to match and drop them in.

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## What changed from the original template

- **Navbar / Preloader / Footer** — rebranded from "Leeshark" to Franklin, nav links now smooth-scroll
  to matching section IDs (`#home #about #skills #projects #contact`).
- **Hero** — new heading/subheading, buttons scroll to Projects / Contact.
- **About** — real bio + a new **Education** block (MCA, Kristu Jayanti College; completed BCA),
  skill icon row swapped to React / Flask / Django / MySQL / PostgreSQL.
- **Skills** (renamed from `Services.jsx` → `Skills.jsx`) — four cards: Frontend, Backend,
  Databases & Deployment, Cybersecurity.
- **Projects** (new file, `Projects.jsx`) — six project cards (TimeAura, The Vault of Seven,
  NeuroScan AI, Nike Clone, Melody Madness, Portfolio Website) with a GitHub link-out.
- **Contact / Footer** — real GitHub (`github.com/FranklinSupreeth`) and LinkedIn links.

## Deploying

This is a static Vite build — deploy `dist/` to Vercel, Netlify, or Render exactly like your other
projects. For Netlify: build command `npm run build`, publish directory `dist`.
