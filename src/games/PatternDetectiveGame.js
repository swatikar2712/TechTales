import { useState, useMemo, useCallback } from "react";
import "./GameStyles.css";

/* ── Levels: each has a sequence + choices ── */
function buildLevels() {
  return [
    {
      title: "Warm-up: Number sequence",
      sequence: [2, 4, 6, 8, "?"],
      options: [9, 10, 12],
      answer: 10,
      explanation: "The pattern adds 2 each time. AI finds patterns like this in data!",
    },
    {
      title: "Shape pattern",
      sequence: ["🔴", "🔵", "🔴", "🔵", "?"],
      options: ["🔴", "🟢", "🔵"],
      answer: "🔴",
      explanation: "It alternates red-blue. AI uses pattern recognition to classify images!",
    },
    {
      title: "Growing sequence",
      sequence: [1, 1, 2, 3, 5, "?"],
      options: [7, 8, 6],
      answer: 8,
      explanation: "Fibonacci! Each number is the sum of the two before it. AI uses similar math sequences.",
    },
    {
      title: "Emoji logic",
      sequence: ["🌙", "⭐", "🌙", "⭐", "⭐", "🌙", "⭐", "⭐", "⭐", "?"],
      options: ["🌙", "⭐", "🌞"],
      answer: "🌙",
      explanation: "The stars increase by one after each moon. Pattern detection is core to Machine Learning!",
    },
    {
      title: "Multiplication pattern",
      sequence: [3, 9, 27, 81, "?"],
      options: [162, 243, 100],
      answer: 243,
      explanation: "Each number is multiplied by 3. Neural networks multiply inputs by weights the same way!",
    },
    {
      title: "Mirror pattern",
      sequence: ["🟥", "🟦", "🟩", "🟦", "?"],
      options: ["🟩", "🟥", "🟦"],
      answer: "🟥",
      explanation: "It's a palindrome — mirrors back! AI uses symmetry detection in image processing.",
    },
    {
      title: "Two-rule pattern",
      sequence: [1, 3, 2, 4, 3, 5, 4, "?"],
      options: [5, 6, 3],
      answer: 6,
      explanation: "Alternates +2 and -1. Complex patterns need deeper neural networks to learn!",
    },
  ];
}

export default function PatternDetectiveGame() {
  const levels = useMemo(buildLevels, []);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState(null);

  const current = levels[level];

  const handlePick = useCallback((option) => {
    if (feedback) return;             // prevent double-click
    setSelected(option);
    const correct = option === current.answer;

    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setFeedback({
      correct,
      text: correct ? "Correct! 🎉" : `Not quite — the answer was ${current.answer}`,
      explanation: current.explanation,
    });
  }, [feedback, current]);

  const next = () => {
    setFeedback(null);
    setSelected(null);
    if (level + 1 < levels.length) {
      setLevel((l) => l + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setLevel(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setSelected(null);
    setDone(false);
  };

  const stars = score === levels.length ? 3 : score >= levels.length * 0.7 ? 2 : score >= levels.length * 0.4 ? 1 : 0;

  /* ─────────── RENDER ─────────── */
  return (
    <div className="game-shell pattern-detective">
      <h2 className="game-heading">🔍 AI&nbsp;Pattern&nbsp;Detective</h2>
      <p className="game-subtitle">
        {done
          ? "Investigation complete!"
          : "Spot the pattern — just like an AI would!"}
      </p>

      {/* Progress */}
      {!done && (
        <div className="pd-progress-wrap">
          <div className="pd-progress-bar">
            <div
              className="pd-progress-fill"
              style={{ width: `${((level) / levels.length) * 100}%` }}
            />
          </div>
          <span className="pd-progress-text">
            Level {level + 1}/{levels.length} &nbsp;·&nbsp; Score {score} &nbsp;
            {streak >= 2 && <span className="pd-streak">🔥 {streak} streak!</span>}
          </span>
        </div>
      )}

      {/* ── Playing ── */}
      {!done && (
        <div className="pd-level">
          <h3 className="pd-level-title">{current.title}</h3>

          <div className="pd-sequence">
            {current.sequence.map((item, i) => (
              <span
                key={i}
                className={`pd-seq-item ${item === "?" ? "mystery" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="pd-options">
            {current.options.map((opt, i) => (
              <button
                key={i}
                className={`tt-btn game-btn pd-option
                  ${selected === opt && feedback?.correct ? "correct" : ""}
                  ${selected === opt && feedback && !feedback.correct ? "wrong" : ""}
                  ${feedback && opt === current.answer && selected !== opt ? "reveal" : ""}
                `}
                onClick={() => handlePick(opt)}
                disabled={!!feedback}
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`pd-feedback ${feedback.correct ? "correct" : "wrong"}`}>
              <strong>{feedback.text}</strong>
              <p className="pd-explanation">{feedback.explanation}</p>
              <button className="tt-btn game-btn primary small" onClick={next}>
                {level + 1 < levels.length ? "Next Level →" : "See Results →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Results ── */}
      {done && (
        <div className="results-area">
          <div className="results-stars">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="results-score">
            <div className="results-big">{score}/{levels.length}</div>
            <div className="results-caption">patterns detected</div>
          </div>
          <p className="results-insight">
            {stars === 3
              ? "🏆 Perfect detective work! You think like a trained neural network!"
              : stars >= 2
              ? "🌟 Great job! You spotted most patterns — your inner AI is strong!"
              : score > 0
              ? "👍 Nice start! Like AI, you get better with more practice and data!"
              : "🔄 Patterns are tricky! Even AI needs lots of examples to learn. Try again!"}
          </p>
          <button className="tt-btn game-btn" onClick={restart}>Play Again</button>
        </div>
      )}
    </div>
  );
}
