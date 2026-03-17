import { useState } from "react";

function SortingGame() {
  const [numbers, setNumbers] = useState([4, 2, 5, 1, 3]);
  const [message, setMessage] = useState("Sort the numbers in ascending order! 🔢");

  const swap = (i, j) => {
    let newArr = [...numbers];
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    setNumbers(newArr);
  };

  const checkSorted = () => {
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > numbers[i + 1]) {
        setMessage("❌ Not sorted yet! Try again!");
        return;
      }
    }
    setMessage("🎉 Perfect! Numbers are sorted!");
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Comic Sans MS, cursive", padding: "50px", backgroundColor: "#fefae0", minHeight: "100vh" }}>
      <h1>🧩 Sorting Puzzle</h1>
      <p>{message}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        {numbers.map((num, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button style={componentStyle} onClick={() => i > 0 && swap(i, i - 1)}>⬆️ Swap Up</button>
            <div style={{ fontSize: "2em", margin: "10px 0" }}>{num}</div>
            <button style={componentStyle} onClick={() => i < numbers.length - 1 && swap(i, i + 1)}>⬇️ Swap Down</button>
          </div>
        ))}
      </div>
      <button onClick={checkSorted} style={{ ...componentStyle, marginTop: "30px", backgroundColor: "#ffb703" }}>Check</button>
    </div>
  );
}

const componentStyle = {
  padding: "10px 20px",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#8ecae6",
  color: "#023047",
  fontSize: "16px",
  transition: "transform 0.2s"
};

export default SortingGame;