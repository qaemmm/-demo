import { withDb } from '../_lib/db.js';
import { json, methodNotAllowed } from '../_lib/http.js';
import { getUserIdFromRequest } from '../_lib/session.js';

function isBirthdayMonth(birthdayText) {
  const birthdayMonth = Number(String(birthdayText).split('/')[0]);
  return birthdayMonth === new Date().getMonth() + 1;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(req, res, ['POST']);

  const userId = getUserIdFromRequest(req);
  if (!userId) return json(res, 401, { error: 'Unauthorized' });

  try {
    const response = await withDb(async (client) => {
      await client.sql`BEGIN`;
      try {
        const stateResult = await client.sql`
          SELECT
            ms.points,
            ms.birthday_reward_claimed,
            TO_CHAR(u.birthday, 'MM/DD/YYYY') AS birthday
          FROM member_state ms
          JOIN users u ON u.id = ms.user_id
          WHERE ms.user_id = ${userId}
          FOR UPDATE
        `;
        const row = stateResult.rows[0];
        if (!row) {
          await client.sql`ROLLBACK`;
          return { status: 404, data: { error: 'Member state not found' } };
        }

        if (!isBirthdayMonth(row.birthday)) {
          await client.sql`ROLLBACK`;
          return { status: 400, data: { error: 'Birthday reward can only be claimed in birthday month' } };
        }

        if (row.birthday_reward_claimed) {
          await client.sql`COMMIT`;
          return {
            status: 200,
            data: {
              added: false,
              points: Number(row.points),
              birthdayRewardClaimed: true,
            },
          };
        }

        const updated = await client.sql`
          UPDATE member_state
          SET
            points = points + 200,
            birthday_reward_claimed = true,
            updated_at = NOW()
          WHERE user_id = ${userId}
          RETURNING points, birthday_reward_claimed
        `;

        await client.sql`
          INSERT INTO coupon_wallet (
            user_id,
            coupon_id,
            type,
            value,
            title,
            desc,
            expire_at,
            tag,
            used,
            unlocked_at
          )
          VALUES (
            ${userId},
            'C_BDAY',
            'gift',
            'FREE Birthday Treat',
            'FREE Birthday Treat',
            'Any item up to ₱300 · Birthday month exclusive',
            DATE '2026-03-31',
            'BIRTHDAY',
            false,
            NOW()
          )
          ON CONFLICT (user_id, coupon_id) DO NOTHING
        `;

        await client.sql`COMMIT`;
        return {
          status: 200,
          data: {
            added: true,
            points: Number(updated.rows[0].points),
            birthdayRewardClaimed: Boolean(updated.rows[0].birthday_reward_claimed),
          },
        };
      } catch (error) {
        await client.sql`ROLLBACK`;
        throw error;
      }
    });

    return json(res, response.status, response.data);
  } catch {
    return json(res, 500, { error: 'Failed to claim birthday reward' });
  }
}

