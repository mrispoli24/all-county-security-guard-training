import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

// Exercise the real route and libSQL client without production credentials.
process.env.TURSO_DATABASE_URL = 'file::memory:';
process.env.TURSO_AUTH_TOKEN = 'local-test-only';
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
});
const { POST } = await vite.ssrLoadModule('/src/pages/api/register.ts');
const { getDb, REGISTRATIONS_SCHEMA } = await vite.ssrLoadModule('/src/lib/turso.ts');
after(async () => {
  getDb().close();
  await vite.close();
});

const registration = {
  course_slug: 'pre-assignment', first_name: 'Synthetic', last_name: 'Test',
  street_address: '1 Test Street', city: 'Test City', state: 'NY', zip: '00000',
  email: 'aci-regression@example.invalid', phone_area_code: '202', phone_number: '5550100',
  date_of_birth: '1990-01-01', last4_ssn: '0000', course_date: '2099-01-01',
  course_time: '9:00am - 5:00pm', accommodations: 'None', comments: 'Automated regression test',
};
const post = (body) => POST({ request: new Request('http://localhost/api/register', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
}) });

test('registration schema is valid SQL and is idempotent', async () => {
  await getDb().execute(REGISTRATIONS_SCHEMA);
  await getDb().execute(REGISTRATIONS_SCHEMA);
  await getDb().execute('DROP TABLE registrations');
});

test('fresh database: save a registration, return payment link, and clean up', async () => {
  const db = getDb();
  try {
    const response = await post(registration);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      paymentLink: 'https://buy.stripe.com/REPLACE-PRE-ASSIGNMENT',
    });
    const saved = await db.execute({
      sql: 'SELECT first_name, course_slug FROM registrations WHERE email = ?',
      args: [registration.email],
    });
    assert.equal(saved.rows.length, 1);
    assert.equal(saved.rows[0].first_name, registration.first_name);
    assert.equal(saved.rows[0].course_slug, registration.course_slug);
    await db.execute(REGISTRATIONS_SCHEMA); // Also works when the table exists.
  } finally {
    const exists = await db.execute("SELECT name FROM sqlite_master WHERE name = 'registrations'");
    if (exists.rows.length) {
      await db.execute({ sql: 'DELETE FROM registrations WHERE email = ?', args: [registration.email] });
      const remaining = await db.execute({
        sql: 'SELECT COUNT(*) AS count FROM registrations WHERE email = ?', args: [registration.email],
      });
      assert.equal(remaining.rows[0].count, 0);
    }
  }
});

test('invalid input does not write a registration', async () => {
  assert.equal((await post({ ...registration, email: 'invalid' })).status, 400);
  assert.equal((await post({ ...registration, course_slug: 'unknown' })).status, 400);
  const rows = await getDb().execute('SELECT COUNT(*) AS count FROM registrations');
  assert.equal(rows.rows[0].count, 0);
});
