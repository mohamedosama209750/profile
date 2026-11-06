import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so production assets need the repository name as their base path.
// The dev server stays at http://localhost:5173/.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/profile/' : '/',
  plugins: [react()],
}));
