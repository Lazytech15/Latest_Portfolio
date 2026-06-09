import inventorycontrol from '../../../public/project/inventorycontrol.png'

const StockMasterPro = {
  number: '002',
  category: 'Web App',
  title: 'Inventory Control',
  status: 'Shipped',
  year: '2026',
  role: 'Full Stack Developer',
  image: inventorycontrol,

  description:
    'A fully client-side inventory management system built with React + Vite — featuring a responsive marketing landing page, modal-based authentication, real-time dashboards, role-based access control, automated low-stock alerts, and purchase order management. All state is managed in-browser with localStorage persistence, making it instantly deployable with zero backend dependencies.',

  overview: [
    'Inventory Control is a comprehensive inventory management platform built to solve real operational pain points for SMEs. The system handles everything from product creation and stock adjustments to purchase order workflows and executive-level reporting — all in one unified, fully client-side interface with no backend required.',
    'The app is built with React + Vite and styled with TailwindCSS. A custom useReducer-powered AppContext manages all application state — products, movements, purchase orders, alerts, and session — and persists everything to localStorage so data survives page reloads without a database.',
    'The entry point is a fully responsive marketing landing page featuring a sticky navbar, animated hero section with a live dashboard preview mockup, feature grid, SmartScan AI product spotlight, interactive monthly/annual pricing toggle across three subscription tiers, testimonials, FAQ accordion, and a full footer. Authentication is handled via a modal layered over the landing page rather than a separate route.',
    'The dashboard delivers real-time inventory visibility through chart-driven overviews powered by Recharts — including weekly stock movement bar charts, category value donut charts, top products by value, and a priority reorder table. All data updates reactively across the session via a single centralized reducer that recomputes derived state — alerts, totals, and breakdowns — on every dispatch.',
    'Key operational features include stock movement tracking with full inbound/outbound audit trails, one-click purchase order generation pre-filled from low-stock alerts, CSV-ready reporting, and a multi-user role system with Admin, Manager, and Staff permission scopes enforced at the UI layer.',
  ],

  tech: ['React Vite', 'TailwindCSS', 'Recharts', 'date-fns'],

  highlights: [
    'Responsive marketing landing page with animated hero, pricing toggle, and FAQ accordion',
    'Login modal layered over the landing page — no separate route or full-page redirect',
    'Role-based access control — Admin, Manager, and Staff with scoped UI permissions',
    'Automated low-stock alerts with configurable per-product reorder thresholds',
    'One-click purchase order generation pre-filled from alert data',
    'Real-time analytics dashboard with Recharts — movement, category, and value charts',
    'Full stock movement audit trail tied to the acting user',
    'localStorage persistence — full state survives page reloads with zero backend',
    'SmartScan AI feature concept: barcode detection UI with AI-suggested reorder quantities',
    'Monthly / annual pricing toggle with three subscription tiers',
  ],

  links: {
    github: 'https://github.com/Lazytech15/INVENTORYCONTROL',
    live: 'https://invetorycontrol.eablao.workers.dev/',
  },

  // ─── Mock Data for Live Demo ──────────────────────────────────────────────

  metrics: {
    totalSKUs: 2847,
    stockValue: '₱1.2M',
    lowStockAlerts: 38,
    ordersToday: 142,
    skuGrowth: '+12% this month',
    stockValueGrowth: '+8.4% vs last month',
    avgResponseMs: '<200ms',
    userRoles: 3,
  },

  weeklyMovement: [
    { day: 'Mon', inbound: 120, outbound: 85  },
    { day: 'Tue', inbound: 160, outbound: 110 },
    { day: 'Wed', inbound: 95,  outbound: 70  },
    { day: 'Thu', inbound: 210, outbound: 175 },
    { day: 'Fri', inbound: 145, outbound: 130 },
    { day: 'Sat', inbound: 185, outbound: 95  },
    { day: 'Sun', inbound: 240, outbound: 160 },
  ],

  categoryBreakdown: [
    { name: 'Electronics', value: 33, color: '#3a5aff' },
    { name: 'Apparel',     value: 25, color: '#ff6b4a' },
    { name: 'Home Goods',  value: 20, color: '#4ade80' },
    { name: 'Food & Bev',  value: 22, color: '#f8c94e' },
  ],

  lowStockItems: [
    { sku: 'EL-0042', name: 'USB-C Hub 7-Port',       qty: 4,  reorderAt: 20, supplier: 'TechSource PH',  status: 'critical' },
    { sku: 'AP-0187', name: 'Slim Jogger Pants (M)',   qty: 11, reorderAt: 25, supplier: 'FashionLink',    status: 'low'      },
    { sku: 'HG-0063', name: 'Ceramic Mug Set x6',     qty: 8,  reorderAt: 15, supplier: 'HomeBase Dist.', status: 'low'      },
    { sku: 'EL-0091', name: 'Wireless Earbuds Pro',   qty: 16, reorderAt: 30, supplier: 'TechSource PH',  status: 'ok'       },
    { sku: 'FB-0024', name: 'Premium Instant Coffee',  qty: 5,  reorderAt: 40, supplier: 'BrewLink Corp.', status: 'critical' },
    { sku: 'AP-0203', name: 'Classic Polo Shirt (L)',  qty: 19, reorderAt: 20, supplier: 'FashionLink',    status: 'low'      },
  ],

  features: [
    {
      icon: 'layout-dashboard',
      title: 'Landing Page & Pricing',
      desc: 'A fully responsive marketing landing page with animated hero, SmartScan AI feature spotlight, monthly/annual pricing toggle across three tiers, testimonials, and FAQ accordion — all before the user even logs in.',
    },
    {
      icon: 'lock',
      title: 'Modal Authentication',
      desc: 'Login is a modal layered over the landing page with backdrop blur and slide-up animation. Supports quick demo account fill for Admin, Manager, and Staff roles with a single click.',
    },
    {
      icon: 'shield-check',
      title: 'Role-Based Access',
      desc: 'Admin, Manager, and Staff roles each see only what they need. Permission guards are enforced at the UI layer via a centralized AppContext with a useReducer-driven state machine.',
    },
    {
      icon: 'bell-ringing',
      title: 'Low-Stock Alerts',
      desc: 'Automated threshold monitoring recomputed on every state dispatch. Alerts fire as soon as stock drops below configurable per-product reorder points and surface in the dashboard and sidebar.',
    },
    {
      icon: 'file-invoice',
      title: 'Purchase Orders',
      desc: 'One-click PO generation pre-filled from low-stock alert data. Full order lifecycle from draft through delivery, with stock levels and audit logs updated atomically on receipt.',
    },
    {
      icon: 'chart-bar',
      title: 'Analytics Dashboard',
      desc: 'Real-time Recharts visualizations — weekly movement bar charts, category value donut charts, top products by value, and KPI cards. All charts update reactively from the shared reducer state.',
    },
  ],

  buildTimeline: [
    {
      phase: 'Week 1',
      title: 'App Architecture & State Design',
      desc: 'Designed the client-side data model covering products, categories, stock movements, purchase orders, suppliers, and users. Built the AppContext with a useReducer state machine and localStorage persistence layer, plus seed data generation for 30 days of realistic movements.',
    },
    {
      phase: 'Week 2–3',
      title: 'Landing Page & Modal Auth',
      desc: 'Built the full responsive marketing landing page — sticky nav, animated hero with live dashboard preview mockup, feature grid, SmartScan AI spotlight, interactive pricing toggle, testimonials, and FAQ accordion. Implemented the login modal with backdrop blur, keyboard dismiss, and demo quick-fill buttons.',
    },
    {
      phase: 'Week 4–5',
      title: 'Core Inventory CRUD & Stock Movements',
      desc: 'Built full product management — create, read, update, delete — with category and supplier linkage. Implemented the inbound/outbound stock movement log with timestamps, user attribution, and notes. All movements dispatch atomically through the reducer.',
    },
    {
      phase: 'Week 6–7',
      title: 'Dashboard, Charts & Reporting',
      desc: 'Implemented the real-time dashboard with Recharts — bar charts, donut charts, and KPI cards with week-over-week movement data. Built the reports module with date-range filtering, margin calculations, and movement history views.',
    },
    {
      phase: 'Week 8',
      title: 'Alerts, Purchase Orders & RBAC',
      desc: 'Built the automated low-stock alert engine recomputing on every reducer dispatch. Implemented the full purchase order workflow — creation, status tracking, and atomic delivery reconciliation that updates stock and logs movements in a single dispatch. Finalized role-based UI permission scoping for Admin, Manager, and Staff.',
    },
    {
      phase: 'Week 9',
      title: 'Responsive Polish & Deployment',
      desc: 'Mobile-first responsive audit across all pages and the landing page. Tuned animations, scroll behaviour, and modal layering. Deployed as a zero-backend static app to Cloudflare Workers with full localStorage state persistence.',
      accent: true,
    },
  ],

  challenges: [
    {
      problem: 'The existing app CSS set body { overflow: hidden } and #root { height: 100% } globally — styles designed for the locked app shell were preventing the landing page from scrolling at all.',
      solution: 'Used a useEffect in LandingPage that overrides those properties to overflow: auto and height: auto on mount, then cleanly restores them on unmount when the user logs in and the app shell takes over.',
    },
    {
      problem: 'The login modal needed to sit on top of a fully scrollable landing page without breaking scroll lock — opening the modal should freeze the page, closing it should restore scroll.',
      solution: 'Added a second useEffect keyed on the showLogin state that toggles body overflow between hidden and auto, giving precise modal-aware scroll control independent of the landing page mount/unmount lifecycle.',
    },
    {
      problem: 'Stock value calculations, alert thresholds, and dashboard totals became stale when multiple state changes occurred in quick succession, leading to incorrect KPI readings.',
      solution: 'Moved all derived state — alerts, totals, and category breakdowns — into the central reducer so they recompute synchronously on every dispatch, guaranteeing the UI always reflects true current state.',
    },
    {
      problem: 'Delivering purchase orders needed to update stock levels, log movements, and change PO status atomically — any partial failure would leave data inconsistent.',
      solution: 'Mirrored an atomic sequence in the frontend reducer: the entire delivery flow — PO status update, per-item stock increments, and movement log entries — commits as a single state transition so the UI is never partially updated.',
    },
  ],
}

export default StockMasterPro