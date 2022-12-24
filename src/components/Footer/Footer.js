import React from 'react'
import { Container, Typography} from '@mui/material';

import { useTheme } from "@mui/material";

import VithursanLogo from "../../assets/images/VithursanLogo";


const Footer = () => {

  const theme = useTheme();

  const container = {
    width: "100%",
    //maxWidth: 'xl',
    minHeight: "6vh",
    display:"flex",
    alignItems:"center",
    background: theme.palette.primary.main,
    justifyContent: 'space-between',
    px: 4,
    //margin: 0
  }

  return (
    <Container maxWidth={false} sx={container}>
      {/* <Grid container spacing={2} alignItems="center" justifyContent='space-between'> */}
        {/* <Grid item xs={5}> */}
          <VithursanLogo width="110px" color={theme.loadLogoColor}/> 
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
          {/* <Typography>
            vithiru
          </Typography> */}
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
          <Typography>
            vithiru
          </Typography>
        {/* </Grid> */}
      {/* </Grid> */}
      
      
    </Container>
  )
}

export default Footer