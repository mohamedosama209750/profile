# AGENTS.md

## Project

Single-page React profile site with an Apple-glass design system. React 19 + Vite 8, CSS Modules, no router, no backend, no state library. Dark theme is the default; light theme is supported.

## Commands

```bash
npm install
npm run dev -- --port 5173
npm run build
npm run preview
npm run resume
```

- Node.js `^20.19.0 || >=22.12.0` is required.
- No test runner, linter, formatter, or typechecker is configured. `npm run build` is the only verification step.
- `dist/` and `node_modules/` are generated; do not edit or commit them.

## Architecture (modular monolith)

One app, isolated feature modules, one-way imports.

- `src/app/`: shell only — theme provider, animated background, sticky header, footer, page layout. It imports modules through their public `index.js`.
- `src/modules/profile/`: the profile feature. `index.js` is the public API (`ProfilePage`, `profile`). Components live in `components/<Name>/` with a co-located `<Name>.module.css`.
- `src/modules/theme/`: theme context/provider/toggle, public API via `index.js`.
- `src/shared/`: cross-module primitives (GlassCard, Button, Reveal, SectionHeading, Tag) and `useInView`, global styles, design tokens. Shared code must not import module internals.
- Keep imports flowing `app -> module public API` and `module -> shared`. Do not reach into `src/modules/*/components` from `app`.

## Where to edit

- Content and profile data: `src/modules/profile/data/profile.json`.
- Avatar: `public/avatar.jpg` (referenced as `/avatar.jpg`).
- Resume: `public/resume.pdf`, generated from `profile.json` by `scripts/generate-resume.mjs` (`npm run resume`). Re-run after changing profile data.
- Social icon keys: `src/modules/profile/components/SocialsCard/socialIcons.js`.
- Colors, blur, radii, shadows, light/dark palettes: `src/shared/styles/tokens.css`.
- Palette is restricted to `#000000`, `#14213d`, `#fca311`, `#e5e5e5`, `#ffffff`. Tints/transparency are derived from them with `color-mix()` or rgba. Do not introduce new hues.
- Accent-colored text/icons use `--accent-ink` (amber in dark, navy in light) — plain `--accent` on light backgrounds fails contrast.
- Global-only classes: `container`, `sr-only`, `skip-link`, `theme-switching` in `src/shared/styles/global.css`. Everything else uses CSS Modules.

## Gotchas

- **Import depth:** components under `src/modules/profile/components/<Name>/` reach shared code with four `../` levels: `../../../../shared/...`. Wrong depth is the most common build failure.
- **Theme key:** `profile-theme` in `localStorage` is duplicated in `src/modules/theme/ThemeProvider.jsx` and the inline script in `index.html`. Keep them in sync to avoid a flash on first paint.
- **Theme switching:** `ThemeProvider` adds `theme-switching` to `<html>` for 220ms to suppress transitions. Do not add `color` transitions to theme-dependent text; that caused light-mode contrast failures.
- **Glass styling:** use `GlassCard` for cards. It owns the blur, border, shadow, spotlight-on-hover, and the no-backdrop-filter fallback.
- **Contact:** there is no email field. Contact actions are built from `profile.socials` (LinkedIn, GitHub, TikTok, Facebook) plus `profile.phone`; keep those URLs and numbers current in `profile.json`.
- **Resume:** `scripts/generate-resume.mjs` is dependency-free and writes `public/resume.pdf`; it throws if the layout overflows one page. The PDF lists the three newest projects (sorted by `year`), so keep profile text concise when adding projects.
- **GitHub Pages base path:** production builds use `base: '/profile/'` so the project site works at `https://mohamedosama209750.github.io/profile/`. Never hard-code `/avatar.jpg` or `/resume.pdf` in components; use the `asset()` helper (`import.meta.env.BASE_URL`) in `Hero.jsx`. Deployment runs via `.github/workflows/deploy.yml` on every push to `main`.
- **Accessibility is part of done:** keep section `aria-labelledby` wiring, focus-visible styles, alt text, and `prefers-reduced-motion` behavior. Both themes were verified at Lighthouse 100 for accessibility, best practices, and SEO.
- **Responsive layout:** 12-column grid; About/Stats and Skills/Socials pair only above 960px. Header nav hides at 880px, hero stacks at 760px, project grid goes 3 → 2 → 1 columns at 900px and 600px.
