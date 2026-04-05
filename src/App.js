import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Topics from "./pages/Topics";
import Lesson from "./pages/Lesson";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

/* ─── Top Navigation Bar ─── */
function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const username = localStorage.getItem("username");

  const syncAuth = useCallback(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncAuth);
    const id = setInterval(syncAuth, 500);
    return () => {
      window.removeEventListener("storage", syncAuth);
      clearInterval(id);
    };
  }, [syncAuth]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="tt-navbar">
      <NavLink to="/" className="tt-brand">
        <svg className="tt-logo-icon" width="32" height="32" viewBox="0 0 200 200">
          {/* Antenna */}
          <line x1="100" y1="42" x2="100" y2="22" stroke="#C4A8D8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="16" r="6" fill="#FFE082" />
          {/* Ears */}
          <circle cx="38" cy="80" r="14" fill="#C4A8D8" />
          <circle cx="38" cy="80" r="7" fill="#FFE082" />
          <circle cx="162" cy="80" r="14" fill="#C4A8D8" />
          <circle cx="162" cy="80" r="7" fill="#FFE082" />
          {/* Face */}
          <circle cx="100" cy="100" r="58" fill="#f5f0fa" stroke="#C4A8D8" strokeWidth="3" />
          {/* Eyes */}
          <ellipse cx="76" cy="90" rx="15" ry="16" fill="#4E2A1A" />
          <ellipse cx="124" cy="90" rx="15" ry="16" fill="#4E2A1A" />
          <circle cx="71" cy="83" r="6" fill="#fff" />
          <circle cx="119" cy="83" r="6" fill="#fff" />
          <circle cx="80" cy="92" r="3" fill="#fff" />
          <circle cx="128" cy="92" r="3" fill="#fff" />
          {/* Cheeks */}
          <circle cx="56" cy="110" r="12" fill="#f8c4c4" opacity="0.45" />
          <circle cx="144" cy="110" r="12" fill="#f8c4c4" opacity="0.45" />
          {/* Smile */}
          <path d="M72 117 Q100 145 128 117" stroke="#4E2A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        TechTales
      </NavLink>

      <div className="tt-nav-links">
        <NavLink to="/" end className={({ isActive }) => `tt-nav-link ${isActive ? "active" : ""}`}>
          {"\uD83C\uDFE0"} Home
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => `tt-nav-link ${isActive ? "active" : ""}`}>
          {"\uD83D\uDCDA"} Courses
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `tt-nav-link ${isActive ? "active" : ""}`}>
          {"\uD83D\uDCCA"} Dashboard
        </NavLink>
        <NavLink to="/play" className={({ isActive }) => `tt-nav-link ${isActive ? "active" : ""}`}>
          {"\uD83C\uDFAE"} Play
        </NavLink>

        {loggedIn ? (
          <button className="tt-nav-auth logout" onClick={handleLogout}>
            {username || "User"} &middot; Logout
          </button>
        ) : (
          <NavLink to="/login" className="tt-nav-auth login-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

/* ─── Animated Page Wrapper ─── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main className="tt-main" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:world" element={<ProtectedRoute><Topics /></ProtectedRoute>} />
        <Route path="/lesson/:world/:topicId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/play" element={<ProtectedRoute><Play /></ProtectedRoute>} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="tt-app">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
