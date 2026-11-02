# Glass Profile

A single-page profile site with an Apple-inspired glass aesthetic, built with React, Vite, and CSS Modules. Dark glass with gradient light is the default; a light theme is included.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Quick start

```bash
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run resume   # regenerate public/resume.pdf from profile.json
```

## Resume

`public/resume.pdf` is generated from the profile data by `scripts/generate-resume.mjs` with no dependencies. Update `profile.json` and run `npm run resume` to refresh it; the hero's "See my resume" button downloads that file.

## Colors

The palette is fixed to five colors, defined once in `src/shared/styles/tokens.css`:

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--bg-base` | `#000000` | `#e5e5e5` | Page background |
| navy | `#14213d` | `#14213d` | Glass depth, orbs, light-theme text |
| `--accent` | `#fca311` | `#fca311` | Primary accent |
| `--accent-soft` | `#e5e5e5` | `#ffffff` | Gradient highlight stop |
| `--text-primary` | `#ffffff` | `#14213d` | Body text |

Theme-dependent accent text uses `--accent-ink` (amber in dark, navy in light) so contrast holds in both themes.

## Structure

Modular monolith: one deployable app, isolated feature modules with public entrypoints.

```
src/
  app/                    app shell: ThemeProvider, background, header, footer
  modules/
    profile/              profile feature
      components/         Hero, About, Stats, Skills, Projects, Socials, Contact
      data/profile.json   all editable content
      ProfilePage.jsx
      index.js            public API for the module
    theme/                theme provider, toggle, context
  shared/
    components/           GlassCard, Button, Reveal, SectionHeading, Tag
    hooks/useInView.js
    styles/               design tokens + global styles
```

## Customize

- **Content:** edit `src/modules/profile/data/profile.json` (name, bio, stats, skills, projects, socials).
- **Photo:** replace `public/avatar.jpg`; keep the `avatar` path in the JSON in sync.
- **Social icons:** add the mapping in `src/modules/profile/components/SocialsCard/socialIcons.js`.
- **Colors and glass:** edit `src/shared/styles/tokens.css`; both dark and `[data-theme="light"]` palettes live there.
- **Favicon / meta:** `public/favicon.svg` and `index.html`.

## Notes

- The theme is stored in `localStorage` under `profile-theme`; the key is also used by the inline script in `index.html` to avoid a flash on load.
- Motion respects `prefers-reduced-motion`; cards reveal on scroll and animate out when reduced motion is requested.
- No test runner or linter is configured. `npm run build` is the verification step.
- Shared components are reusable (glass cards, buttons, tags, reveal wrapper); prefer them over ad-hoc styling.
