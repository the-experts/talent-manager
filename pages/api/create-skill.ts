import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const newSkill = request.body.newSkill;

    if (!newSkill) throw new Error('Skill data is required');
    const createSkillQuery = await sql`INSERT INTO skills(name, categories_id)
                                                                    SELECT ${newSkill.name}, ${newSkill.categories_id} 
                                                                    WHERE
                                                                    NOT EXISTS (
                                                                    SELECT id FROM skills WHERE name = ${newSkill.name} AND categories_id = ${newSkill.categories_id}
                                                                    ) RETURNING id, name, categories_id;`;
    return response.status(200).json({ createSkillQuery });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
