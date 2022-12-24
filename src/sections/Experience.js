import React from "react";
import PropTypes from 'prop-types';
import { useTheme, Grid, Typography, Box, useMediaQuery, Tab, Tabs } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";
import TechStack from "../components/TechStack/TechStack";

import {experiences} from "../assets/data/data";

function TabPanel(props) {
  const { children, value, index, experience, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom xs={12} variant="h5" color="primary">
                {experience.job}
              </Typography> 
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" >
                {experience.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{paddingBottom: 4}}>
              <Typography variant="caption">
                {experience.duration}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {experience.description1}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {experience.description2}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TechStack technologies={experience.technologies} />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 const tabsStyle = {
    borderBottom: isMobile ? 1 : 0,
    borderRight: isMobile ? 0 : 1,
    borderColor: 'divider',
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <SectionContainer id="experience" title={"Experience"} maxWidth="md">
          <Grid container spacing={0} alignItems="center" style={{ width: "100%" }}>
            <Grid
              item
              xs={12}
              style={{ flexDirection: "column", alignItems: "space-around" }}
            >
              <Box mb={4} >
                <Grid container >
                  <Grid item xs={12} sm={3} justifyContent="center" alignItems="center">
                    {/* <Box mb={4} sx={{width: '200px'}}> */}
                      <Tabs
                        orientation={isMobile ? "horizontal": "vertical"}
                        centered
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="experience-tabs"
                        sx={tabsStyle}
                      >
                        { 
                          experiences.map((expr, i) => {
                            return (
                              <Tab key={"tab_" + i} label={expr.tabName} {...a11yProps(i)} />
                            )
                          })
                        }
                      </Tabs>
                    {/* </Box> */}
                  </Grid>
                  <Grid item xs={12} sm={9} >
                    { 
                      experiences.map((experience, i) => {
                        return (
                        <TabPanel key={"tabPanel_" + i} value={value} index={i} experience={experience}></TabPanel>
                        )
                      })
                    }
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
      </SectionContainer>
  );
};

export default Experience;