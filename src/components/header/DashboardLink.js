import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../contexts/task.context";

function DashboardLink() {
  const { getCurrentUserAssignedTaskCount } = useContext(TaskContext);

  return <Link to="/">Dashboard ({getCurrentUserAssignedTaskCount()})</Link>;
}

export default DashboardLink;
