import { useState, useEffect, useRef } from "react";

const LEVELS = [
  {
    word: "ALGORITHM",
    hint: "Hint: A set of rules or processes followed by a computer.",
    letters: ["A", "L", "G", "O", "R", "I", "T", "H", "M"],
  },
  {
    word: "DATA",
    hint: "Hint: Information used to train AI models.",
    letters: ["D", "A", "T", "A"],
  },
  {
    word: "NEURAL",
    hint: "Hint: Related to networks that mimic the brain.",
    letters: ["N", "E", "U", "R", "A", "L"],
  },
  {
    word: "CLASSIFIER",
    hint: "Hint: An AI system that categorizes data.",
    letters: ["C", "L", "A", "S", "S", "I", "F", "I", "E", "R"],
  },
];

function WordChallengeGame() {
  const [level, setLevel] = useState(0);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [placedLetters, setPlacedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [message, setMessage] = useState("Drag letters to form the word.");
  const [status, setStatus] = useState("playing");

  const current = LEVELS[level];

  useEffect(() => {
    const shuffled = [...current.letters].sort(() => Math.random() - 0.5).map((letter, idx) => ({ letter, id: idx + level * 100 })); // unique ids
    setAvailableLetters(shuffled);
    setPlacedLetters([]);
    setMessage("Drag letters to form the word.");
    setStatus("playing");
  }, [level, current.letters]);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    setPlacedLetters([]);
    setMessage("Drag letters to form the word.");
    setStatus("playing");
  }, [level]);

  const handleDragStart = (item) => {
    setDraggedLetter(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedLetter) {
      setPlacedLetters((prev) => [...prev, draggedLetter.letter]);
      setAvailableLetters((prev) => prev.filter((item) => item.id !== draggedLetter.id));
      setDraggedLetter(null);
    }
  };

  const removeLetter = (index) => {
    const removed = placedLetters[index];
    setPlacedLetters((prev) => prev.filter((_, i) => i !== index));
    setAvailableLetters((prev) => [...prev, { letter: removed, id: Date.now() }]);
  };

  const checkWord = () => {
    const formedWord = placedLetters.join("");
    if (formedWord === current.word) {
      if (level === LEVELS.length - 1) {
        setStatus("complete");
        setMessage("🎉 Perfect! You guessed all AI keywords.");
      } else {
        setStatus("won");
        setMessage("Correct! Next keyword unlocked.");
      }
    } else {
      setMessage("Not quite right. Try rearranging the letters.");
    }
  };

  const nextLevel = () => {
    setLevel((prev) => Math.min(prev + 1, LEVELS.length - 1));
  };

  const reset = () => {
    setPlacedLetters([]);
    setMessage("Drag letters to form the word.");
    setStatus("playing");
  };

  return (
    <div style={shellStyle}>
      <h1 style={headingStyle}>🔤 AI Word Challenge</h1>
      <p style={subtitleStyle}>{current.hint}</p>
      <p style={statusStyle}>{message}</p>

      <div style={panelStyle}>
        <div style={dropZoneStyle} ref={dropZoneRef} onDragOver={handleDragOver} onDrop={handleDrop}>
          <div style={panelTitleStyle}>Form the Word</div>
          <div style={placedLettersStyle}>
            {placedLetters.map((letter, index) => (
              <span
                key={index}
                style={placedLetterStyle}
                onClick={() => removeLetter(index)}
                title="Click to remove"
              >
                {letter}
              </span>
            ))}
            {placedLetters.length === 0 && <span style={emptyTextStyle}>Drop letters here</span>}
          </div>
        </div>

        <div style={lettersPanelStyle}>
          <div style={panelTitleStyle}>Available Letters</div>
          <div style={lettersGridStyle}>
            {availableLetters.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                style={letterTileStyle}
              >
                {item.letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={actionRowStyle}>
        <button onClick={checkWord} style={actionButtonStyle}>Check Word</button>
        <button onClick={reset} style={secondaryButtonStyle}>Reset</button>
        {status === "won" && level < LEVELS.length - 1 && (
          <button onClick={nextLevel} style={{ ...actionButtonStyle, background: "#81C784", color: "#fff" }}>
            Next Level
          </button>
        )}
        {status === "complete" && (
          <button onClick={reset} style={{ ...actionButtonStyle, background: "#82B1FF", color: "#fff" }}>
            Play Again
          </button>
        )}
      </div>

      <div style={footerStyle}>Level {level + 1} of {LEVELS.length}</div>
    </div>
  );
}

const shellStyle = {
  textAlign: "center",
  fontFamily: "Inter, sans-serif",
  padding: "50px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f7f7ff 0%, #eaf5ff 100%)",
};
const headingStyle = {
  fontSize: "2.2rem",
  margin: "0 0 10px",
  color: "#2f2f46",
};
const subtitleStyle = {
  color: "#5b6073",
  margin: "0 0 16px",
  fontSize: "1rem",
};
const statusStyle = {
  color: "#4d4f61",
  margin: "0 0 24px",
  fontSize: "0.95rem",
};
const panelStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  alignItems: "start",
  marginBottom: "24px",
};
const dropZoneStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
  minHeight: "200px",
  border: "2px dashed #c4d3ff",
};
const panelTitleStyle = {
  textAlign: "left",
  marginBottom: "16px",
  fontWeight: 700,
  color: "#2f2f46",
};
const placedLettersStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  minHeight: "60px",
  alignItems: "center",
};
const placedLetterStyle = {
  background: "#82b1ff",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "12px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "1.2rem",
};
const emptyTextStyle = {
  color: "#6e748a",
  fontStyle: "italic",
};
const lettersPanelStyle = {
  background: "#fff",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
};
const lettersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
  gap: "12px",
};
const letterTileStyle = {
  background: "#f4f7ff",
  border: "2px solid #e1e8ff",
  borderRadius: "12px",
  padding: "16px",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1.2rem",
  cursor: "grab",
  color: "#2f2f46",
};
const actionRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "16px",
  marginBottom: "18px",
};
const actionButtonStyle = {
  padding: "14px 26px",
  borderRadius: "18px",
  border: "none",
  background: "#8E6FBF",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
const secondaryButtonStyle = {
  ...actionButtonStyle,
  background: "#fff",
  color: "#8E6FBF",
  border: "2px solid #8E6FBF",
};
const footerStyle = {
  color: "#5b6073",
  fontSize: "0.95rem",
};

export default WordChallengeGame;

