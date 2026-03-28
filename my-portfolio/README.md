# MGDudes — Developer Portfolio

A dark, high-performance React portfolio for a full-stack web development agency. Features a typing hero, animated stats, services grid, project cards with a slide-in detail modal, process steps, and a contact section.

---

## Tech Stack

- **React** (functional components + hooks)
- **CSS-in-JS** via injected `<style>` tag
- **Google Fonts** — Bebas Neue, DM Sans, Space Mono
- **No external UI libraries** — fully custom components

---

## Features

- **Typing effect hero** — cycles through service types
- **Animated count-up stats** — triggered on scroll via IntersectionObserver
- **Project modal** — slide-in panel with image gallery, thumbnails, key features, tech stack, and live site link
- **Cursor glow effect** — radial gradient follows the mouse
- **Film grain overlay** — SVG noise texture for depth
- **Smooth scroll navigation** — all nav links scroll to sections

---

## Project Structure

```
Portfolio.jsx          # Single-file component (all sections + modal)
```

All data lives at the top of the file in plain arrays:

| Constant   | Description                              |
|------------|------------------------------------------|
| `SERVICES` | Six service cards with icons and tags    |
| `PROJECTS` | Six portfolio projects with modal data   |
| `STATS`    | Four animated stat counters              |
| `PROCESS`  | Four-step process section                |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Requires React 17+ and a bundler that supports JSX (Vite, CRA, Next.js, etc.).

---

## Customization

### Update contact info

In the **CONTACT** section near the bottom of `Portfolio.jsx`:

```jsx
<a href="mailto:your@email.com">...</a>
<a href="tel:+91XXXXXXXXXX">...</a>
```

### Add or edit projects

Each project in the `PROJECTS` array supports:

```js
{
  id: 1,
  title: "Project Name",
  category: "Landing Page",
  desc: "Short card description",
  longDesc: "Full description shown in the modal",
  link: "https://your-live-site.com",
  tech: ["React", "Tailwind"],
  color: "#00FF87",              // Accent color for this card
  highlights: ["Feature 1", "Feature 2"],
  images: ["url1", "url2", "url3"],  // Gallery images (16:9 recommended)
}
```

### Update footer links

Search for `"Fiverr"`, `"Upwork"`, `"LinkedIn"` near the footer and replace the `href="#"` values with your actual profile URLs.

---

## Modal Behavior

- Opens by clicking any project card
- Closes via the **✕ button**, clicking the **backdrop**, or pressing **Escape**
- Image gallery supports **prev/next arrows** and **thumbnail clicks**
- Animated slide-in from the right with backdrop blur

---

## Fonts

Loaded from Google Fonts at runtime:

```
Bebas Neue   — headings and display text
DM Sans      — body and UI text
Space Mono   — labels, tags, and monospaced accents
```

---

## License

Private project — all rights reserved by MGDudes.