// Replace this with your actual Groq API key
function getApiKey() {
  let key = localStorage.getItem("groq_api_key");
  if (!key) {
    key = prompt("Enter your free Groq API key (get one at console.groq.com):");
    if (key) localStorage.setItem("groq_api_key", key.trim());
  }
  return key;
}

const GROQ_API_KEY = getApiKey();

const MODES = {
  explain: {
    system: "You are Study Buddy, a warm and patient tutor. Break concepts down step by step, use concrete examples and analogies, and keep explanations focused. End with a quick check-in question.",
    placeholder: "Ask me to explain anything - photosynthesis, calculus, the French Revolution..."
  },
  quiz: {
    system: "You are Study Buddy in quiz mode. When given a topic, ask one question at a time. Wait for the answer, say whether it's right, briefly explain the correct answer, then ask the next question.",
    placeholder: "Tell me a topic and I'll start quizzing you..."
  },
  flashcards: {
    system: "You are Study Buddy in flashcard mode. When given a topic, produce a short numbered list of flashcards, each as 'Term: definition'. If asked to be quizzed on them, ask one at a time.",
    placeholder: "Give me a topic and I'll build flashcards for it..."
  }
};

let currentMode = "explain";
let messages = [];

const chat = document.getElementById("chat");
const emptyState = document.getElementById("emptyState");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentMode = tab.dataset.mode;
    userInput.placeholder = MODES[currentMode].placeholder;
  });
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  messages.push({ role: "user", content: text });
  userInput.value = "";
  sendBtn.disabled = true;

  const thinkingEl = addMessage("bot", "thinking it through...", true);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: MODES[currentMode].system },
          ...messages
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    thinkingEl.remove();
    addMessage("bot", reply);
    messages.push({ role: "assistant", content: reply });
  } catch (err) {
    thinkingEl.remove();
    addMessage("bot", "Oops, something went wrong. Try again?");
  } finally {
    sendBtn.disabled = false;
  }
}

function addMessage(role, text, isThinking) {
  emptyState.style.display = "none";

  const msgDiv = document.createElement("div");
  msgDiv.className = "msg " + role;

  const bubble = document.createElement("div");
  bubble.className = "bubble " + role;

  if (role === "bot") {
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = "Study Buddy";
    bubble.appendChild(label);
  }

  const content = document.createElement("span");
  if (isThinking) content.className = "thinking";
  content.textContent = text;
  bubble.appendChild(content);

  msgDiv.appendChild(bubble);
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;

  return msgDiv;
}