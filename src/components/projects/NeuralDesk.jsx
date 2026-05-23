const NeuralDesk = {
  number: '003',
  category: 'Desktop',
  title: 'NeuralDesk',
  status: 'In Progress',
  year: '2025',
  role: 'Solo Engineer',
  image: null,

  description:
    'Electron-based desktop AI assistant with system tray and offline-capable workflows.',

  overview: [
    'A cross-platform desktop app built with Electron and React. The renderer process handles a clean AI chat interface, while the main process manages file watchers, system tray integration, and IPC bridges to native OS APIs.',
    'Supports custom keyboard shortcuts, hot-key triggers, and SQLite local storage so it works completely offline.',
    'The app includes a plugin architecture that allows community-built extensions to add new command types and data sources.',
  ],

  highlights: [
    'System tray integration with hotkey triggers',
    'IPC bridge between renderer and main process',
    'File watcher for context-aware suggestions',
    'SQLite local storage for offline capability',
    'Plugin architecture for extensibility',
    'Cross-platform: Windows, macOS, Linux',
  ],

  tech: ['Electron', 'React', 'Node.js', 'IPC', 'SQLite'],

  links: {
    github: 'https://github.com',
    live: null,
  },
}

export default NeuralDesk