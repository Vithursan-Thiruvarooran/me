import React from 'react'
import { motion } from "framer-motion";

import { useTheme } from "@mui/material";
import { Card, CardContent, CardMedia, Link, useMediaQuery, Typography } from '@mui/material';

import TechStack from '../TechStack/TechStack';

const OpenProjectCard = ({ index, project, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        paddingTop: `calc(${theme.navbarHeight} + 20px)`,
      }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <Card
        component={motion.div}
        raised
        layout
        layoutId={"card" + index}
        exit={{ opacity: 0 }}
        sx={{
          width: "100%",
          maxWidth: "600px",
          maxHeight: "100%",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardMedia
          component="img"
          height={isMobile ? "250" : "310"}
          image={require(`../../assets/images/${project.image}`)}
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
          <TechStack technologies={project.technologies} />
          {project.links.map((link, i) => (
            <Link key={i} href={link.url} target="_blank" underline="hover" rel="noopener" sx={{ paddingRight: 2, color: "#fff" }}>
              {link.label}
            </Link>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default OpenProjectCard
