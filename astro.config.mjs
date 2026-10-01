// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Actions sets SITE / BASE. Locally both default to root.
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  compressHTML: true,
  build: {
    // directory format → /about/ works on GitHub Pages (no Apache rewrite needed)
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
