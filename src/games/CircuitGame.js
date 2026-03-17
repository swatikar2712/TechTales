import { useState } from "react";

function CircuitGame() {
  const [battery, setBattery] = useState(false);
  const [led, setLed] = useState(false);
  const [resistor, setResistor] = useState(false);
  const [message, setMessage] = useState("Connect the components to light the LED! 💡");

  const checkCircuit = () => {
    if (battery && led && resistor) {
      setMessage("🎉 Success! The LED is glowing!");
    } else {
      setMessage("❌ Circuit incomplete! Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Comic Sans MS, cursive", padding: "50px", backgroundColor: "#fefae0", minHeight: "100vh" }}>
      <h1>⚡ Circuit Builder</h1>
      <p>{message}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button onClick={() => setBattery(!battery)} style={componentStyle}>{battery ? "🔋 Battery ✔️" : "🔋 Battery"}</button>
        <button onClick={() => setResistor(!resistor)} style={componentStyle}>{resistor ? "🔌 Resistor ✔️" : "🔌 Resistor"}</button>
        <button onClick={() => setLed(!led)} style={componentStyle}>{led ? "💡 LED ✔️" : "💡 LED"}</button>
      </div>
      <button onClick={checkCircuit} style={{ ...componentStyle, marginTop: "30px", backgroundColor: "#ffb703" }}>Check Circuit</button>
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

export default CircuitGame;