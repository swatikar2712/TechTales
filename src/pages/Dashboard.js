import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { courses } from "../data/courses";

const QUOTES = [
  { text: "The only way to do great work is to love what you learn.", author: "Inspired by Steve Jobs" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" },
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { text: "Mistakes are proof that you are trying.", author: "Jennifer Lim" },
];

const ALL_BADGES = [
  { id: "first-lesson", icon: "🚀", name: "First Lesson", desc: "Complete your first lesson", condition: (m) => m >= 1 },
  { id: "ai-beginner", icon: "🤖", name: "AI Beginner", desc: "Complete 3 lessons", condition: (m) => m >= 3 },
  { id: "quiz-master", icon: "🏆", name: "Quiz Master", desc: "Complete 5 lessons", condition: (m) => m >= 5 },
  { id: "halfway", icon: "⚡", name: "Halfway There", desc: "Reach 50% overall", condition: (m, pct) => pct >= 50 },
  { id: "ml-explorer", icon: "🧠", name: "ML Explorer", desc: "Complete all ML lessons", condition: (m, pct, cp) => cp.find(c => c.name === "Machine Learning")?.progress === 100 },
  { id: "ai-champion", icon: "👑", name: "AI Champion", desc: "Complete all AI lessons", condition: (m, pct, cp) => cp.find(c => c.name === "Artificial Intelligence")?.progress === 100 },
  { id: "superstar", icon: "🌟", name: "Superstar", desc: "Complete everything!", condition: (m, pct) => pct === 100 },
];

const PROGRESS_COLORS = ["green", "blue", "orange", "pink"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [animatedPcts, setAnimatedPcts] = useState({});

  let totalModules = 0;
  let completedModules = 0;

  const courseProgress = courses.map((course, idx) => {
    let completed = 0;
    let nextLesson = null;

    course.modules.forEach((module) => {
      totalModules++;
      const progress = JSON.parse(
        localStorage.getItem(`progress-${course.class}-${module.id}`)
      );
      if (progress?.completed) {
        completed++;
        completedModules++;
      } else if (!nextLesson) {
        nextLesson = { world: course.class, topicId: module.id, title: module.title };
      }
    });

    const percent = Math.round((completed / course.modules.length) * 100);
    return {
      name: course.title,
      classId: course.class,
      progress: percent,
      completed,
      total: course.modules.length,
      color: PROGRESS_COLORS[idx % PROGRESS_COLORS.length],
      nextLesson,
    };
  });

  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const level = Math.floor(completedModules / 2) + 1;
  const xp = completedModules * 50;
  const xpToNext = (level) * 100;

  // streak from localStorage
  const storedStreak = JSON.parse(localStorage.getItem("techtales-streak") || "null");
  const today = new Date().toDateString();
  let streak = storedStreak?.count || 0;
  if (storedStreak?.lastDate !== today && completedModules > 0) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (storedStreak?.lastDate === yesterday) {
      streak = (storedStreak?.count || 0) + 1;
    } else if (!storedStreak?.lastDate) {
      streak = 1;
    }
    localStorage.setItem("techtales-streak", JSON.stringify({ count: streak, lastDate: today }));
  }
  if (streak === 0 && completedModules > 0) streak = 1;

  // badges
  const badges = ALL_BADGES.map((b) => ({
    ...b,
    unlocked: b.condition(completedModules, overallProgress, courseProgress),
  }));
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  // animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const pcts = { overall: overallProgress };
      courseProgress.forEach((c, i) => { pcts[i] = c.progress; });
      setAnimatedPcts(pcts);
    }, 100);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = () => {
    if (window.confirm("Reset all progress? This cannot be undone!")) {
      courses.forEach((course) => {
        course.modules.forEach((m) => {
          localStorage.removeItem(`progress-${course.class}-${m.id}`);
        });
      });
      localStorage.removeItem("techtales-streak");
      window.location.reload();
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-left">
          <h1>👋 Welcome back, Explorer!</h1>
          <p>Keep learning — you're doing amazing!</p>
        </div>
        <div className="level-badge">
          <span className="lvl-num">{level}</span>
          <span className="lvl-label">Level</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{completedModules}/{totalModules}</div>
          <div className="stat-label">Lessons Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{xp}</div>
          <div className="stat-label">XP Earned</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-value">{unlockedCount}/{badges.length}</div>
          <div className="stat-label">Badges</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="overall-section">
        <h3>Overall Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill blue"
            style={{ width: `${animatedPcts.overall || 0}%` }}
          />
        </div>
        <p className="pct-text">{overallProgress}% completed &middot; {xp}/{xpToNext} XP to Level {level + 1}</p>
      </div>

      {/* Streak */}
      <div className="streak-section">
        <div className="streak-fire">🔥</div>
        <div className="streak-info">
          <h4>{streak} Day Streak!</h4>
          <p>Keep it going — come back tomorrow!</p>
        </div>
        <div className="streak-days">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`streak-dot ${i < streak % 7 ? "active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-actions">
        <button className="action-btn primary" onClick={() => navigate("/courses")}>
          📖 Browse Courses
        </button>
        <button className="action-btn secondary" onClick={() => navigate("/play")}>
          🎮 Play Games
        </button>
        <button className="action-btn danger" onClick={handleReset}>
          🗑️ Reset Progress
        </button>
      </div>

      {/* Courses */}
      <h3 className="section-title">📚 Your Courses</h3>
      <div className="courses-grid">
        {courseProgress.map((course, index) => {
          const status = course.progress === 100 ? "completed" : course.progress > 0 ? "in-progress" : "not-started";
          return (
            <div key={index} className="course-card">
              <h4>{course.name}</h4>
              <p className="course-meta">
                {course.completed} of {course.total} lessons
              </p>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${course.color}`}
                  style={{ width: `${animatedPcts[index] || 0}%` }}
                />
              </div>
              <div className="course-pct">{course.progress}%</div>
              <span className={`course-status ${status}`}>
                {status === "completed" ? "✅ Complete" : status === "in-progress" ? "📖 In Progress" : "🆕 Not Started"}
              </span>
              {course.nextLesson && (
                <button
                  className="continue-btn"
                  onClick={() => navigate(`/lesson/${course.nextLesson.world}/${course.nextLesson.topicId}`)}
                >
                  ▶ Continue: {course.nextLesson.title}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <h3 className="section-title">🏆 Badges</h3>
      <div className="badges-grid">
        {badges.map((badge) => (
          <div key={badge.id} className={`badge-card ${badge.unlocked ? "" : "locked"}`}>
            <span className="badge-icon">{badge.icon}</span>
            <div className="badge-info">
              <span className="badge-name">{badge.name}</span>
              <span className="badge-desc">{badge.unlocked ? "Unlocked!" : badge.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="quote-section">
        <p>"{quote.text}"</p>
        <span>— {quote.author}</span>
      </div>
    </div>
  );
};

export default Dashboard;