// Turso (libSQL) client singleton for server-side use.
// Requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN env vars (set in Vercel).
import { createClient, type Client } from '@libsql/client';

let _client: Client | null = null;

export function getDb(): Client {
  if (_client) return _client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
  }
  _client = createClient({ url, authToken });
  return _client;
}

export const REGISTRATIONS_SCHEMA = `
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_slug TEXT NOT NULL,
  course_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  street_address TEXT NOT NULL,
  street_address_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_area_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  last4_ssn TEXT NOT NULL,
  course_date TEXT NOT NULL,
  course_time TEXT NOT NULL,
  accommodations TEXT NOT NULL,
  comments TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;
