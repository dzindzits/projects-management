import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage.service";
import { UserContext } from "./user.context";

export const CommentContext = createContext();

const COMMENTS_KEY = "comments";

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState(
    () => getFromLocalStorage(COMMENTS_KEY) || []
  );

  const { currentUser } = useContext(UserContext);

  const addComment = (taskId, text) => {
    const comment = {
      id: Date.now(),
      taskId,
      text,
      user: currentUser?.username,
      date: new Date().toISOString(),
    };
    console.log("Add comment");
    console.time("comment");
    console.time("mapped-task");
    setComments((prevComments) => [...prevComments, comment]);
  };

  useLayoutEffect(() => {
    console.timeEnd("comment");
    saveToLocalStorage(COMMENTS_KEY, comments);
  }, [comments]);

  window.addComment = addComment;

  return (
    <CommentContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};
