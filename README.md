# Modelia

**Modelia** — a modern desktop chatbot app built with Electron and Next.js. It's designed to be fast, friendly, and fun to use, with a bunch of cool features to make chatting with AI models a breeze.

## Features

- **Streaming bot responses**: Get answers in real time, with smooth typing animations.
- **File upload**: Easily send files to supported models (if your model can handle it).
- **Custom Windows-style title bar**: Sleek header with app controls and logo.
- **Sidebar navigation**: Quick access to chats, parameters, downloads, and more.
- **Modern UI**: Clean, responsive design with a focus on usability.
- **Stop button**: Pause bot responses anytime.
- **File management**: See uploaded files above the chat bar and delete before sending.
- **Responsive**: Works great on any screen size.

## How to Use

1. **Start the app**
   - Run `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`) to start the Next.js server.
   - Launch Electron to open the desktop app (usually via `npm run electron` or similar — check your scripts!).
2. **Pick a model**
   - Use the sidebar to select your AI model (powered by Ollama).
3. **Chat away!**
   - Type your message, hit send, and watch the bot respond in real time.
   - Upload files if your model supports it.
   - Use the stop button to pause responses if needed.
4. **Explore the UI**
   - Adjust parameters, download models, and more from the sidebar.

## Tech Stack

- **Electron**: Desktop shell for running web tech as native apps.
- **Next.js**: React-based framework for fast, modern UIs.
- **Tailwind CSS**: Utility-first styling for a clean look.
- **Ollama**: Local model backend (for AI chat).

## Want to Tweak Stuff?

- All the main UI lives in `src/app` and `src/components`.
- The Electron magic is in `electron/main.js` and `electron/preload.js`.
- Sidebar and chat logic are in `store/store.js` and related components.

## License

MIT — do whatever you want! If you add something nice, better tell me.

---

