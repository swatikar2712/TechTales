import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useState, useEffect } from "react";
import "./Lesson.css";

function Lesson() {
  const { world, topicId } = useParams();
  const course = courses.find(c => c.class === world);
  const module = course?.modules.find(m => m.id === parseInt(topicId));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [language, setLanguage] = useState("english");
  const [progressSaved, setProgressSaved] = useState(false);

  const questions = module?.quiz || [];
  const question = questions[currentQuestion];

  useEffect(() => {
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setSubmitted(false);
    setVideoError(false);
    setLanguage("english");
    setProgressSaved(false);
  }, [topicId]);

  useEffect(() => {
    if (submitted && currentQuestion === questions.length - 1 && !progressSaved && questions.length > 0) {
      localStorage.setItem(
        `progress-${world}-${topicId}`,
        JSON.stringify({ completed: true, score })
      );
      setProgressSaved(true);
    }
  }, [submitted, currentQuestion, questions.length, progressSaved, score, world, topicId]);

  if (!course || !module) {
    return <div className="lesson-not-found">Module not found</div>;
  }

  const handleSubmit = () => {
    if (selected === question.answer) setScore(prev => prev + 1);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelected(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const videoPath = language === "hindi" ? module.videoHindi : module.video;
  const videoSrc = videoPath && videoPath.startsWith("/") ? videoPath : `/${videoPath}`;

  return (
    <div className="lesson-layout">
      {/* Sidebar */}
      <aside className="lesson-sidebar">
        <h3 className="sidebar-title">{course.title}</h3>
        <ul className="sidebar-modules">
          {course.modules.map(mod => (
            <li key={mod.id}>
              <Link
                to={`/lesson/${world}/${mod.id}`}
                className={`sidebar-link ${mod.id === parseInt(topicId) ? "active" : ""}`}
              >
                <span className="sidebar-dot" />
                {mod.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/courses" className="sidebar-back tt-btn tt-btn-ghost">
          &larr; All Courses
        </Link>
      </aside>

      {/* Content */}
      <div className="lesson-content">
        <h1 className="lesson-title">{module.title}</h1>

        {/* Language Toggle */}
        <button
          className="lang-toggle"
          onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
        >
          {language === "english" ? "Switch to Hindi" : "Switch to English"}
        </button>

        {/* Video */}
        {videoSrc && !videoError && (
          <div className="video-wrapper">
            <video key={language} controls autoPlay onError={() => setVideoError(true)}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {videoError && (
          <div className="video-error">
            Video cannot be played. Make sure the file exists in <code>/public/videos</code>.
          </div>
        )}

        {/* Quiz */}
        {questions.length > 0 && currentQuestion < questions.length && (
          <div className="quiz-card">
            <div className="quiz-header">
              <span className="quiz-label">Quiz</span>
              <span className="quiz-progress">{currentQuestion + 1} / {questions.length}</span>
            </div>
            <h3 className="quiz-question">{question.question}</h3>

            <div className="quiz-options">
              {question.options.map((opt, i) => (
                <label
                  key={i}
                  className={`quiz-option ${selected === opt ? "selected" : ""} ${
                    submitted ? (opt === question.answer ? "correct" : opt === selected ? "wrong" : "") : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => !submitted && setSelected(opt)}
                    disabled={submitted}
                  />
                  <span className="option-text">{opt}</span>
                </label>
              ))}
            </div>

            {!submitted && (
              <button className="tt-btn tt-btn-primary quiz-submit" onClick={handleSubmit} disabled={!selected}>
                Submit Answer
              </button>
            )}

            {submitted && (
              <div className={`quiz-feedback ${selected === question.answer ? "correct" : "wrong"}`}>
                {selected === question.answer ? "Correct!" : `Wrong — the answer is: ${question.answer}`}
              </div>
            )}

            {submitted && currentQuestion < questions.length - 1 && (
              <button className="tt-btn tt-btn-accent" onClick={handleNext}>
                Next Question &rarr;
              </button>
            )}

            {submitted && currentQuestion === questions.length - 1 && (
              <div className="quiz-complete">
                Quiz Complete! Your score: <strong>{score}/{questions.length}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson;
