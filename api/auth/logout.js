import { clearSessionCookie } from '../_lib/session.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(req, res, ['POST']);
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
}

