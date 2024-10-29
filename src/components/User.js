import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

function User({ username }) {
  const { getUserByUsername } = useContext(UserContext);

  const user = getUserByUsername(username);

  return user ? (
    <Link to={`/user/${username}`}>
      {user.firstName} {user.lastName}
    </Link>
  ) : (
    <span>{username}</span>
  );
}

export default React.memo(User);
