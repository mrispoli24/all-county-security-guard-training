import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Deployed to Vercel (project: aci-security-guard-training).
// SSR enabled so /api/* routes and /admin work server-side.
// The GitHub Pages static build remains untouched in git history.
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://aci-security-guard-training.vercel.app',
});
