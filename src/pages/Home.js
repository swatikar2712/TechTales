import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import "./Home.css";

/* Hero Robot SVG */
const Robot = () => (
  <svg width="150" height="150" viewBox="0 0 200 200">
    {/* Antenna with bobbing heart */}
    <line x1="100" y1="42" x2="100" y2="18" stroke="#C4A8D8" strokeWidth="3" strokeLinecap="round" />
    <path d="M94 16 a5 5 0 0 1 6-4 a5 5 0 0 1 6 4 c0 5-6 9-6 9 s-6-4-6-9z" fill="#FFE082">
      <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="1.2s" repeatCount="indefinite" additive="sum" />
    </path>
    {/* Ears */}
    <circle cx="38" cy="80" r="14" fill="#C4A8D8" />
    <circle cx="38" cy="80" r="7" fill="#FFE082" />
    <circle cx="162" cy="80" r="14" fill="#C4A8D8" />
    <circle cx="162" cy="80" r="7" fill="#FFE082" />
    {/* Face */}
    <circle cx="100" cy="100" r="58" fill="#f5f0fa" stroke="#C4A8D8" strokeWidth="3" />
    {/* Eyes — big, sparkly, cute */}
    <ellipse cx="76" cy="90" rx="15" ry="16" fill="#4E2A1A" />
    <ellipse cx="124" cy="90" rx="15" ry="16" fill="#4E2A1A" />
    <circle cx="71" cy="83" r="6" fill="#ffffff" />
    <circle cx="119" cy="83" r="6" fill="#ffffff" />
    <circle cx="80" cy="92" r="3" fill="#ffffff" />
    <circle cx="128" cy="92" r="3" fill="#ffffff" />
    {/* Rosy cheeks */}
    <circle cx="56" cy="110" r="12" fill="#f8c4c4" opacity="0.45" />
    <circle cx="144" cy="110" r="12" fill="#f8c4c4" opacity="0.45" />
    {/* Big happy smile */}
    <path d="M72 117 Q100 145 128 117" stroke="#4E2A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Arms — animated waving */}
    <ellipse cx="40" cy="128" rx="10" ry="20" fill="#f5f0fa" stroke="#C4A8D8" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" values="-15 40 128;15 40 128;-15 40 128" dur="1s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="160" cy="128" rx="10" ry="20" fill="#f5f0fa" stroke="#C4A8D8" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" values="15 160 128;-15 160 128;15 160 128" dur="1s" repeatCount="indefinite"/>
    </ellipse>
    {/* Gentle bob */}
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.5s" repeatCount="indefinite" additive="sum"/>
  </svg>
);

/* World Icons */
const AIWorld = () => (
  <svg width="80" height="80" viewBox="0 0 120 120">
    <rect x="25" y="30" width="70" height="60" rx="16" fill="#FFE082" stroke="#333" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="30" stroke="#333" strokeWidth="3" />
    <circle cx="60" cy="18" r="5" fill="#C4A8D8" />
    <circle cx="45" cy="55" r="10" fill="#fff" />
    <circle cx="75" cy="55" r="10" fill="#fff" />
    <circle cx="45" cy="55" r="4" fill="#333" />
    <circle cx="75" cy="55" r="4" fill="#333" />
    <path d="M45 75 Q60 85 75 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const MLWorld = () => (
  <svg width="80" height="80" viewBox="0 0 120 120">
    <g stroke="#555" strokeWidth="2">
      <line x1="25" y1="30" x2="60" y2="25" /><line x1="25" y1="30" x2="60" y2="60" /><line x1="25" y1="30" x2="60" y2="95" />
      <line x1="25" y1="60" x2="60" y2="25" /><line x1="25" y1="60" x2="60" y2="60" /><line x1="25" y1="60" x2="60" y2="95" />
      <line x1="25" y1="90" x2="60" y2="25" /><line x1="25" y1="90" x2="60" y2="60" /><line x1="25" y1="90" x2="60" y2="95" />
      <line x1="60" y1="25" x2="95" y2="45" /><line x1="60" y1="60" x2="95" y2="45" /><line x1="60" y1="95" x2="95" y2="45" />
    </g>
    <circle cx="25" cy="30" r="8" fill="#FFE082" /><circle cx="25" cy="60" r="8" fill="#FFE082" /><circle cx="25" cy="90" r="8" fill="#FFE082" />
    <circle cx="60" cy="25" r="8" fill="#C4A8D8" /><circle cx="60" cy="60" r="8" fill="#C4A8D8" /><circle cx="60" cy="95" r="8" fill="#C4A8D8" />
    <circle cx="95" cy="45" r="10" fill="#8E6FBF" />
  </svg>
);

