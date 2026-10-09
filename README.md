# 🚀 GenZ Startup Namer (v2.0)

A modern, quirky, and responsive React + TypeScript web application that automatically generates viral GenZ startup names, taglines, branding concepts, and pitch decks using **OpenAI's APIs** (GPT-4o / GPT-4o-mini) and a **smart offline GenZ AI engine**.

---

## ✨ Features

- 🧠 **Multi-Vibe Presets**:
  - **Brainrot Slang** (Skibidi, Rizz, Gyatt, Main Character vibes)
  - **Demure & Mindful** (Aesthetic, minimalist, low-key luxury, clean lowercase)
  - **Unhinged Chaos** (Wild mashups, zero context, pure internet lore)
  - **Tech-Bro AI** (Short, vowel-less, `.ai` focused, Silicon Valley core)
  - **Cottagecore** (Organic, serene, sage, matcha, cozy)
  - **Web3 & DeFi** (DAO, yield, token, ape, moon)

- 🎚️ **Chaos & Brainrot Intensity Slider**:
  - Ranges from Level 1 (Safe & Professional 👔) to Level 5 (Total Unhinged Chaos ⚡).

- 🌐 **Domain Extension Matcher**:
  - Filter across popular modern TLDs (`.ai`, `.io`, `.xyz`, `.lol`, `.gg`, `.fr`, `.tech`, `.app`, or dynamic).
  - Simulated live domain availability status indicators.

- 🤖 **Dual-Engine Architecture**:
  - **OpenAI GPT-4o Integration**: Connect your OpenAI API key directly in the browser with custom model selection (`gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`). Keys are securely stored in local storage.
  - **Built-in Smart Fallback Engine**: Works instantly out of the box with zero setup or API keys required!

- 🎨 **Brand & Visual Logo Studio**:
  - Generates live logo mockups, dynamic brand color palettes, app icons, and badge styles.

- 📊 **GenZ VC Pitch Deck Generator**:
  - 4-slide instant elevator pitch cards: *The Problem 🤔*, *Our Solution 💡*, *Target Audience 🎯*, and *Business Model 💸*.

- 🔊 **Voice Pronunciation**:
  - Web Speech Synthesis integration to pronounce startup names out loud.

- 💖 **Favorites Drawer & Export**:
  - Save your favorite generated startups and export them anytime to structured JSON.

- 🎉 **Hype Celebration Effects**:
  - Interactive confetti animations, glowing neo-brutalist styling, and smooth responsive design.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Neon Glow Animations
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti
- **AI Integration**: OpenAI SDK (`openai`) + Local Deterministic Engine
- **Audio**: Web Speech Synthesis API

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd genz-startup-namer
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🔒 Privacy & API Key Handling
API keys entered in the application are stored only in your browser's `localStorage` and sent directly to OpenAI's endpoints over HTTPS. They are never shared or sent to any third-party backend.
