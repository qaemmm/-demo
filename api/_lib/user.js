function getPhoneCandidates(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  const candidates = new Set();
  if (!digits) return [];

  candidates.add(digits);

  if (digits.length === 10 && digits.startsWith('9')) {
    candidates.add(`0${digits}`);
    candidates.add(`63${digits}`);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    candidates.add(digits.slice(1));
    candidates.add(`63${digits.slice(1)}`);
  }

  if (digits.length === 12 && digits.startsWith('63')) {
    candidates.add(digits.slice(2));
    candidates.add(`0${digits.slice(2)}`);
  }

  return Array.from(candidates);
}

export async function findUserWithStateByPhone(client, phone) {
  const [p1 = '', p2 = '', p3 = ''] = getPhoneCandidates(phone);
  const result = await client.sql`
    SELECT
      u.id,
      u.phone,
      u.name,
      u.tier,
      TO_CHAR(u.birthday, 'MM/DD/YYYY') AS birthday,
      u.password_hash,
      ms.points,
      ms.birthday_reward_claimed
    FROM users u
    JOIN member_state ms ON ms.user_id = u.id
    WHERE
      u.phone = ${phone}
      OR regexp_replace(u.phone, '[^0-9]', '', 'g') = ${p1}
      OR regexp_replace(u.phone, '[^0-9]', '', 'g') = ${p2}
      OR regexp_replace(u.phone, '[^0-9]', '', 'g') = ${p3}
    LIMIT 1
  `;
  return result.rows[0] || null;
}

export async function findUserWithStateById(client, userId) {
  const result = await client.sql`
    SELECT
      u.id,
      u.phone,
      u.name,
      u.tier,
      TO_CHAR(u.birthday, 'MM/DD/YYYY') AS birthday,
      ms.points,
      ms.birthday_reward_claimed
    FROM users u
    JOIN member_state ms ON ms.user_id = u.id
    WHERE u.id = ${userId}
    LIMIT 1
  `;
  return result.rows[0] || null;
}

export function toUserSummary(row) {
  return {
    id: row.id,
    phone: row.phone,
    name: row.name,
    tier: row.tier,
    birthday: row.birthday,
    points: Number(row.points),
    birthdayRewardClaimed: Boolean(row.birthday_reward_claimed),
  };
}
