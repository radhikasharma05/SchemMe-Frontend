import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Raise limit so the schemes data JSON doesn't abort the build
    chunkSizeWarningLimit: 20000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split schemes data into its own chunk
          'schemes-data': ['./src/res/schemes.json'],
          // Keep react in its own vendor chunk
          'vendor-react': ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    host: true,   // expose on all network interfaces (0.0.0.0)
    port: 5173,   // default Vite port
  },
})
