import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectContext } from "../contexts/project.context";
import { TaskContext } from "../contexts/task.context";
import TaskList from "../components/TaskList";

function ProjectDetailsPage() {
  const { id } = useParams();
  const { getProjectById } = useContext(ProjectContext);
  const { getTasksByProjectId } = useContext(TaskContext);
  const project = getProjectById(id);
  const tasks = getTasksByProjectId(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <section>
      <h2>{project.name}</h2>
      <p>Active tasks: {project.activeTasks.length}</p>
      <Link to={`/project/${project.id}/create-task`}>Add Task</Link>
      <TaskList title="In Progress" tasks={tasks} />
      <TaskList title="To Do" tasks={tasks} />
      <TaskList title="Done" tasks={tasks} />
    </section>
  );
}

export default ProjectDetailsPage;
