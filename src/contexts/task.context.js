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
import { CommentContext } from "./comment.context";
import { UserContext } from "./user.context";

export const TaskContext = createContext();

const TASKS_KEY = "tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    () => getFromLocalStorage(TASKS_KEY) || []
  );

  const { currentUser } = useContext(UserContext);

  const { comments } = useContext(CommentContext);

  const mappedTasks = useMemo(() => {
    console.time("mapping-tasks");
    const data = [...tasks].map((task) => ({
      ...task,
      comments: comments.filter((comment) => comment.taskId === task.id),
    }));
    console.timeEnd("mapping-tasks");
    return data;
  }, [tasks, comments]);

  const addTask = (
    name,
    description,
    priority,
    dueDate,
    assignee,
    projectId
  ) => {
    const task = {
      id: Date.now(),
      name,
      description,
      priority,
      dueDate,
      assignee,
      reporter: currentUser?.username,
      status: "To Do",
      projectId: Number(projectId),
    };
    console.log("Add task");
    console.time("task");
    console.time("mapped-task");
    console.time("mapped-project");
    setTasks((prevTasks) => [...prevTasks, task]);
    return task;
  };

  const toggleTaskCompletion = (taskId, status) => {
    // console.debug(`Changing task (${taskId}) status to "${status}"`);
    console.log("Task status change");
    console.time("task");
    console.time("mapped-task");
    console.time("mapped-project");
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const getTaskById = (id) => {
    return mappedTasks.find((task) => task.id === Number(id));
  };

  const getTasksByProjectId = (projectId) => {
    return mappedTasks.filter((task) => task.projectId === Number(projectId));
  };

  const getCurrentUserAssignedTasks = () => {
    return mappedTasks.filter(
      (task) =>
        task.assignee === currentUser?.username && task.status !== "Done"
    );
  };

  const getUserByUsernameAssignedTasks = (username) => {
    return mappedTasks.filter(
      (task) => task.assignee === username && task.status !== "Done"
    );
  };

  const getCurrentUserAssignedTaskCount = () => {
    return mappedTasks.filter(
      (task) =>
        task.assignee === currentUser?.username && task.status !== "Done"
    ).length;
  };

  useLayoutEffect(() => {
    console.timeEnd("task");
    saveToLocalStorage(TASKS_KEY, tasks);
  }, [tasks]);

  useLayoutEffect(() => {
    console.timeEnd("mapped-task");
    console.debug(mappedTasks);
  }, [mappedTasks]);

  window.addTask = addTask;
  window.toggleTaskCompletion = toggleTaskCompletion;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        getTaskById,
        getTasksByProjectId,
        getCurrentUserAssignedTasks,
        getUserByUsernameAssignedTasks,
        getCurrentUserAssignedTaskCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
