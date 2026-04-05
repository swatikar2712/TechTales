import { useState } from "react";
import TrainModelGame from "../games/TrainModelGame";
import PatternDetectiveGame from "../games/PatternDetectiveGame";
import RobotCommanderGame from "../games/RobotCommanderGame";
import WordChallengeGame from "../games/WordChallengeGame";
import "./Play.css";

const GAMES = [
  {
    key: "train",
    title: "Train the Model",
    icon: "\uD83E\uDDE0",
    gradient: "linear-gradient(135deg, #C4A8D8 0%, #8E6FBF 100%)",
    accent: "#8E6FBF",
    tag: "AI",
    difficulty: "Medium",
    desc: "Label data to teach an AI classifier — see how training quality affects accuracy!",
  },
  {
    key: "pattern",
    title: "AI Pattern Detective",
    icon: "\uD83D\uDD0D",
    gradient: "linear-gradient(135deg, #FFE082 0%, #E5B84C 100%)",
    accent: "#E5B84C",
    tag: "ML",
    difficulty: "Easy",
    desc: "Spot hidden patterns in sequences — the same skill AI uses to learn from data!",
  },
  {
    key: "robot",
    title: "Robot Commander",
    icon: "\uD83E\uDD16",
    gradient: "linear-gradient(135deg, #6C63FF 0%, #5B4A9E 100%)",
    accent: "#6C63FF",
    tag: "Robotics",
    difficulty: "Hard",
    desc: "Write a program of commands, then watch your robot execute the mission!",
  },
  {
    key: "circuit",
    title: "AI Word Challenge",
    icon: "\uD83D\uDD24",
    gradient: "linear-gradient(135deg, #90CAF9 0%, #56CCF2 100%)",
    accent: "#56CCF2",
    tag: "Vocabulary",
    difficulty: "Easy",
    desc: "Drag letters to form AI keywords you've learned in the course!",
  },
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
          <div className="play-header">
            <span className="play-header-emoji">🎮</span>
            <h1 className="play-header-title">Tech Playground</h1>
            <p className="play-header-sub">Pick a game, level up your tech skills!</p>
            <div className="play-stats">
              <span className="play-stat"><strong>{GAMES.length}</strong> Games</span>
              <span className="play-stat-dot">·</span>
              <span className="play-stat"><strong>3</strong> Difficulty levels</span>
              <span className="play-stat-dot">·</span>
              <span className="play-stat"><strong>∞</strong> Fun</span>
            </div>
          </div>

          <div className="games-grid">
            {GAMES.map((game) => (
              <div
                key={game.key}
                className="game-card"
                style={{ "--card-accent": game.accent, "--card-gradient": game.gradient }}
                onClick={() => setSelectedGame(game.key)}
              >
                <div className="game-card-top">
                  <span className="game-tag">{game.tag}</span>
                  <span className={`game-difficulty game-difficulty--${game.difficulty.toLowerCase()}`}>
                    {game.difficulty}
                  </span>
                </div>
                <div className="game-icon-wrap" style={{ background: game.gradient }}>
                  <span className="game-icon">{game.icon}</span>
                </div>
                <h3 className="game-title">{game.title}</h3>
                <p className="game-desc">{game.desc}</p>
                <span className="game-play-btn">Play &rarr;</span>
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
