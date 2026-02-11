import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: []
      }
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(process.cwd(), './src') },
      { find: 'figma:asset', replacement: path.resolve(process.cwd(), './src/assets') },
    ],
    // CRITICAL: Deduplicate React to prevent multiple instances
    dedupe: ['react', 'react-dom', 'framer-motion', 'use-sync-external-store'],
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
          ],
          'utils-vendor': ['clsx', 'class-variance-authority', 'tailwind-merge'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification using default esbuild
    minify: 'esbuild',
    // Enable source maps for debugging (can be disabled for production)
    sourcemap: false,
  },
  // Optimize dependencies - CRITICAL for React hook stability
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'framer-motion',
      'lucide-react',
      'rrweb',
      'rrweb-player',
    ],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three'],
    // Force optimization on every start to prevent cache issues
    force: true,
  },
  // Server configuration
  server: {
    port: 5174,
    host: true,
    hmr: {
      overlay: true,
    },
  },
})