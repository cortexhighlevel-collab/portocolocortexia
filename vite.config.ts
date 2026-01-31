import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ========== OFUSCAÇÃO E PROTEÇÃO DE CÓDIGO ==========
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: {
          regex: /^_private_/,
        },
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        // Nomes de chunks ofuscados
        chunkFileNames: (chunkInfo) => {
          const hash = Math.random().toString(36).substring(2, 8);
          return `assets/c-${hash}-[hash].js`;
        },
        entryFileNames: `assets/e-[hash].js`,
        assetFileNames: `assets/a-[hash].[ext]`,
      },
    },
    // Source maps desabilitados em produção
    sourcemap: false,
  },
}));
