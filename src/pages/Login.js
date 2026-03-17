import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.user);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error || "Oops! Check your name or password.");
      }
    } catch {
      setError("Cannot reach the server. Is it running?");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">{"\uD83D\uDD11"}</div>
        <h2>Welcome Back!</h2>
        <p className="auth-sub">Enter the World of TechTales</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secret password"
              required
            />
          </div>
          <button type="submit" className="auth-submit login-btn">
            {"Let\u2019s Go!"}
          </button>
        </form>

        <p className="auth-footer">
          {"Don\u2019t have an account? "}<Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;