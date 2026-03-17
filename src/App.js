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
        <span className="tt-logo-icon">{"\uD83C\uDF1F"}</span> TechTales
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
