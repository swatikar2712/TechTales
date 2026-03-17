import { useParams, useNavigate } from "react-router-dom";
import "./Topics.css";

const WORLD_META = {
  ai:       { label: "AI World",      color: "#667eea" },
  ml:       { label: "ML World",      color: "#f72585" },
  robotics: { label: "Robotics World", color: "#43aa8b" },
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
      { id: 1, title: "Foundations of Machine Learning" },
      { id: 2, title: "Data Preparation & Exploratory Analysis" },
      { id: 3, title: "Supervised Learning: Regression, Classification & Evaluation" },
      { id: 4, title: "Unsupervised Learning, Ensembles & Deep Learning" },
      { id: 5, title: "ML in Practice: Deployment, Ethics & Real-World Applications" },
    ],
    robotics: [
      { id: 1, title: "What is a Robot?" },
      { id: 2, title: "Robot Parts" },
      { id: 3, title: "Robots around us" },
    ],
  };

  const lessons = data[world] || [];
  const meta = WORLD_META[world] || { label: world, color: "#667eea" };

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
