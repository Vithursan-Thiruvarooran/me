# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server at localhost:3000
npm run build    # production build
npm test         # run tests (watch mode)
npm test -- --watchAll=false  # single test run
```

## Architecture

This is a single-page personal portfolio built with Create React App. The entire site renders as one page (`/`) with scroll-based navigation between sections.

**Data layer**: All content (bio text, experience entries, project listings, social links) lives in `src/assets/data/data.js` as exported constants. Edit this file to update portfolio content.

**Page structure** (`src/MainPage.js`): Five sections rendered in order — Home, About, Experience, Projects, Contact. Each section is a file under `src/sections/`.

**Containers** (`src/containers/`):
- `SectionContainer` — wraps all sections except Home; handles scroll-triggered fade/slide animations via framer-motion + react-intersection-observer, and renders a divider with the section title
- `HomeContainer` — full-viewport-height layout for the hero section; sits over the honeycomb canvas and passes pointer events through except on links/buttons
- `LoaderContainer` — full-screen splash overlay; after its `duration` it breaks into hex tiles, sets `isLoading` false (so the page animates in underneath), then unmounts

**Contexts** (`src/contexts/`):
- `themeContext` — exposes `isDarkMode` / `setIsDarkMode`; initialized from `prefers-color-scheme`
- `loaderContext` — exposes `isLoading` / `setIsLoading`; used to control the splash loader

**Theme** (`src/assets/theme/theme.js`): Two MUI themes (`lightTheme`, `darkTheme`) sharing a `baseTheme` with custom breakpoints (sm=700, md=960, lg=1320) and custom tokens (`navbarHeight`, `mobileNavbarHeight`, `loadLogoColor`). Primary color is `#6D9886`, background cream is `#F2E7D5`.

**Contact form** (`src/sections/Contact.js`): Uses Formik + Yup for validation, and EmailJS for delivery. Requires three env vars: `REACT_APP_SERVICE_ID`, `REACT_APP_TEMPLATE_ID`, `REACT_APP_PUBLIC_KEY`.

**Hero** (`src/components/Honeycomb/Honeycomb.js`): three.js hex lattice behind the Home section. Tiles flip under the cursor, a click sends a wave of flips, and a 19-hex board region is drawn slightly darker. Colours come from each theme's `honeycomb` token. It is lazy-loaded from `Home.js` so three.js stays out of the main bundle, and it pauses when off-screen.

**Loader** (`src/components/Loader/`): spells "vithiru" on hex tiles that flip in (CSS animations in `Loader.css`).

**Command menu** (`src/components/CommandMenu/CommandMenu.js`): ⌘K / Ctrl+K palette mounted in `Routes.js`. Other components open it with `openCommandMenu()`. Its project entries scroll to `#project-<index>`.

**Projects** (`src/components/ProjectCase/`): each project is a row with a swipeable media gallery (scroll-snap via `useSnapTrack`) and a full-screen `Lightbox`. Media items come from `projects[].media` in `data.js`. An item without `src` renders a "coming soon" placeholder.

**Lazy loading**: `Navbar`, `Loader`, `Footer`, `StickyBar`, `CommandMenu`, and `MainPage` are all lazy-loaded via `React.lazy` in `src/Routes.js`.

**Mobile**: every UI change must work at phone width (~375px), with touch equivalents for hover interactions.
