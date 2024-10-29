import React, {
  createContext,
  useState,
  useLayoutEffect,
  useContext,
  useMemo,
} from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage.service";
import { TaskContext } from "./task.context";
import { UserContext } from "./user.context";

export const ProjectContext = createContext();

const PROJECTS_KEY = "projects";

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(
    () => getFromLocalStorage(PROJECTS_KEY) || []
  );

  const { tasks } = useContext(TaskContext);

  const { currentUser } = useContext(UserContext);

  const mappedProjects = useMemo(() => {
    console.time("mapping-projects");
    const data = [...projects].map((project) => ({
      ...project,
      activeTasks: tasks.filter(
        (task) => task.projectId === project.id && task.status !== "Done"
      ),
    }));
    console.timeEnd("mapping-projects");
    return data;
  }, [projects, tasks]);

  const getProjectById = (id) => {
    return mappedProjects.find((project) => project.id === Number(id));
  };

  const getProjectCount = () => {
    return projects.length;
  };

  const getCurrentUserProjects = () => {
    return mappedProjects.filter((project) =>
      project.activeTasks.some(
        (task) => task.assignee === currentUser?.username
      )
    );
  };

  const addProject = (name) => {
    const project = {
      id: Date.now(),
      name,
    };
    console.log("Add project");
    console.time("project");
    console.time("mapped-project");
    setProjects((prevProjects) => [...prevProjects, project]);
    return project;
  };

  useLayoutEffect(() => {
    console.timeEnd("project");
    saveToLocalStorage(PROJECTS_KEY, projects);
  }, [projects]);

  useLayoutEffect(() => {
    console.timeEnd("mapped-project");
    console.debug(mappedProjects);
  }, [mappedProjects]);

  window.addProject = addProject;

  return (
    <ProjectContext.Provider
      value={{
        projects: mappedProjects,
        getProjectById,
        getProjectCount,
        getCurrentUserProjects,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
