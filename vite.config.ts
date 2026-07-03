import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString(36)),
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Serve Lovable CDN assets (/__l5e/assets-v1/...) locally in dev so
      // videos/images that live on the CDN play in the sandbox too.
      "/__l5e": {
        target: "https://id-preview--d044c2bb-2523-4e28-a27a-707a39f93cfa.lovable.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    force: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip', '@radix-ui/react-tabs', '@radix-ui/react-accordion'],
        },
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
}));
