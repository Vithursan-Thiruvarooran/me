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
  navbarHeight: "70px",
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

const darkTheme = createTheme({
  navLogoColor: '#6D9886',
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