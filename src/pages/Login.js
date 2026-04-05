import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const AivaIcon = () => (
  <svg width="64" height="64" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="60" fill="#ffffff" stroke="#c0c0c0" strokeWidth="3" />
    <circle cx="75" cy="90" r="15" fill="#00bfff" />
    <circle cx="125" cy="90" r="15" fill="#00bfff" />
    <circle cx="70" cy="85" r="5" fill="#ffffff" />
    <circle cx="120" cy="85" r="5" fill="#ffffff" />
    <path d="M75 115 Q100 135 125 115" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2" />
    <ellipse cx="160" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2" />
  </svg>
);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/login`, {
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
        <div className="auth-icon"><AivaIcon /></div>
        <h2>Welcome Back!</h2>
        <p className="auth-sub">AIVA missed you! Let's get back to learning.</p>

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
        <p className="auth-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;