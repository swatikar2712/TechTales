import { useState } from "react";
import TrainModelGame from "../games/TrainModelGame";
import PatternDetectiveGame from "../games/PatternDetectiveGame";
import RobotCommanderGame from "../games/RobotCommanderGame";
import WordChallengeGame from "../games/WordChallengeGame";
import "./Play.css";

const GAMES = [
  { key: "train",   title: "Train the Model",      icon: "\uD83E\uDDE0", color: "#C4A8D8", desc: "Label data to teach an AI classifier \u2014 see how training quality affects accuracy!" },
  { key: "pattern", title: "AI Pattern Detective",  icon: "\uD83D\uDD0D", color: "#FFE082", desc: "Spot hidden patterns in sequences \u2014 the same skill AI uses to learn from data!" },
  { key: "robot",   title: "Robot Commander",       icon: "\uD83E\uDD16", color: "#8E6FBF", desc: "Write a program of commands, then watch your robot execute the mission!" },
  { key: "circuit", title: "AI Word Challenge",    icon: "🔤", color: "#56CCF2", desc: "Drag letters to form AI keywords you've learned in the course!" },
];

function Play() {
  const [selectedGame, setSelectedGame] = useState("");

  const renderGame = () => {
    switch (selectedGame) {
      case "train":   return <TrainModelGame />;
      case "pattern": return <PatternDetectiveGame />;
      case "robot":   return <RobotCommanderGame />;
      case "circuit": return <WordChallengeGame />;
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
