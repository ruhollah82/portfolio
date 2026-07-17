# Ruhollah Naseri | Portfolio

A modern, high-performance personal portfolio website built with React, TypeScript, and Tailwind CSS. It features a bilingual interface (English/Persian), smooth scroll animations, and interactive 3D elements, designed with a focus on clean architecture and accessibility.

## ✨ Features

- 🌐 **Bilingual Support**: Full English and Persian (FA) localization with seamless RTL/LTR switching.
- 🎨 **Theme Toggle**: Elegant Dark and Light mode support.
- 🚀 **High Performance**: Built with Vite and React 19 for blazing-fast load times.
- 🎭 **Smooth Animations**: Scroll-triggered reveals and layout animations powered by Framer Motion.
- 🌌 **3D Elements**: Interactive particle field background using Three.js and React Three Fiber.
- 📜 **Smooth Scrolling**: Premium feel with Lenis smooth scroll integration.
- 📱 **Fully Responsive**: Optimized for all devices, from mobile to ultrawide displays.
- ♿ **Accessible**: Built with semantic HTML and keyboard navigation in mind.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Fonts**: Vazirmatn (Variable) & JetBrains Mono

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v20+) or [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ruhollah82/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   # Using Bun (Recommended)
   bun install

   # Or using npm
   npm install
   ```

3. Start the development server:

   ```bash
   bun run dev
   # or npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📦 Available Scripts

- `bun run dev` - Starts the local development server with Hot Module Replacement (HMR).
- `bun run build` - Compiles TypeScript and builds the production-ready assets.
- `bun run preview` - Locally previews the production build.
- `bun run lint` - Runs ESLint to check for code quality and formatting issues.

## 🌍 Deployment

This project is configured to automatically build and deploy to **GitHub Pages** using GitHub Actions.

1. Ensure your `vite.config.ts` has the correct `base` path (e.g., `base: '/portfolio/'`).
2. Go to your repository **Settings > Pages** and set the source to **GitHub Actions**.
3. Push to the `main` branch, and the workflow will handle the rest.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Ruhollah Naseri**  
[GitHub](https://github.com/ruhollah82) · [LinkedIn](https://www.linkedin.com/in/ruhollah-naseri/) · [Telegram](https://t.me/its_ruhollah)
