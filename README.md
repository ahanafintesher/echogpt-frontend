# EchoGPT — AI Workspace

A modern, responsive AI workspace interface built with **Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion**.

EchoGPT is designed as a unified AI workspace where users can explore AI models, start conversations, discover AI tools, and access an AI-powered browser extension experience through a clean and interactive interface.

## ✨ Highlights

* Modern AI workspace UI
* Fully responsive design
* Colorful gradient-based visual system
* Interactive AI model selectors
* Chat workspace with sidebar navigation
* Animated landing page
* AI model showcase
* Product preview section
* Pricing and FAQ sections
* Chrome extension experience
* Interactive 404 Not Found page
* Dark/light mode friendly UI
* Reusable React components
* shadcn/ui based interface components
* Framer Motion animations

## 🚀 Features

### 💬 AI Chat Workspace

* Dedicated chat interface
* New chat functionality
* Recent conversations
* AI model selection
* Message composer
* File/image attachment actions
* Web search toggle
* Typing/generation states
* Chat suggestions
* Responsive sidebar navigation

### 🧠 AI Models

The interface provides multiple model options for different use cases:

* GPT-5.6 — Advanced & balanced
* GPT-5.6 Fast — Fast responses
* Claude — Thoughtful & capable
* Gemini — Multimodal AI

### 🌐 AI Browser Extension UI

The project also includes a dedicated extension experience featuring:

* AI prompt interface
* Model selection
* Conversation history
* Quick actions
* Web-aware AI mode
* Code mode
* Creative mode
* Deep Thinking mode
* Settings interface
* Dark/light mode support

### 🎨 Landing Page

The landing experience includes:

* Hero section
* Features
* AI Models
* Why EchoGPT
* Extension Showcase
* Product Preview
* Pricing
* FAQ
* Call-to-action
* Footer

### 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

## 🛠️ Tech Stack

| Technology         | Usage                                 |
| ------------------ | ------------------------------------- |
| **Next.js 16**     | React framework & application routing |
| **React 19**       | UI development                        |
| **TypeScript**     | Type-safe development                 |
| **Tailwind CSS 4** | Styling & responsive design           |
| **shadcn/ui**      | Reusable UI components                |
| **Radix UI**       | Accessible component primitives       |
| **Framer Motion**  | Animations & transitions              |
| **Lucide React**   | Interface icons                       |

## 📂 Project Structure

```text
echogpt-frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   ├── extensions/
│   │   │   ├── landing/
│   │   │   └── navbar/
│   │   │
│   │   ├── components/ui/
│   │   │
│   │   ├── extension/
│   │   │
│   │   ├── pricing/
│   │   │
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   └── lib/
│
├── components.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## 🎯 Main Pages & Experiences

### Landing Page

The main landing page brings together the complete EchoGPT marketing experience:

```text
Navbar
   ↓
Hero
   ↓
Features
   ↓
AI Models
   ↓
Why EchoGPT
   ↓
Extension Showcase
   ↓
Product Preview
   ↓
Pricing
   ↓
FAQ
   ↓
CTA
   ↓
Footer
```

### Chat Workspace

The chat experience focuses on a clean AI-first workflow:

```text
Sidebar
   ├── Explore
   ├── AI Tools
   ├── Image Studio
   ├── Connectors
   └── Recent Chats

Chat Area
   ├── Header
   ├── Messages
   ├── Suggestions
   └── Message Input
```

### Extension Experience

The extension interface recreates a compact AI assistant workflow:

```text
Extension Navigation
        ↓
Prompt Input
        ↓
AI Model Selection
        ↓
Quick Actions
        ↓
Conversation History
        ↓
Settings
```

## 🎨 Design System

The UI follows a modern AI-product visual language with:

* Soft gradients
* Rounded cards
* Glass-like surfaces
* Subtle shadows
* Smooth hover interactions
* Motion-based transitions
* Responsive layouts
* Consistent spacing
* Accessible interactive elements

The visual system uses gradients around **violet, indigo, fuchsia, cyan, emerald, and related tones** to create a more distinctive AI workspace experience.

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ahanafintesher/echogpt-frontend.git
```

### 2. Navigate to the project

```bash
cd echogpt-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📦 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

## 🌍 Deployment

The project is deployment-ready for platforms such as **Vercel**.

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

## 🔗 Project Links

**Repository**

https://github.com/ahanafintesher/echogpt-frontend

**Live Demo**

https://echogpt-frontend-ldxtumgmc-ahanafah-projects.vercel.app/

**Original EchoGPT**

https://echogpt.live/

## 🧩 Development Approach

The project focuses on building the interface with reusable and maintainable components rather than placing large amounts of UI logic inside individual pages.

Key principles include:

* Component-based architecture
* Reusable UI primitives
* Type-safe React components
* Responsive-first implementation
* Accessible interactive elements
* Consistent design patterns
* Clean separation between page sections
* Reusable animation patterns

## 📌 Assignment Context

This project was developed as a frontend implementation for a **Software Engineering Internship (Frontend)** practical assignment.

The objective was to redesign the EchoGPT ecosystem with an improved:

* UI/UX
* Responsive experience
* Chat interface
* AI model selection
* Landing page
* Browser extension interface
* Component architecture
* Visual consistency

The implementation focuses on creating a polished frontend experience while keeping the codebase modular and maintainable.

## 👨‍💻 Author

### Ahanaf Intesher

Computer Science & Technology developer focused on building modern web applications using React, Next.js, Node.js, and TypeScript.

**GitHub:**
https://github.com/ahanafintesher

**LinkedIn:**
https://www.linkedin.com/in/ahanafintesher/

**Portfolio:**
https://portfolio-eight-black-76g2a6w3zj.vercel.app/

---

⭐ If you find this project interesting, feel free to explore the repository and the live demo.
