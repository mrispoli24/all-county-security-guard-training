import { defineConfig } from 'astro/config';

// Static site deployed to GitHub Pages.
// Preview URL: https://mrispoli24.github.io/all-county-security-guard-training
// When the custom domain (allcountysecurityguardtraining.com) is pointed at
// GitHub Pages via GoDaddy, change base to '/'.
export default defineConfig({
  site: 'https://mrispoli24.github.io',
  base: '/all-county-security-guard-training',
});
