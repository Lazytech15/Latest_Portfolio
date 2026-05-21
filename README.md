# Dev Portfolio

A modern, dark-themed portfolio built with **React + Vite + TailwindCSS**.

## Tech Stack

- React 18
- Vite 5
- TailwindCSS 3
- Framer Motion (optional animation enhancements)
- Google Fonts: Syne · Outfit · JetBrains Mono

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Customization

### 1. Replace your name
Open `src/components/Hero.jsx` and update the three `<span>` elements:
```jsx
<span>YOUR</span>
<span>NAME</span>
<span>HERE.</span>
```

### 2. Update About info
- Edit `src/components/About.jsx` — update the initials block and bio paragraphs.
- Update social links (GitHub, LinkedIn).

### 3. Update Projects
Open `src/components/Projects.jsx` and edit the `projects` array. Each project has:
- `title`, `description`, `category`, `tech` (array), `highlights` (array), `status`

### 4. Update Contact
- In `src/components/Contact.jsx`, update the email address.
- Hook up the form to your backend or replace with [Formspree](https://formspree.io):
  ```jsx
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://formspree.io/f/YOUR_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    })
    setSubmitted(true)
  }
  ```

### 5. Update social links
- Edit socials in `src/components/Contact.jsx` and `src/components/About.jsx`.
- Update `src/components/Footer.jsx` for the footer.

### 6. Update meta tags
Edit `index.html` — update the `<title>` and `<meta>` tags with your name.

## Color Scheme

The accent color is **`#00E5A0`** (electric mint/green).
To change it, edit `tailwind.config.js`:
```js
accent: '#YOUR_COLOR',
```
And `src/index.css`:
```css
--accent: #YOUR_COLOR;
```

## Fonts
Fonts are loaded via Google Fonts CDN in `index.html`. Replace any of them by updating the `<link>` tag and the `tailwind.config.js` `fontFamily` entries.

## Deployment

Works out of the box with:
- [Vercel](https://vercel.com) — `npm run build` → deploy `dist/`
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com) (with `base` config in vite.config.js)
