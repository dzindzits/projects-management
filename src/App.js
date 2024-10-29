import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateProjectPage from "./pages/CreateProject";
import ProjectDetailsPage from "./pages/ProjectDetails";
import CreateTaskPage from "./pages/CreateTask";
import TaskDetailsPage from "./pages/TaskDetails";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Header from "./components/header";
import { UserContext, UserProvider } from "./contexts/user.context";
import { ProjectProvider } from "./contexts/project.context";
import { TaskProvider } from "./contexts/task.context";
import { CommentProvider } from "./contexts/comment.context";
import UserPage from "./pages/User";
import Dashboard from "./pages/Dashboard";
import ProjectListPage from "./pages/ProjectList";

function App() {
  return (
    <UserProvider>
      <CommentProvider>
        <TaskProvider>
          <ProjectProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <ProjectListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-project"
                  element={
                    <ProtectedRoute>
                      <CreateProjectPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project/:id"
                  element={
                    <ProtectedRoute>
                      <ProjectDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project/:id/create-task"
                  element={
                    <ProtectedRoute>
                      <CreateTaskPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/task/:id"
                  element={
                    <ProtectedRoute>
                      <TaskDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/:id"
                  element={
                    <ProtectedRoute>
                      <UserPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </ProjectProvider>
        </TaskProvider>
      </CommentProvider>
    </UserProvider>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;
