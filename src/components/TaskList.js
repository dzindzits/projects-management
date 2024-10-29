import React from "react";
import Task from "./Task";

function TaskList({ title, tasks }) {
  const filteredTasks = tasks.filter((task) => task.status === title);

  if (!filteredTasks.length) {
    return null;
  }

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <Task key={task.id} task={task} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
