import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import User from "../User";
import DashboardLink from "./DashboardLink";
import ProjectsLink from "./ProjectsLink";

function Header() {
  const { currentUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logoutUser();
    goToPage("/login");
  };

  window.goToPage = goToPage;

  return (
    <header>
      <nav>
        <DashboardLink />
        <span> | </span>
        <ProjectsLink />
        <span> | </span>
        <Link to="/create-project">Create Project</Link>
        <br></br>
        {currentUser ? (
          <>
            <span>
              Welcome, <User username={currentUser?.username} />
            </span>
            <span> | </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
