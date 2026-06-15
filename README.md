# Study Buddy

Study Buddy is an AI-powered study companion that helps you learn through three different modes: explanations, quizzes, and flashcards. Built as a hands-on project to learn API integration, vanilla JavaScript, and deployment.

**Live demo:** https://sagogopinathcoex.github.io/study-buddy/

## Features

- **Explain** — ask about any topic and get a clear, step-by-step explanation with examples
- **Quiz me** — get quizzed one question at a time, with feedback on each answer
- **Flashcards** — generate a study set of flashcards on any topic

## How it works

The app is built with plain HTML, CSS, and JavaScript (no frameworks). It sends your messages to the Groq API, which runs a large language model, and displays the responses in a chat interface styled like a notebook page.

Each mode uses a different "system prompt" to shape how the AI responds — for example, quiz mode asks one question at a time and checks your answer, while flashcard mode generates a structured list.

## Getting your own API key

On first visit, the app will ask for a Groq API key. Groq offers a free tier:

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up and create an API key
3. Paste it into the prompt when the app asks

Your key is stored only in your browser (using `localStorage`) and is never sent anywhere except directly to Groq's API.

## Tech stack

- HTML, CSS, JavaScript (no frameworks or build tools)
- [Groq API](https://groq.com) (Llama 3.3 70B model)
- Hosted with GitHub Pages

## Running it locally

1. Clone this repo
2. Open `index.html` in your browser
3. Enter your Groq API key when prompted

## What I learned

- Calling an external API and handling async requests
- Managing conversation state and rendering dynamic UI with vanilla JS
- Designing a UI from scratch (notebook/legal-pad theme)
- Handling API keys securely in a client-side app
- Deploying a static site with GitHub Pages

---

Built by Sago gopinath
