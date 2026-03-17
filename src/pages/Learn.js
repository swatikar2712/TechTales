import React from "react";

const Learn = ({ topic }) => {
  const lessons = {
    "AI World": {
      title: "🤖 Welcome to AI World",
      text: "Artificial Intelligence helps machines think and make decisions like humans. AI can recognize voices, suggest videos, and even drive cars!",
      color: "#dcedc1",
    },
    "ML World": {
      title: "🧠 Welcome to ML World",
      text: "Machine Learning is how computers learn from examples. The more data they see, the smarter they become!",
      color: "#dcedc1",
    },
    Robotics: {
      title: "🦾 Welcome to Robotics",
      text: "Robotics is about building machines that can move, lift things, and help people in real life.",
      color: "#dcedc1",
    },
  };

  const current = lessons[topic];

  return (
    <div style={{ padding: "20px" }}>
      {!topic && (
        <div>
          <h2>🤖 Choose a topic from Home!</h2>
          <p>Select a world and come back to learn amazing things.</p>
        </div>
      )}

      {topic && (
        <div
          style={{
            backgroundColor: current.color,
            padding: "25px",
            borderRadius: "20px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h2>{current.title}</h2>
          <p style={{ fontSize: "18px" }}>{current.text}</p>

          <div style={{ marginTop: "20px", fontSize: "40px" }}>
            {topic === "AI World" && "🤖"}
            {topic === "ML World" && "🧠"}
            {topic === "Robotics" && "🦾"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
