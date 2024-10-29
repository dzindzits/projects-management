import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { TaskContext } from "../contexts/task.context";

function UserPage() {
  const { id } = useParams();
  const { getUserByUsername } = useContext(UserContext);
  const { getUserByUsernameAssignedTasks } = useContext(TaskContext);

  const user = getUserByUsername(id);
  const userTasks = getUserByUsernameAssignedTasks(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <span>{user.username}</span>
      <p>Assigned active tasks: {userTasks.length}</p>
    </section>
  );
}

export default UserPage;
