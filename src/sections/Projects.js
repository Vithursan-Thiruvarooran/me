import React from "react";
import { Box } from "@mui/material";
import SectionContainer from "../containers/SectionContainer";
import ProjectCase from "../components/ProjectCase/ProjectCase";
import { projects } from "../assets/data/data";

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

// Small centred break between projects: two short sage lines around a hexagon outline.
// Kept short and centred so it reads differently from the full-width, titled section dividers.
const ProjectBreak = () => (
  <Box aria-hidden="true" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, my: "clamp(40px, 6vw, 64px)" }}>
    <Box sx={{ width: "clamp(40px, 8vw, 72px)", height: "1px", bgcolor: "primary.main", opacity: 0.45 }} />
    <Box sx={{ width: 14, height: 16, clipPath: HEX, bgcolor: "primary.main", p: "2px", opacity: 0.8 }}>
      <Box sx={{ width: "100%", height: "100%", clipPath: HEX, bgcolor: "background.default" }} />
    </Box>
    <Box sx={{ width: "clamp(40px, 8vw, 72px)", height: "1px", bgcolor: "primary.main", opacity: 0.45 }} />
  </Box>
);

const Projects = () => {
  return (
    <SectionContainer id="projects" title={"Projects"}>
      {projects.map((project, i) => (
        <React.Fragment key={project.title}>
          {i > 0 && <ProjectBreak />}
          <ProjectCase id={`project-${i}`} project={project} flip={i % 2 === 1} />
        </React.Fragment>
      ))}
    </SectionContainer>
  );
};

export default Projects;
