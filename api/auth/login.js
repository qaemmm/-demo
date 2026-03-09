import bcrypt from 'bcryptjs';
import { withDb } from '../_lib/db.js';
import { json, methodNotAllowed, readJsonBody } from '../_lib/http.js';
import { createSessionToken, setSessionCookie } from '../_lib/session.js';
import { findUserWithStateByPhone, toUserSummary } from '../_lib/user.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(req, res, ['POST']);

  const body = await readJsonBody(req);
  const phone = String(body.phone || '').trim();
  const password = String(body.password || '');

  if (!phone || !password) {
    return json(res, 400, { error: 'Phone and password are required' });
  }

  const userRow = await withDb((client) => findUserWithStateByPhone(client, phone));
  if (!userRow) return json(res, 401, { error: 'Invalid credentials' });

  const matched = await bcrypt.compare(password, userRow.password_hash);
  if (!matched) return json(res, 401, { error: 'Invalid credentials' });

  const token = createSessionToken(userRow.id);
  setSessionCookie(res, token);

  return json(res, 200, { user: toUserSummary(userRow) });
}

