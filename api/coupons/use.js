import { withDb } from '../_lib/db.js';
import { json, methodNotAllowed, readJsonBody } from '../_lib/http.js';
import { getUserIdFromRequest } from '../_lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(req, res, ['POST']);

  const userId = getUserIdFromRequest(req);
  if (!userId) return json(res, 401, { error: 'Unauthorized' });

  const body = await readJsonBody(req);
  const couponId = String(body.couponId || '').trim();
  if (!couponId) return json(res, 400, { error: 'couponId is required' });

  const result = await withDb((client) => client.sql`
    UPDATE coupon_wallet
    SET used = true
    WHERE user_id = ${userId} AND coupon_id = ${couponId}
    RETURNING coupon_id AS id, used
  `);

  if (!result.rows[0]) return json(res, 404, { error: 'Coupon not found' });
  return json(res, 200, { coupon: result.rows[0] });
}

