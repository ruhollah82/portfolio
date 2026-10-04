import path from 'node:path'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// Bundle report is opt-in: `ANALYZE=1 npm run build` (writes stats.html).
const analyze = process.env.ANALYZE
  ? [visualizer({ gzipSize: true, brotliSize: true })]
  : []

export default defineConfig({
  // Must match the GitHub repository name, with slashes (not the full URL).
  base: '/portfolio/',

  plugins: [react(), tailwindcss(), ...(analyze as PluginOption[])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
