import React from 'react'
import { Container, Grid, Link } from '@mui/material';

import ThemeToggle from '../ThemeToggle/ThemeToggle';
import IconButton from "@mui/material/IconButton";

import GitHubLogo from '../../assets/images/githubLogo.svg';
import LinkedInLogo from '../../assets/images/linkedinLogo.svg';

import { linkedIn, gitHub } from "../../assets/data/data";

const root = {
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
              <img style={{width: "25px", height: "25px"}} src={GitHubLogo}/>
            </IconButton>
          </Link>
        </Grid>

        <Grid item xs={8}>
          <Link href={linkedIn} target="_blank" underline="hover" rel="noopener" >
            <IconButton>
              <img style={{width: "25px", height: "25px"}} src={LinkedInLogo}/>
            </IconButton>
          </Link>
        </Grid>

        <Grid item xs={8}>
          <ThemeToggle></ThemeToggle>
        </Grid>
      </Grid>
      
    </Container>
  )
}

export default StickyBar