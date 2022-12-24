import React from "react";
import { Avatar, useTheme, Grid, Typography, Box, useMediaQuery } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";

import Me from "../assets/images/me.jpg";

import { about_description1, about_description2 } from "../assets/data/data";

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
      <SectionContainer id="about" title={"About"} maxWidth="md">
        <Grid container spacing={0} justifyContent="center" alignItems="center" style={{ width: "100%" }}>
          {isMobile && (
            
            <Box mb={8} sx={{ justifyContent: "center"}}>
              <Avatar
                alt="Vithursan Thiruvarooran"
                src={Me}
                sx={{ width: 200, height: 200}}
                variant="circular"
              />
            </Box>
          
          )}
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            style={{ flexDirection: "column", alignItems: "space-around" }}
          >
            <Box ml={4} mr={4} mb={4}>
              <Typography variant="body1" sx={{ mb: 2}}>
                {about_description1}
              </Typography>
              <Typography variant="body1">
                {about_description2}
              </Typography>
            </Box>
            {/* <Skills /> */}
          </Grid>
          {!isMobile && (
            <Grid item xs={12} sm={5} md={4} lg={3} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Avatar
                alt="Vithursan Thiruvarooran"
                src={Me}
                sx={{ width: 200, height: 200, mr: 4 }}
                variant="circular"
              />
            </Grid>
          )}
        </Grid>
      </SectionContainer>
    );
};

export default About;