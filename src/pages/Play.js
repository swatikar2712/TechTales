import { useState } from "react";
import RobotGame from "../games/RobotGame";
import CircuitGame from "../games/CircuitGame";
import WebBuilderGame from "../games/WebBuilderGame";
import DataExplorerGame from "../games/DataExplorerGame";
import SortingGame from "../games/SortingGame";
import "./Play.css";

const GAMES = [
  { key: "robot",   title: "Code the Robot",   icon: "\uD83E\uDD16", color: "#667eea", desc: "Program a robot to move" },
  { key: "circuit", title: "Circuit Builder",   icon: "\u26A1",       color: "#0077b6", desc: "Build working circuits" },
  { key: "web",     title: "Web Builder",       icon: "\uD83C\uDF10", color: "#43aa8b", desc: "Create web pages visually" },
  { key: "data",    title: "Data Explorer",     icon: "\uD83D\uDEE1\uFE0F", color: "#fb8500", desc: "Explore and analyze data" },
  { key: "sorting", title: "Sorting Puzzle",    icon: "\uD83E\uDDE9", color: "#f72585", desc: "Solve sorting challenges" },
];

function Play() {
  const [selectedGame, setSelectedGame] = useState("");

  const renderGame = () => {
    switch (selectedGame) {
      case "robot":   return <RobotGame />;
      case "circuit": return <CircuitGame />;
      case "web":     return <WebBuilderGame />;
      case "data":    return <DataExplorerGame />;
      case "sorting": return <SortingGame />;
      default:        return null;
    }
  };

  return (
    <div className="play-page page-card">
      {!selectedGame ? (
        <>
          <div className="page-header" style={{ textAlign: "center" }}>
            <h1>Tech Playground</h1>
            <p>Choose a game to learn technology interactively</p>
          </div>

          <div className="games-grid">
            {GAMES.map((game) => (
              <div
                key={game.key}
                className="game-card"
                onClick={() => setSelectedGame(game.key)}
              >
                <div className="game-icon-wrap" style={{ background: game.color + "15" }}>
                  <span className="game-icon" style={{ color: game.color }}>{game.icon}</span>
                </div>
                <h3 className="game-title">{game.title}</h3>
                <p className="game-desc">{game.desc}</p>
                <span className="game-play" style={{ color: game.color }}>Play &rarr;</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button className="tt-btn tt-btn-ghost play-back" onClick={() => setSelectedGame("")}>
            &larr; Back to Games
          </button>
          <div className="game-container">
            {renderGame()}
          </div>
        </>
      )}
    </div>
  );
}

export default Play;
