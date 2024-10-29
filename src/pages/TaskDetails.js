import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TaskContext } from "../contexts/task.context";
import User from "../components/User";
import Comments from "../components/Comments";

function TaskDetailsPage() {
  const { id } = useParams();
  const { getTaskById, toggleTaskCompletion } = useContext(TaskContext);

  const task = getTaskById(id);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <Link to={`/project/${task.projectId}`}>Go to Project Details</Link>
      <div>
        <h3>{task.name}</h3>
        <select
          value={task.status}
          onChange={(e) => toggleTaskCompletion(task.id, e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>
        Assignee: <User username={task.assignee} />
      </p>
      <p>
        Reporter: <User username={task.reporter} />
      </p>
      <Comments taskId={task.id} comments={task.comments} />
    </div>
  );
}

export default TaskDetailsPage;
