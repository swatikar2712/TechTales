import { useState } from "react";

function DataExplorerGame() {
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("Choose the strongest password! 🔒");

  const options = [
    { pass: "12345", correct: false },
    { pass: "ilovecoding", correct: false },
    { pass: "Tr0ub4dor&3", correct: true },
    { pass: "password", correct: false }
  ];

  const checkPassword = () => {
    const choice = options.find(o => o.pass === selected);
    if (!selected) return alert("Select a password!");
    if (choice.correct) setMessage("🎉 Strong password! Safe choice!");
    else setMessage("❌ Weak password! Try again!");
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Comic Sans MS, cursive", padding: "50px", backgroundColor: "#fff", minHeight: "100vh" }}>
      <h1>🛡️ Data Explorer</h1>
      <p>{message}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px", alignItems: "center" }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => setSelected(o.pass)} style={{ ...componentStyle, backgroundColor: selected === o.pass ? "#FFD700" : "#8A2BE2" }}>
            {o.pass}
          </button>
        ))}
      </div>
      <button onClick={checkPassword} style={{ ...componentStyle, marginTop: "30px", backgroundColor: "#FFD700", color: "#6A0DAD" }}>Check</button>
    </div>
  );
}

const componentStyle = {
  padding: "15px 25px",
  fontSize: "16px",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  transition: "transform 0.2s"
};

export default DataExplorerGame;