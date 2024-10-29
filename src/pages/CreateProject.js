import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../contexts/project.context";

function CreateProjectPage() {
  const [projectName, setProjectName] = useState("");
  const { addProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  const createProject = () => {
    if (projectName.trim()) {
      const result = addProject(projectName);
      navigate(`/project/${result.id}`);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <input
        type="text"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={createProject}>Create Project</button>
    </div>
  );
}

export default CreateProjectPage;
