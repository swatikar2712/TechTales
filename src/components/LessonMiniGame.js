import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./LessonMiniGame.css";

/* ───────────────────── Match Pairs Game ───────────────────── */
function MatchGame({ data }) {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);

  const handleTermClick = (term) => {
    if (matched.includes(term)) return;
    setSelectedTerm(term);
    setWrong(null);
  };

  const handleDefClick = (pair) => {
    if (!selectedTerm || matched.includes(pair.term)) return;
    if (selectedTerm === pair.term) {
      setMatched((prev) => [...prev, pair.term]);
      setSelectedTerm(null);
    } else {
      setWrong(pair.term);
      setTimeout(() => setWrong(null), 700);
    }
  };

  const allMatched = matched.length === data.pairs.length;

  return (
    <div className="mg-match">
      <div className="mg-match-cols">
        <div className="mg-match-col">
          <span className="mg-match-label">Terms</span>
          {data.pairs.map((p) => (
            <button
              key={p.term}
              className={`mg-match-btn mg-term ${
                matched.includes(p.term) ? "mg-done" : ""
              } ${selectedTerm === p.term ? "mg-active" : ""}`}
              onClick={() => handleTermClick(p.term)}
              disabled={matched.includes(p.term)}
            >
              {p.term}
            </button>
          ))}
        </div>
        <div className="mg-match-col">
          <span className="mg-match-label">Meanings</span>
          {data.pairs.map((p) => (
            <button
              key={p.definition}
              className={`mg-match-btn mg-def ${
                matched.includes(p.term) ? "mg-done" : ""
              } ${wrong === p.term ? "mg-wrong-flash" : ""}`}
              onClick={() => handleDefClick(p)}
              disabled={matched.includes(p.term)}
            >
              {p.definition}
            </button>
          ))}
        </div>
      </div>
      {allMatched && (
        <div className="mg-success">
          🎉 All matched! Great job!
        </div>
      )}
    </div>
  );
}

/* ───────────────────── True / False Game ───────────────────── */
function TrueFalseGame({ data }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(null);

  const stmt = data.statements[current];

  const handleAnswer = (val) => {
    if (answered) return;
    const correct = val === stmt.answer;
    if (correct) setScore((s) => s + 1);
    setWasCorrect(correct);
    setAnswered(true);
  };

  const next = () => {
    setAnswered(false);
    setWasCorrect(null);
    setCurrent((c) => c + 1);
  };

  if (current >= data.statements.length) {
    return (
      <div className="mg-success">
        🎉 Done! You got <strong>{score}/{data.statements.length}</strong> right!
      </div>
    );
  }

  return (
    <div className="mg-tf">
      <div className="mg-tf-progress">
        {current + 1} / {data.statements.length}
      </div>
      <p className="mg-tf-statement">{stmt.text}</p>
      <div className="mg-tf-btns">
        <button
          className={`mg-tf-btn mg-tf-true ${
            answered && stmt.answer === true ? "mg-correct" : ""
          } ${answered && !wasCorrect && true !== stmt.answer ? "" : ""}`}
          onClick={() => handleAnswer(true)}
          disabled={answered}
        >
          ✅ True
        </button>
        <button
          className={`mg-tf-btn mg-tf-false ${
            answered && stmt.answer === false ? "mg-correct" : ""
          }`}
          onClick={() => handleAnswer(false)}
          disabled={answered}
        >
          ❌ False
        </button>
      </div>
      {answered && (
        <div className={`mg-tf-feedback ${wasCorrect ? "correct" : "wrong"}`}>
          {wasCorrect ? "Correct! 🌟" : `Nope! The answer is ${stmt.answer ? "True" : "False"}`}
        </div>
      )}
      {answered && current < data.statements.length - 1 && (
        <button className="mg-next-btn" onClick={next}>
          Next →
        </button>
      )}
    </div>
  );
}

