import React, {useState} from "react";
import { AnimatePresence } from "framer-motion";
import { Grid } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import OpenProjectCard from "../components/ProjectCard/OpenProjectCard";
import { projects } from "../assets/data/data";

const Projects = () => {

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SectionContainer id="projects" title={"Projects"} maxWidth="md">
      <Grid 
        container
        alignItems="center"
        spacing={4} 
        justifyContent="center"
      >
        { 
          projects.map((project, i) => {
            return (
              <Grid key={i} item xs={12} sm={8} md={5}>
                <ProjectCard key={i} index={i} project={project} onClick={setSelectedProject}></ProjectCard>
              </Grid>
            )
          })
        }
      </Grid>

      <AnimatePresence mode="wait">
        { selectedProject !== null ? (<OpenProjectCard key={selectedProject} index={selectedProject} project={projects[selectedProject]} onClose={() => setSelectedProject(null)}></OpenProjectCard>) : null}
      </AnimatePresence>
    </SectionContainer>
  );
};

export default Projects;