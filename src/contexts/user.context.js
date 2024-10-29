import React, { createContext, useState, useLayoutEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "../services/localStorage.service";

export const UserContext = createContext();

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    () => getFromLocalStorage(USERS_KEY) || []
  );
  const [currentUser, setCurrentUser] = useState(() =>
    getFromLocalStorage(CURRENT_USER_KEY)
  );

  const loginUser = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      console.log("Login user");
      console.time("currentUser");
      setCurrentUser(user);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const registerUser = (username, firstName, lastName, password) => {
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const user = { username, firstName, lastName, password };
    console.log("Register user");
    console.time("user");
    setUsers((prevUsers) => [...prevUsers, user]);
    console.time("currentUser");
    setCurrentUser(user);
    return { success: true, message: "User registered successfully" };
  };

  const logoutUser = () => {
    console.log("Logout user");
    console.time("currentUser");
    setCurrentUser(null);
  };

  const getUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };

  useLayoutEffect(() => {
    console.timeEnd("user");
    saveToLocalStorage(USERS_KEY, users);
  }, [users]);

  useLayoutEffect(() => {
    console.timeEnd("currentUser");
    if (!currentUser) {
      removeFromLocalStorage(CURRENT_USER_KEY);
      return;
    }
    saveToLocalStorage(CURRENT_USER_KEY, currentUser);
  }, [currentUser]);

  window.loginUser = loginUser;
  window.registerUser = registerUser;
  window.logoutUser = logoutUser;

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loginUser,
        logoutUser,
        registerUser,
        getUserByUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