/* ───────────────────── Word Scramble Game ───────────────────── */
function WordScrambleGame({ data }) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const word = data.words[current];

  const handleCheck = useCallback(() => {
    if (input.trim().toUpperCase() === word.answer.toUpperCase()) {
      setSolved(true);
      setScore((s) => s + 1);
    }
  }, [input, word.answer]);

  const next = () => {
    setSolved(false);
    setShowHint(false);
    setInput("");
    setCurrent((c) => c + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  if (current >= data.words.length) {
    return (
      <div className="mg-success">
        🎉 Done! You unscrambled <strong>{score}/{data.words.length}</strong> words!
      </div>
    );
  }

  return (
    <div className="mg-ws">
      <div className="mg-ws-progress">
        {current + 1} / {data.words.length}
      </div>
      <div className="mg-ws-scrambled">
        {word.scrambled.split("").map((ch, i) => (
          <span key={i} className={`mg-ws-letter ${ch === " " ? "mg-ws-space" : ""}`}>
            {ch}
          </span>
        ))}
      </div>
      {showHint && <p className="mg-ws-hint">💡 Hint: {word.hint}</p>}
      {!solved && (
        <>
          <div className="mg-ws-input-row">
            <input
              className="mg-ws-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer…"
              maxLength={word.answer.length + 2}
            />
            <button className="mg-ws-check" onClick={handleCheck}>
              Check
            </button>
          </div>
          {!showHint && (
            <button className="mg-hint-btn" onClick={() => setShowHint(true)}>
              Need a hint?
            </button>
          )}
        </>
      )}
      {solved && (
        <>
          <div className="mg-tf-feedback correct">Correct! 🌟 The word is {word.answer}</div>
          {current < data.words.length - 1 && (
            <button className="mg-next-btn" onClick={next}>Next →</button>
          )}
        </>
      )}
    </div>
  );
}

/* ───────────────────── Sort Buckets Game ───────────────────── */
function SortBucketsGame({ data }) {
  const [placements, setPlacements] = useState({});
  const [dragging, setDragging] = useState(null);
  const [checked, setChecked] = useState(false);
  const [clickSelect, setClickSelect] = useState(null);

  const unplaced = data.items.filter(
    (item) => !Object.keys(placements).includes(item.text)
  );

  const handleClickItem = (item) => {
    if (checked) return;
    setClickSelect(item.text);
  };

  const handleClickBucket = (bucket) => {
    if (checked || !clickSelect) return;
    setPlacements((prev) => ({ ...prev, [clickSelect]: bucket }));
    setClickSelect(null);
  };

  const handleCheck = () => setChecked(true);

  const handleReset = () => {
    setPlacements({});
    setChecked(false);
    setClickSelect(null);
  };

  const correctCount = checked
    ? data.items.filter((item) => placements[item.text] === item.bucket).length
    : 0;

  const allPlaced = Object.keys(placements).length === data.items.length;

  return (
    <div className="mg-sb">
      {/* Items to sort */}
      {unplaced.length > 0 && (
        <div className="mg-sb-items">
          {unplaced.map((item) => (
            <button
              key={item.text}
              className={`mg-sb-chip ${clickSelect === item.text ? "mg-active" : ""}`}
              draggable
              onDragStart={() => setDragging(item.text)}
              onClick={() => handleClickItem(item)}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}

      {/* Buckets */}
      <div className="mg-sb-buckets">
        {data.buckets.map((bucket) => {
          const items = data.items.filter(
            (item) => placements[item.text] === bucket
          );
          return (
            <div
              key={bucket}
              className={`mg-sb-bucket ${clickSelect ? "mg-sb-bucket-highlight" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragging) {
                  setPlacements((prev) => ({ ...prev, [dragging]: bucket }));
                  setDragging(null);
                }
              }}
              onClick={() => handleClickBucket(bucket)}
            >
              <span className="mg-sb-bucket-title">{bucket}</span>
              <div className="mg-sb-bucket-items">
                {items.map((item) => (
                  <span
                    key={item.text}
                    className={`mg-sb-placed ${
                      checked
                        ? item.bucket === bucket
                          ? "mg-correct"
                          : "mg-wrong"
                        : ""
                    }`}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mg-sb-actions">
        {!checked && allPlaced && (
          <button className="mg-next-btn" onClick={handleCheck}>
            Check Answers
          </button>
        )}
        {checked && (
          <>
            <div className="mg-success">
              🎉 You got <strong>{correctCount}/{data.items.length}</strong> correct!
            </div>
            <button className="mg-hint-btn" onClick={handleReset}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────────────── Main Wrapper ───────────────────── */
export default function LessonMiniGame({ miniGame }) {
  if (!miniGame) return null;

  const renderGame = () => {
    switch (miniGame.type) {
      case "match":
        return <MatchGame data={miniGame} />;
      case "trueFalse":
        return <TrueFalseGame data={miniGame} />;
      case "wordScramble":
        return <WordScrambleGame data={miniGame} />;
      case "sortBuckets":
        return <SortBucketsGame data={miniGame} />;
      default:
        return null;
    }
  };

  return (
    <div className="mg-wrapper">
      <div className="mg-header">
        <span className="mg-badge">🎮 Mini Game</span>
        <h3 className="mg-title">{miniGame.title}</h3>
        <p className="mg-instruction">{miniGame.instruction}</p>
      </div>
      <div className="mg-body">{renderGame()}</div>
      <div className="mg-footer">
        <Link to="/play" className="mg-more-games-btn">
          🕹️ More Games →
        </Link>
      </div>
    </div>
  );
}
