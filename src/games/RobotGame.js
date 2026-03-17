import { useState } from "react";

function RobotGame() {
  const gridSize = 5;
  const goal = { x: 4, y: 4 };
  const [robot, setRobot] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Guide the robot to the ⭐");

  const moveRobot = (direction) => {
    setRobot((prev) => {
      let { x, y } = prev;
      if (direction === "up" && y > 0) y--;
      if (direction === "down" && y < gridSize - 1) y++;
      if (direction === "left" && x > 0) x--;
      if (direction === "right" && x < gridSize - 1) x++;
      if (x === goal.x && y === goal.y) setMessage("🎉 You reached the goal!");
      return { x, y };
    });
  };

  const renderGrid = () => {
    let rows = [];
    for (let y = 0; y < gridSize; y++) {
      let cells = [];
      for (let x = 0; x < gridSize; x++) {
        let content = "";
        if (robot.x === x && robot.y === y) content = "🤖";
        else if (goal.x === x && goal.y === y) content = "⭐";
        cells.push(
          <td key={x} style={{ width: "60px", height: "60px", border: "1px solid #023047", textAlign: "center", fontSize: "2em" }}>
            {content}
          </td>
        );
      }
      rows.push(<tr key={y}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Comic Sans MS, cursive", padding: "50px", backgroundColor: "#fefae0", minHeight: "100vh" }}>
      <h1>🤖 Code the Robot</h1>
      <p>{message}</p>
      <table style={{ margin: "20px auto", borderCollapse: "collapse" }}>
        <tbody>{renderGrid()}</tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        <button style={buttonStyle} onClick={() => moveRobot("up")}>⬆️ Up</button>
        <button style={buttonStyle} onClick={() => moveRobot("down")}>⬇️ Down</button>
        <button style={buttonStyle} onClick={() => moveRobot("left")}>⬅️ Left</button>
        <button style={buttonStyle} onClick={() => moveRobot("right")}>➡️ Right</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "18px",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#ffb703",
  color: "#023047",
  transition: "transform 0.2s"
};

export default RobotGame;