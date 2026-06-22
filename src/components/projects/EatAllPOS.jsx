import eatall from '../../../public/project/eatall.png'

const EatAllPOS = {
  number: '003',
  category: 'Desktop',
  title: 'Eat-All POS',
  status: 'In Progress',
  year: '2026',
  role: 'Solo Engineer',
  image: eatall,

  description:
    'Electron-based point-of-sale desktop app for food businesses with offline-capable workflows, inventory management, and real-time sales analytics.',

  overview: [
    'A cross-platform desktop POS system built with Electron and React. The renderer process handles a fast, touch-friendly cashier interface with product search, cart management, and order processing, while the main process manages SQLite persistence, IPC bridges, and native OS integration.',
    'Fully offline-capable — all data is stored locally via SQLite so the system keeps running without an internet connection. Supports VAT computation, discount handling, multiple payment methods, and automatic stock deduction on every completed order.',
    'Includes a dashboard with daily and weekly sales analytics, top-selling products, and low-stock alerts. The products and categories management panel lets staff add, edit, or remove items in real time without restarting the app.',
  ],

  highlights: [
    'Offline-first architecture with SQLite local storage',
    'Real-time cart with VAT, discount, and change computation',
    'Daily and weekly sales dashboard with top products',
    'Inventory management with low-stock alerts',
    'Category filtering and product search',
    'Animated splash screen on launch',
    'Frameless window with custom sidebar navigation',
    'IPC bridge between renderer and main process',
    'Cross-platform: Windows, macOS, Linux',
  ],

  tech: ['Electron', 'React', 'Vite', 'better-sqlite3', 'Zustand', 'CSS Modules', 'Node.js', 'IPC'],

  links: {
    github: 'https://github.com/Lazytech15/Eat_All_POS'
  },
}

export default EatAllPOS