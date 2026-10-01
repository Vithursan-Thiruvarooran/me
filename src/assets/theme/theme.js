import { createTheme } from '@mui/material/styles';
import darkScrollbar from '@mui/material/darkScrollbar';

const baseTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1320,
      xl: 1920,
    },
  },
  navbarHeight: "64px",
  mobileNavbarHeight: "55px",
  loadLogoColor: '#F2E7D5',
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        }
      }
    }
  }
};

const displayFont = '"Bricolage Grotesque", "Avenir Next", system-ui, sans-serif';
const bodyFont = '"Instrument Sans", "Segoe UI", system-ui, sans-serif';
const headings = Object.fromEntries(
  ["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => [h, { fontFamily: displayFont, fontWeight: 700, letterSpacing: "-0.02em" }])
);

const darkTheme = createTheme({
  navLogoColor: '#6D9886',
  honeycomb: { background: "#1A1A1A", line: "#7FAE99", dot: "#B7D6C7", fill: "#6D9886" },
  palette: {
    mode: "dark",
    background: {
      default: "#1A1A1A",
      paper: "#6D9886"
    },
    primary: {
      main: "#6D9886",
      contrastText: '#F2E7D5',
    },
    secondary: {
      main: "#F2E7D5",
      contrastText: '#6D9886',
    },
  },
  typography: {
    fontFamily: bodyFont,
    ...headings,
    allVariants:{
      color: '#F2E7D5'
    },
    body1: {
      color: '#F7F7F7'
    },
    body2: {
      color: '#F7F7F7'
    },
    caption: {
      color: '#EEEADE'
    }
  },
  ...baseTheme
});

const lightTheme = createTheme({
  navLogoColor: '#6D9886',
  honeycomb: { background: "#F2E7D5", line: "#6D9886", dot: "#3F6B58", fill: "#6D9886" },
  palette: {
    mode: "light",
    background: {
      default: "#F2E7D5",
      paper: "#6D9886"
    },
    primary: {
      main: "#6D9886",
      contrastText: '#F2E7D5',
    },
    secondary: {
      main: '#000000',
      contrastText: '#6D9886',
    },
  },
  typography: {
    fontFamily: bodyFont,
    ...headings,
    allVariants:{
      color: '#000000'
    },
    body1: {
        color: '#000000'
    },
    body2: {
      color: '#000000'
    },
    caption: {
      color: '#000000'
    }
  },
  ...baseTheme
});

export { lightTheme, darkTheme };