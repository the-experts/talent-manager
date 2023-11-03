import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const colleagueSkillId = request?.body?.colleagueSkillId;

    if (!colleagueSkillId) throw new Error('colleagueSkillId is required');
    const deleteColleagueSkillQuery =
      await sql`DELETE FROM colleagues_skills WHERE id = ${colleagueSkillId};`;
    return response.status(200).json({ deleteColleagueSkillQuery });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
