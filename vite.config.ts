import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Admin / client-portal / login UI is excluded from the public build unless
  // VITE_ENABLE_PORTALS=true is set at build time (Phase A0: no unauthenticated admin in production).
  define: {
    __PORTALS_ENABLED__: JSON.stringify(process.env.VITE_ENABLE_PORTALS === 'true'),
  },
  plugins: [
    react({
      babel: {
        plugins: [
          // Enable automatic JSX runtime optimization
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'figma:asset': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['motion'],
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
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'motion',
      'lucide-react',
    ],
  },
  // Server configuration
  server: {
    hmr: {
      overlay: true,
    },
  },
})