const RoboticsWorld = () => (
  <svg width="80" height="80" viewBox="0 0 120 120">
    <rect x="45" y="30" width="30" height="50" rx="6" fill="#8E6FBF" />
    <circle cx="60" cy="40" r="6" fill="#fff"/>
    <circle cx="60" cy="60" r="6" fill="#fff"/>
    <rect x="30" y="50" width="10" height="30" rx="4" fill="#C4A8D8"/>
    <rect x="80" y="50" width="10" height="30" rx="4" fill="#C4A8D8"/>
    <line x1="60" y1="80" x2="60" y2="100" stroke="#333" strokeWidth="2"/>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const storyLines = [
    "Hi! I'm AIVA, your tech guide \uD83E\uDD16",
    "I teach technology through stories",
    "Let's explore AI, ML & Robotics!",
  ];
  const [line, setLine] = useState(0);
  const topicsRef = useRef(null);

  const storyLinesLength = storyLines.length;
  useEffect(() => {
    const timer = setInterval(() => {
      setLine((l) => (l + 1) % storyLinesLength);
    }, 3500);
    return () => clearInterval(timer);
  }, [storyLinesLength]);

  const topics = [
    { name: "AI World", desc: "Machines that can think and help", image: <AIWorld />, accent: "#FFE082", route: "ai" },
    { name: "ML World", desc: "Machines that learn from examples", image: <MLWorld />, accent: "#C4A8D8", route: "ml" },
    { name: "Robotics", desc: "Machines that can move and work", image: <RoboticsWorld />, accent: "#E5B84C", route: "robotics" },
  ];

  const scrollToTopics = () => topicsRef.current?.scrollIntoView({ behavior: "smooth" });

  /* Scroll-reveal observer */
  const revealCallback = useCallback((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(revealCallback, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [revealCallback]);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-deco hero-deco-1">&#10022;</div>
        <div className="hero-deco hero-deco-2">&#10022;</div>
        <div className="hero-deco hero-deco-3">&#9679;</div>
        <div className="hero-inner">
          <div className="hero-robot"><Robot /></div>
          <h1 className="hero-title">{storyLines[line]}</h1>
          <p className="hero-sub">Learn AI &amp; Machine Learning through fun stories, videos and games.</p>
          <button className="tt-btn tt-btn-accent hero-cta" onClick={scrollToTopics}>
            Explore Topics
          </button>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100Z" fill="#F4F2FF"/>
          </svg>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section reveal">
        <h2>How TechTales Works</h2>
        <div className="how-timeline">
          <div className="how-step"><span className="step-icon">🌍</span><h3>Pick a World</h3><p>Choose AI, ML or Robotics</p></div>
          <div className="how-step"><span className="step-icon">🎥</span><h3>Watch &amp; Learn</h3><p>Video lessons in English &amp; Hindi</p></div>
          <div className="how-step"><span className="step-icon">✅</span><h3>Take Quizzes</h3><p>Test what you learned</p></div>
          <div className="how-step"><span className="step-icon">🎮</span><h3>Play Games</h3><p>Reinforce with interactive games</p></div>
        </div>
      </section>

      {/* Worlds */}
      <section className="worlds-section reveal" ref={topicsRef}>
        <h2>Choose a World to Explore</h2>
        <div className="worlds-grid">
          {topics.map((t, i) => (
            <div key={i} className="world-card" onClick={() => navigate(`/courses/${t.route}`)}>
              <div className="world-icon" style={{ background: t.accent + "18" }}>{t.image}</div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <span className="world-arrow" style={{ color: t.accent }}>{"Explore \u2192"}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access-section reveal">
        <h2>Jump Right In</h2>
        <div className="quick-access-grid">
          <div className="quick-card" onClick={() => navigate("/dashboard")}>
            <span className="quick-icon">📊</span>
            <h3>Dashboard</h3>
            <p>Track your progress</p>
          </div>
          <div className="quick-card" onClick={() => navigate("/play")}>
            <span className="quick-icon">🎮</span>
            <h3>Play</h3>
            <p>Learn through games</p>
          </div>
          <div className="quick-card" onClick={() => navigate("/voice-quiz")}>
            <span className="quick-icon">🎤</span>
            <h3>Test Your Knowledge</h3>
            <p>Answer questions with your voice!</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section reveal">
        <h2>Learning by the Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Video Lessons</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Tech Worlds</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Interactive Games</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div><strong>TechTales</strong> &mdash; Making technology fun for young minds.</div>
        <div className="footer-tag">Built with curiosity &amp; code</div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Home;
