import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isPasswordValid = newPassword.length >= 8 && /[^A-Za-z0-9]/.test(newPassword);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isPasswordValid) {
      setError("8 characters necessary along with at least one special character");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      if (response.ok) {
        setSuccess("Password reset successfully! You can now log in.");
        setUsername("");
        setNewPassword("");
        setConfirmPassword("");
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
        <h2>Reset Password</h2>
        <p className="auth-sub">Don't worry, AIVA will help you get back in!</p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleReset} className="auth-form">
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
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <p className={`password-hint ${newPassword && !isPasswordValid ? "invalid" : ""} ${newPassword && isPasswordValid ? "valid" : ""}`}>
              8 characters necessary along with at least one special character
            </p>
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="auth-submit login-btn">
            Reset Password
          </button>
        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
