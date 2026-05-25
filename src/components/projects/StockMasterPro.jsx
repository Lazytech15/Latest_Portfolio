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
    'A full-stack inventory management system built for small-to-medium businesses — featuring real-time dashboards, barcode scanning, role-based access control, automated low-stock alerts, and purchase order generation.',

  overview: [
    'Inventory Control is a comprehensive inventory management platform built to solve real operational pain points for SMEs. The system handles everything from product creation and stock adjustments to purchase order workflows and executive-level reporting — all in one unified interface.',
    'The frontend is built with React + Vite and styled with TailwindCSS, communicating with a PHP REST API backed by MySQL. Authentication uses JWT tokens with role-scoped payloads, ensuring every API route and UI element enforces the correct permission level for Admin, Manager, and Staff users.',
    'The dashboard delivers real-time inventory visibility through chart-driven overviews powered by Recharts — including weekly stock movement, category value breakdowns, top products by value, and a priority reorder table. All data updates reactively across sessions without page reloads.',
    'Key operational features include barcode scanning for rapid stock intake, one-click purchase order generation pre-filled from low-stock alerts, CSV export for any inventory snapshot or movement log, and a full audit trail of every stock movement tied to the acting user.',
  ],

  tech: ['React Vite', 'PHP', 'MySQL', 'TailwindCSS'],

  // Used by ProjectPage in the portfolio App.jsx
  highlights: [
    'Barcode scanning for rapid stock intake via USB or camera reader',
    'Role-based access control — Admin, Manager, and Staff with scoped permissions',
    'Automated low-stock alerts with configurable per-product reorder thresholds',
    'One-click purchase order generation pre-filled from alert data',
    'Real-time analytics dashboard with Recharts — movement, category, and value charts',
    'Full stock movement audit trail tied to the acting user',
    'CSV export for inventory snapshots, movement logs, and reports',
    'JWT authentication with role-scoped tokens on every API route',
  ],

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
      icon: 'scan',
      title: 'Barcode Scanning',
      desc: 'Rapid stock intake via USB or camera-based barcode reader. Scan to auto-populate product fields and log a movement in under a second.',
    },
    {
      icon: 'shield-check',
      title: 'Role-Based Access',
      desc: 'Admin, Manager, and Staff roles each see only what they need. Permission guards enforced at both the UI layer and every API endpoint.',
    },
    {
      icon: 'bell-ringing',
      title: 'Low-Stock Alerts',
      desc: 'Automated threshold monitoring with in-app notifications. Alerts fire as soon as stock drops below configurable per-product reorder points.',
    },
    {
      icon: 'file-invoice',
      title: 'Purchase Orders',
      desc: 'One-click PO generation pre-filled from low-stock alerts. Supplier details and recommended quantities are automatically populated.',
    },
    {
      icon: 'chart-bar',
      title: 'Analytics Dashboard',
      desc: 'Real-time charts for weekly stock movement, top products by value, category breakdowns, and margin potential — all in one view.',
    },
    {
      icon: 'table-export',
      title: 'CSV Export',
      desc: 'Export any inventory snapshot, movement log, or report to CSV with a single click. Built for operations teams and accountants.',
    },
  ],

  buildTimeline: [
    {
      phase: 'Week 1–2',
      title: 'Architecture & Database Design',
      desc: 'Designed the relational schema covering products, categories, stock movements, purchase orders, suppliers, and users. Set up the PHP REST API skeleton with JWT-based authentication and role-scoped token payloads.',
    },
    {
      phase: 'Week 3–4',
      title: 'Core Inventory CRUD & Barcode Integration',
      desc: 'Built full product management — create, read, update, delete — with category and supplier linkage. Integrated barcode scanning via QuaggaJS and validated against 500+ real product SKUs across multiple formats.',
    },
    {
      phase: 'Week 5–6',
      title: 'Dashboard, Charts & Reporting',
      desc: 'Implemented the real-time dashboard with Recharts — bar charts, donut charts, and KPI cards. Built the reports module with date-range filtering, margin calculations, and one-click CSV export.',
    },
    {
      phase: 'Week 7–8',
      title: 'RBAC, Alerts & Purchase Orders',
      desc: 'Centralized role-based access control into a React context with a usePermission() hook. Built the automated low-stock alert engine and full purchase order workflow from creation through delivery and stock reconciliation.',
    },
    {
      phase: 'Week 9',
      title: 'Testing, QA & Deployment',
      desc: 'End-to-end testing across all three user roles. MySQL query profiling to hit sub-200ms API response times. Shipped to production with a small SME client managing over 2,800 active SKUs.',
      accent: true,
    },
  ],

  challenges: [
    {
      problem: 'Barcode scan events fired multiple times per physical scan, causing duplicate stock movement entries and inflated inventory counts.',
      solution: 'Implemented client-side debouncing with a 300ms cooldown window and a server-side idempotency check keyed on SKU + timestamp, making double-writes impossible.',
    },
    {
      problem: 'Permission checks were scattered across individual components, making it easy to accidentally expose restricted UI elements to lower-permission users as the codebase grew.',
      solution: 'Centralized all RBAC logic into a single React context with a usePermission() hook consumed app-wide, backed by server-side guards on every API route as a second layer of defence.',
    },
    {
      problem: 'Stock value calculations and alert thresholds became stale when multiple users made concurrent adjustments, leading to incorrect dashboard readings.',
      solution: 'Moved all derived state — alerts, totals, category breakdowns — into a single reducer that recomputes on every dispatch, guaranteeing the UI always reflects the true current state.',
    },
    {
      problem: 'Delivering purchase orders needed to update stock levels, log movements, and change PO status atomically — any partial failure would leave data inconsistent.',
      solution: 'Wrapped the entire delivery flow in a MySQL transaction on the API side, and mirrored the same atomic sequence in the frontend reducer so UI state only commits on confirmed success.',
    },
  ],
}

export default StockMasterPro