import vuesurlamontagne from '../../../public/project/hotel/vuesurlamontagne.png'
import vuesurlamontagne2 from '../../../public/project/hotel/vuesurlamontagne2.png'
import vuesurlamontagne3 from '../../../public/project/hotel/vuesurlamontagne3.png'


const VueSurLaMontagne = {
  // ── Projects.jsx list row ──────────────────────────────────────────────────
  number:   '06',
  title:    'Vue sur la Montagne',
  category: 'Frontend / UI',
  status:   'Shipped',

  // ── ProjectPage modal ──────────────────────────────────────────────────────

  // Short line under title
  description:
    'A cinematic, fully responsive luxury hotel landing page for a fictional five-star mountain resort in Tanay, Rizal, Philippines — built with React, Vite, and Tailwind CSS.',

  // Meta strip
  year:   '2025',
  role:   'Solo Developer',

  // overview[] — rendered as stacked <p> blocks (App.jsx line 444)
  overview: [
    'Vue sur la Montagne ("View of the Mountain") is a hospitality-grade landing page designed to feel like a real five-star resort brand. The brief was to capture the mood of the Sierra Madre highlands — cinematic photography, warm typography, and buttery-smooth interactions.',
    'The page is structured as a single-page React app with stacked sections: a full-screen hero carousel, live booking form, room catalog with detail modals, curated services grid, bento-gallery with lightbox, testimonials carousel, and a validated contact form — all wired to a custom scroll-reveal hook.',
    'Design is anchored by Cormorant Garamond for display headings, Cinzel for eyebrow labels, and DM Sans for body copy, against a cream-and-deep-forest palette with brand gold accents.',
  ],

  // highlights[] — rendered as dot list (App.jsx line ~460)
  highlights: [
    'Full-screen hero carousel — 6 room slides, 5.5s crossfade, touch & keyboard nav',
    'Live booking form — check-in/out date pickers, room type & guest selectors',
    '6 room cards with hover interactions + detail modal (price, size, amenities)',
    '8 curated services grid — Infinity Spa, Farm-to-Table, Stargazing & more',
    'Bento-grid photo gallery with lightbox overlay (6 real Rizal landmarks)',
    'Testimonials carousel with animated slide transitions',
    'Contact form with field validation',
    'Branded loading screen animation on first paint',
    'Scroll-reveal system via custom useReveal hook (Intersection Observer)',
    'Fully responsive — mobile, tablet, desktop',
  ],

  // tech[] — rendered as .tag pills (App.jsx line ~480)
  tech: [
    'React 18',
    'Vite',
    'Tailwind CSS',
    'Lucide React',
    'Google Fonts',
    'CSS Animations',
  ],

  // Links — read as project.links.github / project.links.live (App.jsx line ~490)
  links: {
    github: 'https://github.com/Lazytech15/Vue_sur_la_Montagne',
    live:   'https://vuesurlamontagne.eablao.dev',
  },

    images: [vuesurlamontagne, vuesurlamontagne2, vuesurlamontagne3],
}

export default VueSurLaMontagne