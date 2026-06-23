import erjsmartsolution from '../../../public/project/smartsolutions/erjsmartsolution.png'
import erjsmartsolution2 from '../../../public/project/smartsolutions/erjsmartsolution2.png'
import erjsmartsolution3 from '../../../public/project/smartsolutions/erjsmartsolution3.png'

const ERJSmartSolution = {
  number: '005',
  category: 'SaaS / HR Tech',
  title: 'ERJ Smart Solutions',
  status: 'In Progress',
  year: '2026',
  role: 'Creator & Developer',
    images: [erjsmartsolution, erjsmartsolution2, erjsmartsolution3],

  description:
    'A subscription-based online attendance management system for Philippine SMEs and enterprises — covering employee management, shift scheduling, leave tracking, and real-time clock-in/out across web and mobile.',

  overview: [
    'ERJ Smart Solutions is a full-stack SaaS platform that lets businesses manage their entire workforce lifecycle from a single dashboard. Companies register, pick a subscription plan, and onboard their team in minutes — no hardware required to get started.',
    'The web dashboard (React + Vite) and companion mobile app (React Native / Expo) are both backed by Supabase, which handles authentication, a PostgreSQL database with Row-Level Security, and real-time data sync between devices.',
    'Subscription tiers — Free Trial, Starter (₱150/seat/mo), Growth (₱250/seat/mo), and Enterprise (₱400/seat/mo) — gate features progressively. Higher plans unlock shift management with QR-based clock-in and GPS support, department management, analytics & reports, SMS notifications, API access, and more.',
  ],

  highlights: [
    'Multi-tenant SaaS with per-company Supabase RLS isolation',
    'Role-based access: superadmin, admin, HR, manager, employee',
    'Company self-registration with plan selection and card-based billing setup',
    'Guided onboarding — bulk CSV employee import with template download',
    'Employee self-registration via invite link (email-based auth)',
    'Web clock-in / clock-out with live attendance records',
    'Mobile app clock-in with GPS tracking and QR shift scan (Starter+)',
    'Shift management with onsite/remote mode and QR payload generation',
    'Leave management — requests, approvals, and balance tracking',
    'Department management with auto-sync from employee records',
    'Analytics dashboard with 14-day attendance bar chart and stats cards',
    'Reports page with CSV export',
    'Superadmin panel — manage all company subscriptions and accounts platform-wide',
    'Plan gating via PlanGate component and SubscriptionContext across routes',
    'In-memory 60s read cache with targeted invalidation on writes',
    'ABAC (Attribute-Based Access Control) layer for fine-grained permissions',
    'Dual Supabase client pattern — prevents admin session overwrite on employee signUp()',
    'Toast notification system and animated transition loading screen',
  ],

  tech: [
    // Frontend — Web
    'React 18',
    'Vite',
    'React Router v6',
    'Tailwind CSS',
    'Framer Motion',
    'Recharts',
    'Lucide React',
    'Zustand',
    'date-fns',
    'Axios',
    // Frontend — Mobile
    'React Native',
    'Expo',
    // Backend / Platform
    'Supabase (Auth, PostgreSQL, RLS)',
    'Supabase Row-Level Security',
  ],

  architecture: {
    frontend_web: 'React + Vite SPA with React Router v6. Context-based state (Auth, Subscription, Toast, Notifications). Protected routes split by auth state, role, and active plan. AppLayout wraps all authenticated pages with a persistent sidebar and header.',
    frontend_mobile: 'React Native (Expo) companion app sharing the same Supabase backend. Covers clock-in/out, leave requests, shift QR scanning, attendance history, and profile — all behind the same email-based Supabase auth.',
    backend: 'Supabase project providing Auth (email/password), PostgreSQL with per-company RLS policies, and real-time subscriptions. Tables include: accounts, subscriptions, employees, attendance_records, leave_requests, shifts, departments, and pending_registrations.',
    subscription_engine: 'SubscriptionContext loads and caches the active company subscription on login and polls every 15 seconds for live sync. PLANS array defines per-tier seat limits and feature flags. PlanGate component wraps locked routes/features.',
    auth_flow: 'Supabase signInWithPassword with email as the identifier. On signup, a separate no-session Supabase client (persistSession: false) creates employee Auth accounts without overwriting the admin session. Profiles stored in the accounts table with role, employee_id, and subscription_id.',
    superadmin: 'Isolated SuperAdminRoute and SuperAdminLayout outside SubscriptionProvider. Superadmin and sub_superadmin roles can view all company subscriptions, manage accounts, reset passwords, adjust roles, and view platform-wide stats.',
  },

  pages: [
    'LandingPage — public marketing page',
    'PricingPage — plan comparison (Free Trial / Starter / Growth / Enterprise)',
    'SignupPage — multi-step company registration: company details → plan selection → card info → admin account creation',
    'OnboardingPage — post-signup employee bulk import via CSV or manual entry',
    'EmployeeRegisterPage — public invite link for employees to create their own account',
    'LoginPage — email + password login',
    'DashboardPage — role-split: AdminDashboard and EmployeeDashboard with stats, chart, and recent records',
    'AttendancePage — clock-in/clock-out, live records table, admin can view/edit all employees',
    'EmployeesPage — employee list with role/department filters, add/edit/deactivate actions',
    'LeavePage — leave request form, approval workflow, balance summary',
    'ShiftsPage — shift creation with onsite/remote mode and QR payload; gated to Starter+',
    'DepartmentsPage — department CRUD synced with employee records; gated to Growth+',
    'ReportsPage — attendance reports with filters and CSV export; gated to Growth+',
    'SubscriptionPage — plan overview, usage stats, upgrade/cancel actions; admin only',
    'SettingsPage — company settings and preferences; admin only',
    'SuperAdminPage — platform owner panel: subscriptions tab + accounts tab',
  ],

  links: {
    // github: 'https://github.com',
    live: 'https://erjsmartsolutions.eablao.dev/',
  },
}

export default ERJSmartSolution