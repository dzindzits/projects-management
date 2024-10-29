import React from "react";
import { Link } from "react-router-dom";

function Project({ project }) {
  return (
    <div>
      <h3>{project.name}</h3>
      <span>Active tasks: {project.activeTasks.length}</span>
      <Link to={`/project/${project.id}`}>View Project</Link>
    </div>
  );
}

export default React.memo(Project);
