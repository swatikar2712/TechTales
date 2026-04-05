import { useState, useCallback, useEffect, useRef } from "react";
import "./GameStyles.css";

/* ── Data items the student labels to "train" a classifier ── */
/* 3 categories with tricky / ambiguous items */
const DATA_POOL = [
  { id: 1,  emoji: "🐶", label: "animal",  hint: "A loyal pet" },
  { id: 2,  emoji: "🚗", label: "vehicle", hint: "Has four wheels" },
  { id: 3,  emoji: "🤖", label: "tech",    hint: "Made of metal and code" },
  { id: 4,  emoji: "🦇", label: "animal",  hint: "Flies but isn't a bird" },
  { id: 5,  emoji: "🛸", label: "vehicle", hint: "Unidentified flying object" },
  { id: 6,  emoji: "💻", label: "tech",    hint: "You code on this" },
  { id: 7,  emoji: "🐙", label: "animal",  hint: "Has eight arms" },
  { id: 8,  emoji: "🚀", label: "vehicle", hint: "Escapes Earth's gravity" },
  { id: 9,  emoji: "📡", label: "tech",    hint: "Sends signals through space" },
  { id: 10, emoji: "🦑", label: "animal",  hint: "Deep-sea creature with tentacles" },
  { id: 11, emoji: "🚁", label: "vehicle", hint: "Rotary wings keep it airborne" },
  { id: 12, emoji: "🕹️", label: "tech",    hint: "Controls a game character" },
  { id: 13, emoji: "🐾", label: "animal",  hint: "Left behind by a walking creature" },
  { id: 14, emoji: "⛵", label: "vehicle",  hint: "Wind pushes it across water" },
  { id: 15, emoji: "🔬", label: "tech",    hint: "Makes tiny things visible" },
  { id: 16, emoji: "🦠", label: "animal",  hint: "Alive but microscopic" },
  { id: 17, emoji: "🛰️", label: "vehicle", hint: "Orbits the planet" },
  { id: 18, emoji: "🧬", label: "tech",    hint: "DNA technology" },
];

/* Test items — some are deliberately tricky edge cases */
const TEST_ITEMS = [
  { emoji: "🐍", correct: "animal",  name: "Snake" },
  { emoji: "🏎️", correct: "vehicle", name: "Race car" },
  { emoji: "⌨️", correct: "tech",    name: "Keyboard" },
  { emoji: "🦎", correct: "animal",  name: "Lizard" },
  { emoji: "🚂", correct: "vehicle", name: "Locomotive" },
  { emoji: "📱", correct: "tech",    name: "Smartphone" },
  { emoji: "🦐", correct: "animal",  name: "Shrimp" },
  { emoji: "🚲", correct: "vehicle", name: "Bicycle" },
  { emoji: "🔭", correct: "tech",    name: "Telescope" },
];

const CATEGORIES = ["animal", "vehicle", "tech"];
const CATEGORY_LABELS = { animal: "🐾 Animal", vehicle: "🚗 Vehicle", tech: "🔧 Tech" };

const TIME_PER_ITEM = 6; // seconds to decide

