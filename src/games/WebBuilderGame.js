import { useState } from "react";

function WebBuilderGame() {
  const [header, setHeader] = useState(false);
  const [image, setImage] = useState(false);
  const [button, setButton] = useState(false);
  const [message, setMessage] = useState("Build your web page! 🖥️");

  const checkPage = () => {
    if (header && image && button) {
      setMessage("🎉 Awesome! Your webpage is complete!");
    } else {
      setMessage("❌ Keep adding elements to complete the page!");
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Comic Sans MS, cursive", padding: "50px", backgroundColor: "#fefae0", minHeight: "100vh" }}>
      <h1>🌐 Web Builder</h1>
      <p>{message}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button onClick={() => setHeader(!header)} style={componentStyle}>{header ? "📝 Header ✔️" : "📝 Header"}</button>
        <button onClick={() => setImage(!image)} style={componentStyle}>{image ? "🖼️ Image ✔️" : "🖼️ Image"}</button>
        <button onClick={() => setButton(!button)} style={componentStyle}>{button ? "🔘 Button ✔️" : "🔘 Button"}</button>
      </div>
      <button onClick={checkPage} style={{ ...componentStyle, marginTop: "30px", backgroundColor: "#ffb703" }}>Check Page</button>
    </div>
  );
}

const componentStyle = {
  padding: "15px 25px",
  fontSize: "16px",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#8ecae6",
  color: "#023047",
  transition: "transform 0.2s"
};

export default WebBuilderGame;