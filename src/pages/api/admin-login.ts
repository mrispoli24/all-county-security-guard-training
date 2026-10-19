import type { APIRoute } from 'astro';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const prerender = false;

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}

function redirect(to: string): Response {
  return new Response(null, { status: 303, headers: { Location: to } });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response('Server misconfigured', { status: 500 });
  }
  const form = await request.formData();
  const password = String(form.get('password') || '');

  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword);
  const ok = a.length === b.length && timingSafeEqual(a, b);

  if (!ok) {
    return redirect('/admin?error=1');
  }

  const token = sign('admin', adminPassword);
  cookies.set('aci_admin', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return redirect('/admin/registrations');
};