export default function TrainModelGame() {
  const [phase, setPhase] = useState("train");        // train → test → results
  const [current, setCurrent] = useState(0);
  const [correctLabels, setCorrectLabels] = useState(0);
  const [totalLabeled, setTotalLabeled] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [testIdx, setTestIdx] = useState(0);
  const [modelScore, setModelScore] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(TIME_PER_ITEM);
  const timerRef = useRef(null);

  const accuracy = totalLabeled === 0 ? 0 : Math.round((correctLabels / totalLabeled) * 100);
  const item = DATA_POOL[current];

  /* ── Countdown timer ── */
  useEffect(() => {
    if (phase !== "train" || feedback) return;
    setTimer(TIME_PER_ITEM);
    setShowHint(false);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          // Time's up — count as wrong
          setTotalLabeled((n) => n + 1);
          setFeedback({ correct: false, text: `Time's up! That was "${item.label}".` });
          setTimeout(() => {
            setFeedback(null);
            if (current + 1 < DATA_POOL.length) setCurrent((c) => c + 1);
            else setPhase("test");
          }, 1200);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, current, feedback, item]);

  /* ── Training phase: label an item ── */
  const handleLabel = useCallback((chosenLabel) => {
    if (feedback) return;
    clearInterval(timerRef.current);
    const isCorrect = chosenLabel === item.label;
    setTotalLabeled((n) => n + 1);
    if (isCorrect) setCorrectLabels((n) => n + 1);

    setFeedback({
      correct: isCorrect,
      text: isCorrect
        ? "Correct! Great labeling 🎯"
        : `Oops — that was "${item.label}". Keep going!`,
    });

    setTimeout(() => {
      setFeedback(null);
      if (current + 1 < DATA_POOL.length) {
        setCurrent((c) => c + 1);
      } else {
        setPhase("test");
      }
    }, 1000);
  }, [current, item, feedback]);

  /* ── Testing phase: model auto-classifies ── */
  const runNextTest = useCallback(() => {
    if (testIdx >= TEST_ITEMS.length) {
      setPhase("results");
      return;
    }
    const t = TEST_ITEMS[testIdx];
    // Model "accuracy" is based on how well the student trained it
    const modelGetsIt = Math.random() * 100 < accuracy;
    const predicted = modelGetsIt ? t.correct : CATEGORIES.find((c) => c !== t.correct);
    const hit = predicted === t.correct;
    if (hit) setModelScore((s) => s + 1);
    setTestResults((prev) => [...prev, { ...t, predicted, hit }]);
    setTestIdx((i) => i + 1);
  }, [testIdx, accuracy]);

  const restart = () => {
    setPhase("train");
    setCurrent(0);
    setCorrectLabels(0);
    setTotalLabeled(0);
    setFeedback(null);
    setTestIdx(0);
    setModelScore(0);
    setTestResults([]);
    setShowHint(false);
    setTimer(TIME_PER_ITEM);
  };

  /* ─────────────── RENDER ─────────────── */
  return (
    <div className="game-shell train-model">
      <h2 className="game-heading">🧠 Train&nbsp;the&nbsp;Model</h2>
      <p className="game-subtitle">
        {phase === "train" && "Label each item so the AI can learn the difference!"}
        {phase === "test"  && "Now watch your model classify new data!"}
        {phase === "results" && "Training complete — here are the results!"}
      </p>

      {/* Accuracy bar */}
      <div className="accuracy-bar-wrap">
        <span className="accuracy-label">Model Accuracy</span>
        <div className="accuracy-track">
          <div
            className="accuracy-fill"
            style={{ width: `${accuracy}%` }}
          />
        </div>
        <span className="accuracy-pct">{accuracy}%</span>
      </div>

      {/* ── TRAIN ── */}
      {phase === "train" && (
        <div className="train-area">
          <div className="train-counter">
            Item {current + 1} / {DATA_POOL.length}
          </div>

          <div className="train-card">
            <span className="train-emoji">{item.emoji}</span>
            {showHint ? (
              <span className="train-hint">{item.hint}</span>
            ) : (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                Show Hint
              </button>
            )}
            <div className={`train-timer ${timer <= 2 ? "urgent" : ""}`}>
              {timer}s
            </div>
          </div>

          {feedback ? (
            <div className={`train-feedback ${feedback.correct ? "correct" : "wrong"}`}>
              {feedback.text}
            </div>
          ) : (
            <div className="train-buttons">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="tt-btn game-btn"
                  onClick={() => handleLabel(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TEST ── */}
      {phase === "test" && (
        <div className="test-area">
          <div className="test-results-list">
            {testResults.map((r, i) => (
              <div key={i} className={`test-result-row ${r.hit ? "hit" : "miss"}`}>
                <span className="test-emoji">{r.emoji}</span>
                <span className="test-name">{r.name}</span>
                <span className="test-predicted">→ {r.predicted}</span>
                <span className="test-verdict">{r.hit ? "✅" : "❌"}</span>
              </div>
            ))}
          </div>
          {testIdx < TEST_ITEMS.length ? (
            <button className="tt-btn game-btn primary" onClick={runNextTest}>
              Classify Next ({testIdx + 1}/{TEST_ITEMS.length})
            </button>
          ) : (
            <button className="tt-btn game-btn primary" onClick={() => setPhase("results")}>
              See Results →
            </button>
          )}
        </div>
      )}

      {/* ── RESULTS ── */}
      {phase === "results" && (
        <div className="results-area">
          <div className="results-score">
            <div className="results-big">{modelScore}/{TEST_ITEMS.length}</div>
            <div className="results-caption">correctly classified</div>
          </div>
          <p className="results-insight">
            {accuracy >= 80
              ? "🌟 Amazing training! Your accurate labels helped the model learn really well."
              : accuracy >= 50
              ? "👍 Good effort! More accurate labels = a smarter model. That's how real ML works!"
              : "🔄 The model struggled because the training data had too many wrong labels. In real ML, data quality is everything!"}
          </p>
          <button className="tt-btn game-btn" onClick={restart}>Play Again</button>
        </div>
      )}
    </div>
  );
}
