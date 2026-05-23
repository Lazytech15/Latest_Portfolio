const StockMasterPro = {
  number: '002',
  category: 'Web App',
  title: 'StockMaster Pro',
  status: 'Shipped',
  year: '2024',
  role: 'Full Stack Developer',
  image: null,

  description:
    'Full-stack inventory management system for small-to-medium businesses.',

  overview: [
    'A comprehensive inventory management platform built for SMEs. Features barcode scanning for rapid stock intake, automated low-stock alerts, purchase order generation, and detailed sales reports.',
    'Role-based access control allows admins, managers, and staff to have different permissions. Built on PHP + MySQL with a React Vite frontend.',
    'The dashboard provides real-time inventory visibility with chart-driven overviews of stock movement, top-selling items, and reorder recommendations.',
  ],

  highlights: [
    'Barcode scanning for rapid stock intake',
    'Role-based access control (admin, manager, staff)',
    'Automated low-stock alerts',
    'Purchase order generation',
    'Sales reporting with chart dashboards',
    'CSV data export',
  ],

  tech: ['React Vite', 'PHP', 'MySQL', 'TailwindCSS'],

  links: {
    github: 'https://github.com',
    live: null,
  },

  // ─── Mock Data for Live Demo ──────────────────────────────────────────────

  metrics: {
    totalSKUs: 2847,
    stockValue: '₱1.2M',
    lowStockAlerts: 38,
    ordersToday: 142,
    skuGrowth: '+12%',
    stockValueGrowth: '+8.4%',
    avgResponseMs: '<200ms',
    userRoles: 3,
  },

  weeklyMovement: [
    { day: 'Mon', inbound: 120, outbound: 85 },
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
    { sku: 'EL-0042', name: 'USB-C Hub 7-Port',      qty: 4,  reorderAt: 20, supplier: 'TechSource PH',   status: 'critical' },
    { sku: 'AP-0187', name: 'Slim Jogger Pants (M)',  qty: 11, reorderAt: 25, supplier: 'FashionLink',     status: 'low'      },
    { sku: 'HG-0063', name: 'Ceramic Mug Set x6',    qty: 8,  reorderAt: 15, supplier: 'HomeBase Dist.',  status: 'low'      },
    { sku: 'EL-0091', name: 'Wireless Earbuds Pro',  qty: 16, reorderAt: 30, supplier: 'TechSource PH',   status: 'ok'       },
    { sku: 'FB-0024', name: 'Premium Instant Coffee', qty: 5,  reorderAt: 40, supplier: 'BrewLink Corp.',  status: 'critical' },
    { sku: 'AP-0203', name: 'Classic Polo Shirt (L)', qty: 19, reorderAt: 20, supplier: 'FashionLink',     status: 'low'      },
  ],

  buildTimeline: [
    {
      phase: 'Week 1–2',
      title: 'Architecture & Database Design',
      desc: 'Designed the relational schema for products, categories, stock movements, purchase orders, and users. Set up PHP REST API with JWT-based authentication.',
    },
    {
      phase: 'Week 3–4',
      title: 'Core Inventory CRUD & Barcode Integration',
      desc: 'Built the product management system and integrated barcode scanning via the QuaggaJS library. Tested against 500+ real product SKUs.',
    },
    {
      phase: 'Week 5–6',
      title: 'Dashboard, Charts & Reporting',
      desc: 'Implemented real-time dashboard with Recharts. Built the sales reporting module with CSV export and date-range filtering.',
    },
    {
      phase: 'Week 7–8',
      title: 'RBAC, Alerts & PO Generation',
      desc: 'Wired up role-based access control across all routes. Built the automated alert system and purchase order PDF generation.',
    },
    {
      phase: 'Week 9',
      title: 'Testing, QA & Launch',
      desc: 'End-to-end testing across all user roles. Performance profiling on MySQL queries. Shipped to production with a small SME client.',
      accent: true,
    },
  ],

  challenges: [
    {
      problem: 'Barcode scan events firing multiple times per scan caused duplicate stock entries in the database.',
      solution: 'Implemented client-side debouncing with a 300ms cooldown plus a server-side idempotency check on the SKU + timestamp combination.',
    },
    {
      problem: 'Role permission checks were scattered across components, making it easy to accidentally expose restricted UI to lower-permission users.',
      solution: 'Centralized RBAC into a single React context with a usePermission() hook, plus server-side guards on every API endpoint.',
    },
  ],

  features: [
    {
      icon: 'scan',
      title: 'Barcode Scanning',
      desc: 'Rapid stock intake via USB or camera-based barcode reader. Scan → auto-populate product fields in under a second.',
    },
    {
      icon: 'shield-check',
      title: 'Role-Based Access',
      desc: 'Admins, managers, and staff each see only what they need. Permission guards at both UI and API level.',
    },
    {
      icon: 'bell-ringing',
      title: 'Low-Stock Alerts',
      desc: 'Automated threshold monitoring. Email and in-app notifications trigger when stock drops below configurable reorder points.',
    },
    {
      icon: 'file-invoice',
      title: 'Purchase Orders',
      desc: 'One-click PO generation from low-stock items. Auto-filled with supplier details and recommended quantities.',
    },
    {
      icon: 'chart-bar',
      title: 'Sales Reports',
      desc: 'Chart-driven dashboards showing stock movement, top sellers, category breakdowns, and reorder recommendations.',
    },
    {
      icon: 'table-export',
      title: 'CSV Export',
      desc: 'Export any report or inventory snapshot to CSV. Designed for accountants and operations teams who live in spreadsheets.',
    },
  ],
}

export default StockMasterPro