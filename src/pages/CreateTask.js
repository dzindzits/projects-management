import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/task.context";
import { UserContext } from "../contexts/user.context";

function CreateTaskPage() {
  const { id } = useParams();
  const { addTask } = useContext(TaskContext);
  const { users } = useContext(UserContext);
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("unassigned");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addTask(
      taskName,
      description,
      priority,
      dueDate,
      assignee,
      id
    );
    navigate(`/task/${result.id}`);
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label>Assignee:</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="unassigned">Unassigned</option>
            {users.map((user) => (
              <option value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default CreateTaskPage;
