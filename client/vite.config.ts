import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envDir: './env/',
  optimizeDeps: {
    include: [],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  preview: {
    host: true,
    strictPort: true,
    port: 3000,
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: true,
    cssTarget: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    commonjsOptions: {
      esmExternals: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react/jsx-runtime', 'react-dom'],
        },
      },
    },
  },
})
