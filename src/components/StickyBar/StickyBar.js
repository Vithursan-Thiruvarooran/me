import React from 'react'
import { Container, Grid, Link } from '@mui/material';

import IconButton from "@mui/material/IconButton";

import GitHubLogo from '../../assets/images/githubLogo.svg';
import LinkedInLogo from '../../assets/images/linkedinLogo.svg';

import { linkedIn, gitHub } from "../../assets/data/data";

// Hidden on phones, where the header menu already links to GitHub and LinkedIn.
const root = {
  display: { xs: "none", sm: "block" },
  position: "fixed",
  bottom: "8%",
  right: 0,
  width: "90px"
};

const StickyBar = () => {
  return (
    <Container sx={root}>
      <Grid container row="row" justifyContent="center">
        <Grid item xs={8}> 
          <Link href={gitHub} target="_blank" underline="hover" rel="noopener" >
            <IconButton>
              <img style={{width: "25px", height: "25px"}} src={GitHubLogo} alt="GitHub Logo"/>
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Link href={linkedIn} target="_blank" underline="hover" rel="noopener" >
            <IconButton>
              <img style={{width: "25px", height: "25px"}} src={LinkedInLogo} alt="LinkedIn Logo"/>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      
    </Container>
  )
}

export default StickyBar