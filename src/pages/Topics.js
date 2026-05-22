import { useParams, useNavigate } from "react-router-dom";
import "./Topics.css";

const WORLD_META = {
  ai:       { label: "AI World",      color: "#FFE082" },
  ml:       { label: "ML World",      color: "#C4A8D8" },
  robotics: { label: "Robotics World", color: "#E5B84C" },
};

function Topics() {
  const { world } = useParams();
  const navigate = useNavigate();

  const data = {
    ai: [
      { id: 1, title: "What is AI?" },
      { id: 2, title: "Where we use AI?" },
      { id: 3, title: "AI in daily life" },
    ],
    ml: [
      { id: 1, title: "Introduction to Machine Learning" },
      { id: 2, title: "How Computers Learn from Data" },
      { id: 3, title: "Types of Machine Learning" },
      { id: 4, title: "Everyday Uses of Machine Learning" },
      { id: 5, title: "Future of AI and Smart Technology" },
    ],
    robotics: [
      { id: 1, title: "What is a Robot?" },
      { id: 2, title: "Robot Parts" },
      { id: 3, title: "Robots around us" },
    ],
  };

  const lessons = data[world] || [];
  const meta = WORLD_META[world] || { label: world, color: "#FFE082" };

  return (
    <div className="topics-page page-card">
      <div className="page-header">
        <h1>{meta.label} Topics</h1>
        <p>{lessons.length} lessons available</p>
      </div>

      {lessons.length === 0 ? (
        <p className="topics-empty">No topics available yet.</p>
      ) : (
        <div className="topics-list">
          {lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="topic-row"
              onClick={() => navigate(`/lesson/${world}/${lesson.id}`)}
            >
              <span className="topic-num" style={{ background: meta.color }}>{idx + 1}</span>
              <span className="topic-unit">Unit {idx + 1}</span>
              <span className="topic-title">{lesson.title}</span>
              <span className="topic-arrow">&rarr;</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topics;
