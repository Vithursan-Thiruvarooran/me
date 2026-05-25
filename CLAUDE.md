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
- `HomeContainer` — full-viewport-height layout for the hero section
- `LoaderContainer` — wraps the initial page loader

**Contexts** (`src/contexts/`):
- `themeContext` — exposes `isDarkMode` / `setIsDarkMode`; initialized from `prefers-color-scheme`
- `loaderContext` — exposes `isLoading` / `setIsLoading`; used to control the splash loader

**Theme** (`src/assets/theme/theme.js`): Two MUI themes (`lightTheme`, `darkTheme`) sharing a `baseTheme` with custom breakpoints (sm=700, md=960, lg=1320) and custom tokens (`navbarHeight`, `mobileNavbarHeight`, `loadLogoColor`). Primary color is `#6D9886`, background cream is `#F2E7D5`.

**Contact form** (`src/sections/Contact.js`): Uses Formik + Yup for validation, and EmailJS for delivery. Requires three env vars: `REACT_APP_SERVICE_ID`, `REACT_APP_TEMPLATE_ID`, `REACT_APP_PUBLIC_KEY`.

**Lazy loading**: `Navbar`, `Loader`, `Footer`, `StickyBar`, and `MainPage` are all lazy-loaded via `React.lazy` in `src/Routes.js`.
