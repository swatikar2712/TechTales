import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `You are a helpful assistant for TechTales, an educational app about AI, machine learning, and robotics. Answer questions only about AI, machine learning, robotics, and the TechTales app itself. For any other questions, respond with: "I can't answer that. I'm only allowed to answer about TechTales."
  If the user greets with "Hi," respond with: "Hello! I'm here to help you learn about AI, machine learning, robotics, and everything TechTales-related. Feel free to ask me anything about these topics!"

User question:`;

async function getBotResponse(text) {
  try {
    const result = await model.generateContent(SYSTEM_PROMPT + text);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! \uD83D\uDC4B I\u2019m your TechTales AI Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setInput("");
    setLoading(true);

    const reply = await getBotResponse(text);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, text: reply, sender: "bot" },
    ]);
    setLoading(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <>
      {/* Toggle */}
      <button
        className={`chat-toggle${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "\u2715" : "\uD83D\uDCAC"}
      </button>

      {/* Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span className="chat-header-dot" />
            TechTales AI Assistant
          </div>

          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-row ${m.sender}`}>
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-row bot">
                <div className="chat-bubble typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-bar">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Type a message\u2026"
              disabled={loading}
            />
            <button className="chat-send-btn" onClick={send} disabled={loading}>
              {loading ? "\u2026" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
