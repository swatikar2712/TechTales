import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import "./Home.css";

/* Hero Robot SVG */
const Robot = () => (
  <svg width="180" height="180" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="60" fill="#ffffff" stroke="#c0c0c0" strokeWidth="3" />
    <circle cx="75" cy="90" r="15" fill="#00bfff" />
    <circle cx="125" cy="90" r="15" fill="#00bfff" />
    <circle cx="70" cy="85" r="5" fill="#ffffff" />
    <circle cx="120" cy="85" r="5" fill="#ffffff" />
    <path d="M75 115 Q100 135 125 115" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" values="-15 40 120;15 40 120;-15 40 120" dur="1s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="160" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" values="15 160 120;-15 160 120;15 160 120" dur="1s" repeatCount="indefinite"/>
    </ellipse>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.5s" repeatCount="indefinite" additive="sum"/>
  </svg>
);

/* World Icons */
const AIWorld = () => (
  <svg width="80" height="80" viewBox="0 0 120 120">
    <rect x="25" y="30" width="70" height="60" rx="16" fill="#ffd54f" stroke="#333" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="30" stroke="#333" strokeWidth="3" />
    <circle cx="60" cy="18" r="5" fill="#ff6b6b" />
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
    <circle cx="25" cy="30" r="8" fill="#4cc9f0" /><circle cx="25" cy="60" r="8" fill="#4cc9f0" /><circle cx="25" cy="90" r="8" fill="#4cc9f0" />
    <circle cx="60" cy="25" r="8" fill="#f72585" /><circle cx="60" cy="60" r="8" fill="#f72585" /><circle cx="60" cy="95" r="8" fill="#f72585" />
    <circle cx="95" cy="45" r="10" fill="#43aa8b" />
  </svg>
);

const RoboticsWorld = () => (
  <svg width="80" height="80" viewBox="0 0 120 120">
    <rect x="45" y="30" width="30" height="50" rx="6" fill="#4caf50" />
    <circle cx="60" cy="40" r="6" fill="#fff"/>
    <circle cx="60" cy="60" r="6" fill="#fff"/>
    <rect x="30" y="50" width="10" height="30" rx="4" fill="#388e3c"/>
    <rect x="80" y="50" width="10" height="30" rx="4" fill="#388e3c"/>
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
    { name: "AI World", desc: "Machines that can think and help", image: <AIWorld />, accent: "#667eea", route: "ai" },
    { name: "ML World", desc: "Machines that learn from examples", image: <MLWorld />, accent: "#f72585", route: "ml" },
    { name: "Robotics", desc: "Machines that can move and work", image: <RoboticsWorld />, accent: "#43aa8b", route: "robotics" },
  ];

  const scrollToTopics = () => topicsRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
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
            <path d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100Z" fill="#f7f8fc"/>
          </svg>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2>How TechTales Works</h2>
        <div className="how-steps">
          <div className="how-step"><span className="step-num">1</span><h3>Pick a World</h3><p>Choose AI, ML or Robotics</p></div>
          <div className="how-step"><span className="step-num">2</span><h3>Watch &amp; Learn</h3><p>Video lessons in English &amp; Hindi</p></div>
          <div className="how-step"><span className="step-num">3</span><h3>Take Quizzes</h3><p>Test what you learned</p></div>
          <div className="how-step"><span className="step-num">4</span><h3>Play Games</h3><p>Reinforce with interactive games</p></div>
        </div>
      </section>

      {/* Worlds */}
      <section className="worlds-section" ref={topicsRef}>
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

      <Chatbot />
    </div>
  );
};

export default Home;
