import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/* ── Mini AIVA Robot SVG ── */
const AivaAvatar = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className="aiva-avatar">
    <circle cx="100" cy="100" r="60" fill="#ffffff" stroke="#c0c0c0" strokeWidth="3" />
    <circle cx="75" cy="90" r="15" fill="#00bfff" />
    <circle cx="125" cy="90" r="15" fill="#00bfff" />
    <circle cx="70" cy="85" r="5" fill="#ffffff" />
    <circle cx="120" cy="85" r="5" fill="#ffffff" />
    <path d="M75 115 Q100 135 125 115" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2" />
    <ellipse cx="160" cy="120" rx="10" ry="20" fill="#ffffff" stroke="#c0c0c0" strokeWidth="2" />
  </svg>
);

const SYSTEM_PROMPT = `You are AIVA, the friendly robot guide of TechTales! You have a cheerful, encouraging personality and love helping kids learn about technology. You speak in a warm, playful tone — sometimes using robot-themed expressions like "beep boop" or "processing..." for fun. You refer to yourself as AIVA.

You are an educational assistant for TechTales, an app about AI, machine learning, and robotics. Answer questions only about AI, machine learning, robotics, and the TechTales app itself. For any other questions, respond with: "Beep boop! That's outside my circuits — I can only help with TechTales topics like AI, Machine Learning, and Robotics!"

If the user greets with "Hi," respond with: "Hey there! I'm AIVA, your robot buddy at TechTales! I'm here to help you explore AI, Machine Learning, and Robotics. What would you like to learn about today?"
When users ask about where to learn a topic, which unit to start from, or anything about lessons/courses, recommend relevant TechTales lessons using markdown links. Here is the full course catalog:

**Artificial Intelligence Course** (Course page: /courses/ai)
- Unit 1: What is Artificial Intelligence? -> [Start Lesson](/lesson/ai/1)
- Unit 2: AI VS Human Intelligence? -> [Start Lesson](/lesson/ai/2)
- Unit 3: Types of AI -> [Start Lesson](/lesson/ai/3)
- Unit 4: What AI Can and Cannot Do -> [Start Lesson](/lesson/ai/4)
- Unit 5: Basic Ethics -> [Start Lesson](/lesson/ai/5)

**Machine Learning Course** (Course page: /courses/ml)
- Unit 1: Foundations of Machine Learning -> [Start Lesson](/lesson/ml/1)
- Unit 2: Data Preparation & Exploratory Analysis -> [Start Lesson](/lesson/ml/2)
- Unit 3: Supervised Learning: Regression, Classification & Evaluation -> [Start Lesson](/lesson/ml/3)
- Unit 4: Unsupervised Learning, Ensembles & Deep Learning -> [Start Lesson](/lesson/ml/4)
- Unit 5: ML in Practice: Deployment, Ethics & Real-World Applications -> [Start Lesson](/lesson/ml/5)

**Robotics Course** (Course page: /courses/robotics)
- Unit 1: What is a Robot? -> [Start Lesson](/lesson/robotics/1)
- Unit 2: Robot Parts -> [Start Lesson](/lesson/robotics/2)
- Unit 3: Robots around us -> [Start Lesson](/lesson/robotics/3)
- Unit 4: Sensors and How Robots Sense -> [Start Lesson](/lesson/robotics/4)
- Unit 5: Simple Robot Projects for Beginners -> [Start Lesson](/lesson/robotics/5)
- Unit 6: Robots Around Us -> [Start Lesson](/lesson/robotics/6)
- Unit 7: Fun Facts About Robots -> [Start Lesson](/lesson/robotics/7)

Always include the markdown links (e.g. [Unit title](/lesson/ai/1)) when recommending lessons. For beginners, suggest starting with AI Unit 1. Use the exact link paths shown above.

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

/* Render bot text with markdown links as <Link> and **bold** as <strong> */
function renderBotMessage(text) {
  // Split on markdown links [text](url) and bold **text**
  const parts = text.split(/(\[.*?\]\(\/.*?\)|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.+?)\]\((\/.*?)\)$/);
    if (linkMatch) {
      return (
        <Link key={i} to={linkMatch[2]} className="chat-link">
          {linkMatch[1]}
        </Link>
      );
    }
    const boldMatch = part.match(/^\*\*(.+?)\*\*$/);
    if (boldMatch) {
      return <strong key={i}>{boldMatch[1]}</strong>;
    }
    return part;
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! \uD83D\uDC4B I'm AIVA, your robot buddy at TechTales! Ask me anything about AI, Machine Learning, or Robotics!", sender: "bot" },
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
      <div className="chat-toggle-wrap">
        {!isOpen && <span className="chat-toggle-label">Ask me anything!</span>}
        <button
          className={`chat-toggle${isOpen ? " open" : ""}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? "\u2715" : <AivaAvatar size={40} />}
        </button>
      </div>

      {/* Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <AivaAvatar size={28} />
            <span>AIVA</span>
            <span className="chat-header-dot" />
          </div>

          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-row ${m.sender}`}>
                {m.sender === "bot" && (
                  <div className="bot-avatar"><AivaAvatar size={28} /></div>
                )}
                <div className="chat-bubble">
                  {m.sender === "bot" ? renderBotMessage(m.text) : m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-row bot">
                <div className="bot-avatar"><AivaAvatar size={28} /></div>
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
              placeholder="Type a message"
              disabled={loading}
            />
            <button className="chat-send-btn" onClick={send} disabled={loading}>
              {loading ? " " : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
