import { useState, useCallback, useRef, useEffect } from "react";
import "./GameStyles.css";

/* ── Missions: grid maps with start, goal, obstacles ── */
const MISSIONS = [
  {
    name: "First Steps",
    desc: "Move the robot to the star!",
    grid: 5,
    start: { x: 0, y: 4 },
    goal:  { x: 4, y: 0 },
    walls: [],
    maxCmds: 8,
  },
  {
    name: "Obstacle Course",
    desc: "Navigate around the walls!",
    grid: 5,
    start: { x: 0, y: 4 },
    goal:  { x: 4, y: 0 },
    walls: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 },
    ],
    maxCmds: 12,
  },
  {
    name: "Maze Runner",
    desc: "Find the path through the maze!",
    grid: 6,
    start: { x: 0, y: 5 },
    goal:  { x: 5, y: 0 },
    walls: [
      { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 4, y: 1 }, { x: 4, y: 2 },
    ],
    maxCmds: 16,
  },
];

const CMDS = [
  { key: "up",    label: "⬆ Up",    dx: 0,  dy: -1 },
  { key: "down",  label: "⬇ Down",  dx: 0,  dy: 1 },
  { key: "left",  label: "⬅ Left",  dx: -1, dy: 0 },
  { key: "right", label: "➡ Right", dx: 1,  dy: 0 },
];

