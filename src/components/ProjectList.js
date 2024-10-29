import React from "react";
import Project from "./Project";

function ProjectList({ title, projects }) {
  return (
    <section>
      <h2>{title}</h2>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </section>
  );
}

export default ProjectList;
