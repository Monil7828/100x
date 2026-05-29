import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! 👋 I'm Monil's AI assistant. You can ask about his GenAI system design, RAG architecture work, full-stack engineering projects, backend optimization, or real-time application builds. I’ll respond as he would — with a technical and systems-oriented perspective.",
      isWelcome: true

    }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (question) => {
  const q = question.toLowerCase().trim();

  // Specific questions FIRST

  if (
    (q.includes("coworkers") && q.includes("misconception")) ||
    q.includes("misconception")
  ) {
    return "My coworkers often assume I'm all about the code and competition, but the real misconception is that I'm only technical. In reality, I'm highly product-minded and spend a lot of time thinking about architecture, maintainability, user experience, and business impact. I enjoy understanding why we're building something, not just how.";
  }

  if (
    q.includes("life story") ||
    q.includes("tell me about yourself") ||
    q.includes("your background") ||
    q.includes("know about your life")
  ) {
    return "I'm Monil Chandgadhiya, a Computer Science student at IIT (ISM) Dhanbad. I specialize in production-grade AI and full-stack systems, with a focus on GenAI pipelines, robust backend architecture, and real-time apps. My engineering-first mindset emphasizes structured design, measurable performance, and clean, scalable code.";
  }

  if (q.includes("superpower") || q.includes("strength")) {
    return "My superpower is end-to-end system delivery. At AI2Go Solutions, I engineered a GenAI healthcare assistant with RAG and vector databases, slashing retrieval latency by 30% while boosting accuracy. I thrive on transforming ambitious ideas into reliable, high-performance products.";
  }

  if (q.includes("grow") || q.includes("improve") || q.includes("future")) {
    return "I'm honing multi-agent AI systems, LLM orchestration, and scalable inference engines. Distributed systems excite me most—crafting AI platforms that stay rock-solid under heavy, real-world loads.";
  }

  if (q.includes("boundary") || q.includes("limit") || q.includes("push")) {
    return "I stretch limits through ambitious projects like real-time multiplayer games with WebSockets, scalable Next.js/Node.js platforms, and tuned GenAI RAG systems that nail low-latency retrieval under scale.";
  }

  if (q.includes("ai") || q.includes("genai")) {
    return "In GenAI, I build structured pipelines beyond basic prompting—leveraging embeddings, vector search, RAG, and backend orchestration. I view LLMs as system components, grounded in domain data for precise, efficient responses.";
  }

  if (q.includes("project")) {
    return "Highlights: GenAI healthcare assistant (RAG-powered), real-time math competition game (React, Redux, Node.js, Socket.IO), and full-stack ecommerce platform (Next.js, MongoDB, Stripe). I blend scalability with seamless UX.";
  }

  if (q.includes("backend")) {
    return "Backend expertise centers on Node.js/Express: clean service layers, optimized queries, and scalable schemas with MongoDB, vector DBs, and secure auth. All built for production reliability.";
  }

  if (q.includes("frontend")) {
    return "Frontend: Responsive React/Next.js apps with sharp state management, perf tweaks, and intuitive designs that make complex systems feel effortless.";
  }

  if (q.includes("competitive") || q.includes("cp")) {
    return "Competitive programming sharpened my algorithmic edge—100+ LeetCode solves, 175+ on CodeChef. It fuels efficient, clever solutions in real-world systems.";
  }

  if (q.includes("hello") || q.includes("hi")) {
    return "Hey! I'm channeling Monil. Ask away on AI architecture, backend engineering, full-stack builds, or performance optimization.";
  }

  return "I tackle challenges via system design and performance-first thinking. From AI pipelines to full-stack apps, it's all about scalability, elegant architecture, and tangible results.";
};

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Get available voices and select a good one
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Google UK') || voice.name.includes('Samantha')
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate thinking time for better UX
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
      setIsTyping(false);
      speak(response);
    }, 1000);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge!");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSubmit(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      alert("Sorry, I couldn't hear you. Please try again or type your message.");
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <div className="header-content">
            <div className="header-text">
              <h1>Monil Chandgadhiya</h1>
              <p>IIT (ISM) Dhanbad | GenAI & Full Stack Developer</p>
            </div>
            <div className="status-container">
              <div className="status-dot"></div>
              <span className="status-text">Online</span>
            </div>
          </div>
        </div>

        <div className="chat" ref={chatRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.type} ${msg.isWelcome ? 'welcome-message' : ''} fade-in`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <input
              placeholder="Ask me anything about Monil..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  handleSubmit(input);
                }
              }}
            />
          </div>
          <button
            onClick={isRecording ? stopListening : startListening}
            className={`mic-btn ${isRecording ? 'recording' : ''}`}
            title={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isRecording ? "⏹️" : "🎤"}
          </button>
        </div>
      </div>
    </div>
  );
}