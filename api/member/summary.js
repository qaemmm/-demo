import { withDb } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';
import { getUserIdFromRequest } from '../_lib/session.js';
import { findUserWithStateById, toUserSummary } from '../_lib/user.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(req, res, ['GET']);

  const userId = getUserIdFromRequest(req);
  if (!userId) return json(res, 401, { error: 'Unauthorized' });

  const userRow = await withDb((client) => findUserWithStateById(client, userId));
  if (!userRow) return json(res, 401, { error: 'Unauthorized' });

  const user = toUserSummary(userRow);
  return json(res, 200, {
    points: user.points,
    tier: user.tier,
    birthday: user.birthday,
    birthdayRewardClaimed: user.birthdayRewardClaimed,
    name: user.name,
    phone: user.phone,
  });
}

