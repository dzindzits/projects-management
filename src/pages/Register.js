import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    const result = registerUser(username, firstName, lastName, password);
    if (result.success) {
      setMessage("User registered successfully");
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <section>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <Link to="/login">Login</Link>
    </section>
  );
}

export default RegisterPage;
