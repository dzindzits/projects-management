import React from "react";
import { Link } from "react-router-dom";
import Priority from "./Priority";

function Task({ task }) {
  //   console.debug(`Task item re-rendering (${task.name})`);
  return (
    <>
      <Link to={`/task/${task.id}`}>
        <Priority priority={task.priority} />{" "}
        <span>
          {task.name}
          {task?.comments?.length > 0 && ` (${task?.comments?.length})`}
        </span>
      </Link>
    </>
  );
}

export default React.memo(Task);
