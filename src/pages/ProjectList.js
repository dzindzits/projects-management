import React, { useContext } from "react";
import { ProjectContext } from "../contexts/project.context";
import ProjectList from "../components/ProjectList";

function ProjectListPage() {
  const { projects } = useContext(ProjectContext);
  return <ProjectList title="Project list" projects={projects} />;
}

export default ProjectListPage;
