import type { APIRoute } from 'astro';
import { getDb, REGISTRATIONS_SCHEMA } from '../../lib/turso';
import { getCourse } from '../../lib/courses';

export const prerender = false;

const REQUIRED = [
  'course_slug', 'first_name', 'last_name', 'street_address', 'city', 'state',
  'zip', 'email', 'phone_area_code', 'phone_number', 'date_of_birth',
  'last4_ssn', 'course_date', 'course_time', 'accommodations',
] as const;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const course = getCourse(String(body.course_slug || ''));
  if (!course) {
    return new Response(JSON.stringify({ error: 'Unknown course' }), { status: 400 });
  }

  for (const field of REQUIRED) {
    if (!body[field] || !String(body[field]).trim()) {
      return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), { status: 400 });
    }
  }

  // Basic format checks (never log the values themselves).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
  }
  if (!/^\d{4}$/.test(body.last4_ssn)) {
    return new Response(JSON.stringify({ error: 'Last 4 of SSN must be 4 digits' }), { status: 400 });
  }

  try {
    const db = getDb();
    await db.execute(REGISTRATIONS_SCHEMA);
    await db.execute({
      sql: `INSERT INTO registrations
        (course_slug, course_name, first_name, last_name, street_address, street_address_2,
         city, state, zip, email, phone_area_code, phone_number, date_of_birth, last4_ssn,
         course_date, course_time, accommodations, comments)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        course.slug, course.name,
        body.first_name.trim(), body.last_name.trim(),
        body.street_address.trim(), (body.street_address_2 || '').trim(),
        body.city.trim(), body.state.trim(), body.zip.trim(),
        body.email.trim().toLowerCase(),
        body.phone_area_code.trim(), body.phone_number.trim(),
        body.date_of_birth.trim(), body.last4_ssn.trim(),
        body.course_date.trim(), body.course_time.trim(),
        body.accommodations.trim(), (body.comments || '').trim(),
      ],
    });
  } catch (e) {
    console.error('Registration save failed');
    return new Response(JSON.stringify({ error: 'Could not save registration. Please try again.' }), { status: 500 });
  }

  return new Response(JSON.stringify({ paymentLink: course.paymentLink }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
