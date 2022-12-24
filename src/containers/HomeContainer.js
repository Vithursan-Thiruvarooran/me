import React from "react";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material";

const HomeContainer = ({ children, ...rest }) => {
    const theme = useTheme();

    const container = {
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