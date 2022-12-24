import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { motion } from "framer-motion";

const cardStyle = {
  minHeight: 350,
};

const ProjectCard = ({index, project, onClick}) => {
  return (
    <Card 
      component={motion.div} 
      raised 
      layout 
      layoutId={"card" + index}
      exit={{ opacity: 0 }}
      sx={cardStyle}>
      <CardActionArea component={Button} onClick={() => { onClick(index) }} >
        <CardMedia
          component="img"
          height="240"
          image={require(`../../assets/images/${project.image}`)}
          alt={project.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description1}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;