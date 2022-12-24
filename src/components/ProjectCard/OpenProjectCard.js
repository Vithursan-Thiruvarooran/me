import React from 'react'
import { motion } from "framer-motion";

import { useTheme } from "@mui/material";
import { Card, CardContent, CardMedia, Link, useMediaQuery, Typography } from '@mui/material';

import projectImage from '../../assets/images/projectCatanTracker.png';

import TechStack from '../TechStack/TechStack';

const backdrop = {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: "10000"
};

const OpenProjectCard = ({ index, project, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const root = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    margin: "0 auto",
    marginTop: `calc( ${theme.navbarHeight} + 45px )`,
    width: "90%",
    maxWidth: "600px",
    height: "600px",
    maxHeight:"80%",
    zIndex: "10001",
    backgroundColor: theme.palette.background.default,
  };

  return (
    <>
      <Card 
        component={motion.div} 
        raised 
        layout 
        layoutScroll
        layoutId={"card" + index}
        exit={{ opacity: 0 }}
        sx={root}
        onClick={(e) => e.stopPropagation()} 
      >
        <CardMedia
          component="img"
          height={isMobile ? "250": "310"}
          image={projectImage}
          alt={project.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {project.description1}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {project.description2}
          </Typography>
          <TechStack technologies={project.technologies}/>
          {
            project.links.map((link, i) => {
              return (
                <Link key={i} href={link.url} target="_blank" underline="hover" rel="noopener" sx={{paddingRight: 2}} >
                  {link.label}
                </Link>
              )             
            })
          }
        </CardContent>
      </Card>
      <motion.div
        style={backdrop}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        intial="hidden"
        animate="visible"
        exit="hidden"
        onClick={() => onClose()}
      />
    </>
  )
}

export default OpenProjectCard