# 🚀 Rusiru Pramod — Futuristic Portfolio

> A world-class, award-level personal portfolio built with React 18, TypeScript, Three.js, Tailwind CSS, and Framer Motion.

![Portfolio Preview](./public/og-image.jpg)

## ✨ Features

- **Cinematic Intro** — WebGL globe with electron orbits, warp transition
- **Persistent 3D Background** — Wave mesh shader reacting to mouse + scroll
- **Glassmorphism UI** — Custom Tailwind design system with neon glow
- **Smooth Scrolling** — Lenis + GSAP ScrollTrigger
- **Custom Cursor** — Glowing trail cursor (desktop only)
- **Filterable Projects** — Category filtering with 3D tilt cards
- **Working Contact Form** — Formspree or mailto fallback
- **Interactive Contact Globe** — Three.js globe in the Contact section
- **Fully Responsive** — Mobile, tablet, desktop, ultrawide
- **Accessible** — WCAG AA, keyboard nav, screen reader labels, reduced-motion support
- **SEO** — Open Graph, Twitter cards, JSON-LD Person schema, sitemap
- **Vercel Ready** — SPA rewrites, long-term cache headers

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 (custom theme) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion + GSAP + ScrollTrigger |
| Scroll | Lenis |
| Icons | Lucide React |
| Contact | Formspree (or mailto fallback) |
| Deployment | Vercel |

## 📦 Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/RusiruPramod/My-Portfolio.git
cd My-Portfolio
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_FORM_ID` | Your Formspree form ID (e.g. `xpwzgkqr`) |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (alternative) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

> **Note:** If you leave these empty, the contact form will open your default mail client as a fallback.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build

```bash
npm run build
npm run preview
```

## ✏️ Editing Content

**All content lives in one file:** [`src/data/portfolio.ts`](./src/data/portfolio.ts)

| What | Where |
|---|---|
| Your name, email, CV link | `siteConfig` object |
| Social links | `socialLinks` array |
| Typing animation strings | `typingStrings` array |
| About bio & stats | `aboutData` object |
| Skills & levels | `skills` array |
| Services | `services` array |
| Projects | `projects` array |
| Timeline entries | `timeline` array |

## 🚀 Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: futuristic portfolio v2"
git push origin main
```

### Step 2 — Import in Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your `My-Portfolio` GitHub repository
3. Vercel auto-detects Vite. Settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3 — Add Environment Variables

In Vercel project settings → **Environment Variables**, add:
- `VITE_FORMSPREE_FORM_ID` → your form ID

### Step 4 — Deploy

Click **Deploy**. Your site will be live in ~60 seconds.

### Step 5 — Custom Domain (optional)

In Vercel → **Domains**, add your custom domain and follow the DNS instructions.

## 📁 Project Structure

```
src/
├── data/
│   └── portfolio.ts        # ← Edit all content here
├── hooks/
│   ├── useActiveSection.ts
│   ├── useFPSMonitor.ts
│   ├── useReducedMotion.ts
│   └── useWebGL.ts
├── components/
│   ├── CustomCursor.tsx
│   ├── GlassCard.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── SectionHeading.tsx
│   ├── SocialLinks.tsx
│   └── TypingAnimation.tsx
├── three/
│   ├── ContactGlobe.tsx    # Globe in contact section
│   ├── IntroScene.tsx      # Cinematic intro
│   └── WaveBackground.tsx  # Persistent background
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Timeline.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── utils/
│   └── cn.ts               # Tailwind class merge
├── App.tsx
├── main.tsx
└── index.css
```

## 📝 License

MIT © 2026 Rusiru Pramod

