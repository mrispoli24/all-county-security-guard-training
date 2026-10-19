// Shared admin auth check for server-rendered admin pages.
import { createHmac } from 'node:crypto';
import type { AstroCookies } from 'astro';

export function isAdmin(cookies: AstroCookies): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const token = cookies.get('aci_admin')?.value;
  if (!token) return false;
  const expected = createHmac('sha256', adminPassword).update('admin').digest('hex');
  return token === expected;
}