export default function RobotCommanderGame() {
  const [missionIdx, setMissionIdx] = useState(0);
  const [program, setProgram] = useState([]);
  const [robotPos, setRobotPos] = useState(null);
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [result, setResult] = useState(null);   // "win" | "crash" | "miss" | null
  const [missionsDone, setMissionsDone] = useState(0);
  const timerRef = useRef(null);

  const mission = MISSIONS[missionIdx];
  const isWall = (x, y) => mission.walls.some((w) => w.x === x && w.y === y);

  /* Reset position when mission changes */
  useEffect(() => {
    setRobotPos({ ...mission.start });
    setProgram([]);
    setResult(null);
    setStepIdx(-1);
    setRunning(false);
  }, [missionIdx, mission.start]);

  /* ── Add / remove commands ── */
  const addCmd = (key) => {
    if (running || program.length >= mission.maxCmds) return;
    setProgram((p) => [...p, key]);
  };
  const removeCmd = (idx) => {
    if (running) return;
    setProgram((p) => p.filter((_, i) => i !== idx));
  };
  const clearProgram = () => { if (!running) { setProgram([]); setResult(null); setRobotPos({ ...mission.start }); setStepIdx(-1); } };

  /* ── Execute the program step-by-step ── */
  const runProgram = useCallback(() => {
    if (program.length === 0) return;
    setResult(null);
    setRunning(true);
    setRobotPos({ ...mission.start });

    let pos = { ...mission.start };
    let step = 0;

    const tick = () => {
      if (step >= program.length) {
        // Ran out of commands
        setRunning(false);
        if (pos.x === mission.goal.x && pos.y === mission.goal.y) {
          setResult("win");
          setMissionsDone((d) => Math.max(d, missionIdx + 1));
        } else {
          setResult("miss");
        }
        return;
      }

      const cmd = CMDS.find((c) => c.key === program[step]);
      const nx = pos.x + cmd.dx;
      const ny = pos.y + cmd.dy;

      if (nx < 0 || nx >= mission.grid || ny < 0 || ny >= mission.grid || isWall(nx, ny)) {
        // Hit wall / boundary
        setStepIdx(step);
        setRunning(false);
        setResult("crash");
        return;
      }

      pos = { x: nx, y: ny };
      setRobotPos({ ...pos });
      setStepIdx(step);
      step++;
      timerRef.current = setTimeout(tick, 400);
    };

    timerRef.current = setTimeout(tick, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, mission, missionIdx]);

  /* Clean up timer */
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const nextMission = () => {
    if (missionIdx + 1 < MISSIONS.length) setMissionIdx((i) => i + 1);
  };

  const restart = () => { setMissionIdx(0); setMissionsDone(0); };

  /* ─────────── RENDER ─────────── */
  const pos = robotPos || mission.start;

  return (
    <div className="game-shell robot-commander">
      <h2 className="game-heading">🤖 Robot&nbsp;Commander</h2>
      <p className="game-subtitle">
        Program a sequence of moves, then run your code!
      </p>

      {/* Mission header */}
      <div className="rc-mission-header">
        <span className="rc-mission-badge">Mission {missionIdx + 1}</span>
        <span className="rc-mission-name">{mission.name}</span>
        <span className="rc-mission-desc">{mission.desc}</span>
      </div>

      <div className="rc-layout">
        {/* Grid */}
        <div className="rc-grid-wrap">
          <div
            className="rc-grid"
            style={{
              gridTemplateColumns: `repeat(${mission.grid}, 1fr)`,
              gridTemplateRows: `repeat(${mission.grid}, 1fr)`,
            }}
          >
            {Array.from({ length: mission.grid * mission.grid }).map((_, i) => {
              const x = i % mission.grid;
              const y = Math.floor(i / mission.grid);
              const isRobot = pos.x === x && pos.y === y;
              const isGoal = mission.goal.x === x && mission.goal.y === y;
              const wall = isWall(x, y);
              return (
                <div
                  key={i}
                  className={`rc-cell ${wall ? "wall" : ""} ${isRobot ? "robot" : ""} ${isGoal && !isRobot ? "goal" : ""}`}
                >
                  {isRobot && "🤖"}
                  {isGoal && !isRobot && "⭐"}
                </div>
              );
            })}
          </div>
        </div>

        {/* Command panel */}
        <div className="rc-panel">
          <div className="rc-cmd-buttons">
            {CMDS.map((c) => (
              <button
                key={c.key}
                className="tt-btn game-btn small"
                onClick={() => addCmd(c.key)}
                disabled={running || program.length >= mission.maxCmds}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="rc-program">
            <div className="rc-program-label">
              Your Program ({program.length}/{mission.maxCmds})
            </div>
            <div className="rc-program-list">
              {program.length === 0 && (
                <span className="rc-empty">Add commands above ↑</span>
              )}
              {program.map((key, i) => {
                const c = CMDS.find((cmd) => cmd.key === key);
                return (
                  <span
                    key={i}
                    className={`rc-step ${stepIdx === i ? "active" : ""}`}
                    onClick={() => removeCmd(i)}
                    title="Click to remove"
                  >
                    {c.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="rc-actions">
            <button
              className="tt-btn game-btn primary"
              onClick={runProgram}
              disabled={running || program.length === 0}
            >
              ▶ Run
            </button>
            <button className="tt-btn game-btn" onClick={clearProgram} disabled={running}>
              ↺ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {result && (
        <div className={`rc-result ${result}`}>
          {result === "win" && (
            <>
              <strong>🎉 Mission Complete!</strong>
              <p>Your robot followed the program perfectly — just like real robotics!</p>
              {missionIdx + 1 < MISSIONS.length ? (
                <button className="tt-btn game-btn primary small" onClick={nextMission}>
                  Next Mission →
                </button>
              ) : (
                <div>
                  <p>🏆 All missions cleared! You completed {missionsDone + 1} missions!</p>
                  <button className="tt-btn game-btn small" onClick={restart}>Restart All</button>
                </div>
              )}
            </>
          )}
          {result === "crash" && (
            <>
              <strong>💥 Crash! The robot hit a wall.</strong>
              <p>Debug your program and try again — debugging is a big part of robotics!</p>
            </>
          )}
          {result === "miss" && (
            <>
              <strong>📍 The robot didn't reach the goal.</strong>
              <p>Adjust your commands — in robotics, precision matters!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
