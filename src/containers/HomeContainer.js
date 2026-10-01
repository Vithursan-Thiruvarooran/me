import React from "react";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material";

const HomeContainer = ({ children, ...rest }) => {
    const theme = useTheme();

    // Sits over the honeycomb canvas: let pointer events fall through to it, except on controls.
    const container = {
      position: "relative",
      zIndex: 1,
      pointerEvents: "none",
      "& a, & button": { pointerEvents: "auto" },
      minHeight: "100vh",
      display:"flex",
      alignItems:"center",
      paddingTop: `calc( ${theme.spacing(4)}px + ${theme.navbarHeight} ) `,
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.navbarHeight,
      },
    }
    
    return (
      <Container  {...rest} sx={container}>
          {children}
      </Container>
    );
};

export default HomeContainer;