import React, { useContext } from "react";
import { ProjectContext } from "../contexts/project.context";
import { TaskContext } from "../contexts/task.context";
import TaskList from "../components/TaskList";
import ProjectList from "../components/ProjectList";

function Dashboard() {
  const { getCurrentUserProjects } = useContext(ProjectContext);
  const { getCurrentUserAssignedTasks } = useContext(TaskContext);

  const userTasks = getCurrentUserAssignedTasks();

  return (
    <>
      <ProjectList
        title="Latest projects"
        projects={getCurrentUserProjects()}
      />
      <section>
        <h2>Your work</h2>
        <TaskList title="In Progress" tasks={userTasks} />
        <TaskList title="To Do" tasks={userTasks} />
      </section>
    </>
  );
}

export default Dashboard;
