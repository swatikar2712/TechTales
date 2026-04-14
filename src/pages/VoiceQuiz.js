import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { courses } from "../data/courses";
import voiceQuizData from "../data/voiceQuizData";
import "./VoiceQuiz.css";

/* ── Gemini setup for semantic answer checking ── */
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/* ── Microphone SVG Icon ── */
const MicIcon = ({ active }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={active ? "#e74c3c" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="1" width="6" height="12" rx="3" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

/* ── Speaker SVG Icon ── */
const SpeakerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

/* ── Fuzzy local matching (fast fallback) ── */
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Word-level synonyms for common tech terms kids might say */
const SYNONYMS = {
  intelligence: ["mind", "thinking", "thought", "brain", "brains", "intellect", "smarts"],
  mind: ["intelligence", "thinking", "brain", "intellect"],
  brain: ["mind", "intelligence", "thinking"],
  automation: ["automating", "automate", "automatic"],
  data: ["information", "info"],
  sensor: ["sensors", "detector", "detectors"],
  robot: ["robots", "bot", "bots"],
  program: ["programming", "code", "coding"],
  artificial: ["ai"],
};

function getWordVariants(word) {
  const variants = new Set([word]);
  if (SYNONYMS[word]) SYNONYMS[word].forEach((s) => variants.add(s));
  // Also check if this word is listed as a synonym of another word
  for (const [key, syns] of Object.entries(SYNONYMS)) {
    if (syns.includes(word)) variants.add(key);
  }
  return variants;
}

function checkAnswerLocal(spoken, acceptedAnswers) {
  const norm = normalizeText(spoken);
  if (!norm) return false;

  // 1. Direct substring match (existing logic)
  const directMatch = acceptedAnswers.some((ans) => {
    const normAns = normalizeText(ans);
    return norm.includes(normAns) || normAns.includes(norm);
  });
  if (directMatch) return true;

  // 2. Word-level matching with synonyms
  const spokenWords = norm.split(" ");
  return acceptedAnswers.some((ans) => {
    const ansWords = normalizeText(ans).split(" ");
    // Count how many answer words are matched (directly or via synonym)
    let matched = 0;
    for (const aw of ansWords) {
      const variants = getWordVariants(aw);
      if (spokenWords.some((sw) => variants.has(sw) || getWordVariants(sw).has(aw))) {
        matched++;
      }
    }
    // Accept if most key words match (>= 50% for single words, >= 60% for multi-word)
    const threshold = ansWords.length === 1 ? 1 : Math.ceil(ansWords.length * 0.6);
    return matched >= threshold;
  });
}

/* ── Semantic check via Gemini ── */
async function checkAnswerSemantic(question, spoken, acceptedAnswers) {
  // Quick local check first — skip API call if obviously correct
  if (checkAnswerLocal(spoken, acceptedAnswers)) return true;

  // Only call Gemini if API key is available
  if (!process.env.REACT_APP_GEMINI_API_KEY) {
    return false;
  }

  try {
    const prompt = `You are a quiz answer evaluator for a kids' tech education app. A student was asked a question and gave a spoken answer. Determine if their answer is correct or essentially correct (same meaning, even if worded differently).

Question: "${question}"
Expected answer(s): ${acceptedAnswers.map(a => `"${a}"`).join(", ")}
Student's spoken answer: "${spoken}"

Rules:
- Accept synonyms, paraphrases, and partial answers that demonstrate understanding
- Accept informal or simplified versions of the correct answer
- Be generous with kids — if the core idea is right, accept it
- Only reject answers that are clearly wrong or unrelated

Respond with ONLY one word: CORRECT or WRONG`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();
    return text.includes("CORRECT");
  } catch (err) {
    console.error("Gemini semantic check failed:", err);
    return false;
  }
}

/* ── Landing Page (no params) ── */
function VoiceQuizLanding() {
  const navigate = useNavigate();

  const worlds = [
    { key: "ai", label: "AI World", emoji: "🤖", color: "#FFE082" },
    { key: "ml", label: "ML World", emoji: "🧠", color: "#C4A8D8" },
    { key: "robotics", label: "Robotics", emoji: "⚙️", color: "#E5B84C" },
  ];

  return (
    <div className="vq-landing">
      <div className="vq-hero">
        <div className="vq-hero-icon">🎤</div>
        <h1>Test Your Knowledge</h1>
        <p>Listen to questions and answer with your voice!</p>
      </div>

      <div className="vq-worlds">
        {worlds.map((w) => {
          const course = courses.find((c) => c.class === w.key);
          const lessons = voiceQuizData[w.key] || [];
          return (
            <div key={w.key} className="vq-world-card" style={{ borderColor: w.color }}>
              <div className="vq-world-emoji">{w.emoji}</div>
              <h2>{w.label}</h2>
              <ul className="vq-lesson-list">
                {lessons.map((lesson) => {
                  const mod = course?.modules.find((m) => m.id === lesson.lessonId);
                  return (
                    <li key={lesson.lessonId}>
                      <button
                        className="vq-lesson-btn"
                        onClick={() => navigate(`/voice-quiz/${w.key}/${lesson.lessonId}`)}
                      >
                        <span className="vq-lesson-num">Lesson {lesson.lessonId}</span>
                        <span className="vq-lesson-title">{mod?.title || lesson.lessonTitle}</span>
                        <span className="vq-arrow">→</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Active Quiz Session ── */
function VoiceQuizSession() {
  const { world, topicId } = useParams();
  const lessonData = voiceQuizData[world]?.find((l) => l.lessonId === parseInt(topicId));
  const course = courses.find((c) => c.class === world);
  const moduleName = course?.modules.find((m) => m.id === parseInt(topicId))?.title;

  const [qIndex, setQIndex] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | listening | evaluating | correct | wrong
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [browserSupport, setBrowserSupport] = useState(true);
  const recognitionRef = useRef(null);

  const questions = lessonData?.questions || [];
  const current = questions[qIndex];

  /* Check browser support */
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || !window.speechSynthesis) {
      setBrowserSupport(false);
    }
  }, []);

  /* Text-to-Speech: read question aloud */
  const speakQuestion = useCallback((text) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.1;
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  }, []);

  /* Auto-speak each new question */
  useEffect(() => {
    if (current && !finished) {
      const timeout = setTimeout(() => {
        speakQuestion(current.question);
      }, 600);
      return () => {
        clearTimeout(timeout);
        window.speechSynthesis.cancel();
      };
    }
  }, [qIndex, current, finished, speakQuestion]);

  /* Cleanup recognition on unmount */
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    window.speechSynthesis.cancel();
    setTranscript("");
    setStatus("listening");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognitionRef.current = recognition;

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      setStatus("evaluating");

      const isCorrect = await checkAnswerSemantic(current.question, spoken, current.answers);

      if (isCorrect) {
        setStatus("correct");
        setScore((s) => s + 1);
        speakQuestion("Correct!");
      } else {
        setStatus("wrong");
        speakQuestion(`The answer is: ${current.answers[0]}`);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        setStatus("idle");
        setTranscript("No speech detected. Try again!");
      } else if (event.error !== "aborted") {
        setStatus("idle");
        setTranscript("Could not recognize. Try again!");
      }
    };

    recognition.onend = () => {
      // noop — status already set in onresult/onerror
    };

    recognition.start();
  };

  const nextQuestion = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setStatus("idle");
      setTranscript("");
    } else {
      setFinished(true);
      setStatus("idle");
    }
  };

  if (!lessonData) {
    return (
      <div className="vq-not-found">
        <h2>Quiz not found</h2>
        <Link to="/voice-quiz" className="tt-btn tt-btn-accent">Back to Voice Quiz</Link>
      </div>
    );
  }

  if (!browserSupport) {
    return (
      <div className="vq-not-found">
        <h2>Browser Not Supported</h2>
        <p>Voice quiz requires a browser with Speech Recognition support (Chrome, Edge).</p>
        <Link to="/voice-quiz" className="tt-btn tt-btn-accent">Back</Link>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="vq-session">
        <div className="vq-complete">
          <div className="vq-complete-icon">🎉</div>
          <h2>Quiz Complete!</h2>
          <p className="vq-score-display">
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct!
          </p>
          <div className="vq-complete-bar-wrap">
            <div
              className="vq-complete-bar"
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>
          <p className="vq-complete-msg">
            {score === questions.length
              ? "Perfect score! Amazing! 🌟"
              : score >= questions.length * 0.6
              ? "Great job! Keep learning! 👏"
              : "Keep practicing, you'll get better! 💪"}
          </p>
          <div className="vq-complete-actions">
            <button className="tt-btn tt-btn-accent" onClick={() => { setQIndex(0); setScore(0); setFinished(false); setTranscript(""); setStatus("idle"); }}>
              Try Again
            </button>
            <Link to="/voice-quiz" className="tt-btn tt-btn-ghost">All Quizzes</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vq-session">
      <div className="vq-session-header">
        <Link to="/voice-quiz" className="vq-back-link">← All Quizzes</Link>
        <h2>{moduleName || lessonData.lessonTitle}</h2>
        <div className="vq-progress-text">Question {qIndex + 1} of {questions.length}</div>
      </div>

      <div className="vq-progress-bar-wrap">
        <div className="vq-progress-bar" style={{ width: `${((qIndex) / questions.length) * 100}%` }} />
      </div>

      <div className="vq-question-card">
        <div className="vq-question-text">{current.question}</div>

        <button className="vq-speak-btn" onClick={() => speakQuestion(current.question)} title="Listen again">
          <SpeakerIcon /> Listen Again
        </button>

        <div className="vq-mic-area">
          {status === "listening" ? (
            <div className="vq-mic-active">
              <div className="vq-mic-pulse" />
              <MicIcon active />
              <div className="vq-listening-text">Listening...</div>
            </div>
          ) : status === "evaluating" ? (
            <div className="vq-mic-active">
              <div className="vq-evaluating-spinner" />
              <div className="vq-listening-text">Checking your answer...</div>
            </div>
          ) : (
            <button
              className={`vq-mic-btn ${status}`}
              onClick={startListening}
              disabled={status === "correct" || status === "wrong"}
            >
              <MicIcon active={false} />
              <span>Tap to Answer</span>
            </button>
          )}
        </div>

        {transcript && (
          <div className="vq-transcript">
            You said: <em>"{transcript}"</em>
          </div>
        )}

        {status === "correct" && (
          <div className="vq-feedback vq-correct">
            <span className="vq-feedback-icon">✅</span> Correct!
          </div>
        )}

        {status === "wrong" && (
          <div className="vq-feedback vq-wrong">
            <span className="vq-feedback-icon">❌</span> The answer is: <strong>{current.answers[0]}</strong>
          </div>
        )}

        {(status === "correct" || status === "wrong") && (
          <button className="tt-btn tt-btn-accent vq-next-btn" onClick={nextQuestion}>
            {qIndex < questions.length - 1 ? "Next Question →" : "See Results →"}
          </button>
        )}
      </div>

      <div className="vq-score-bar">
        Score: {score} / {questions.length}
      </div>
    </div>
  );
}

/* ── Main Router Component ── */
function VoiceQuiz() {
  const { world, topicId } = useParams();
  if (world && topicId) return <VoiceQuizSession />;
  return <VoiceQuizLanding />;
}

export default VoiceQuiz;
