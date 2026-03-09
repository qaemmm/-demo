import { db } from '@vercel/postgres';

export async function withDb(callback) {
  const client = await db.connect();
  try {
    return await callback(client);
  } finally {
    client.release();
  }
}

