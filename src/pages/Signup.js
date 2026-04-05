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

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isPasswordValid = password.length >= 8 && /[^A-Za-z0-9]/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("8 characters necessary along with at least one special character");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong!");
      }
    } catch {
      setError("Cannot reach the server. Is it running?");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon"><AivaIcon /></div>
        <h2>Join TechTales</h2>
        <p className="auth-sub">AIVA can't wait to meet you!</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="auth-field">
            <label>Pick a Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a cool name"
              required
            />
          </div>
          <div className="auth-field">
            <label>Choose a Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Make it secret!"
              required
            />
            <p className={`password-hint ${password && !isPasswordValid ? "invalid" : ""} ${password && isPasswordValid ? "valid" : ""}`}>
              8 characters necessary along with at least one special character
            </p>
          </div>
          <button type="submit" className="auth-submit signup-btn">
            Create My Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;