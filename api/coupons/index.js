import { withDb } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';
import { getUserIdFromRequest } from '../_lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(req, res, ['GET']);

  const userId = getUserIdFromRequest(req);
  if (!userId) return json(res, 401, { error: 'Unauthorized' });

  const result = await withDb((client) => client.sql`
    SELECT
      coupon_id AS id,
      type,
      value,
      title,
      "desc" AS desc,
      TO_CHAR(expire_at, 'MM/DD/YYYY') AS expire,
      used,
      tag
    FROM coupon_wallet
    WHERE user_id = ${userId}
    ORDER BY unlocked_at DESC, id DESC
  `);

  return json(res, 200, { coupons: result.rows });
}
