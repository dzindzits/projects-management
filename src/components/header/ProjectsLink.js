import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../contexts/project.context";

function ProjectsLink() {
  const { getProjectCount } = useContext(ProjectContext);

  return <Link to="/projects">Project List ({getProjectCount()})</Link>;
}

export default ProjectsLink;
