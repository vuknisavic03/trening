import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/rezim/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ['recharts'],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/rezim/index.html',
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Režim',
        short_name: 'Režim',
        description: 'Praćenje treninga i ishrane',
        lang: 'sr-Latn',
        start_url: '/rezim/',
        scope: '/rezim/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F5F6F5',
        theme_color: '#F5F6F5',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
