import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const skillToEdit = request.body.skillForColleague;

    if (!skillToEdit) throw new Error('Skill data is required');
    const editColleagueSkillQuery = await sql`UPDATE colleagues_skills 
                                                                             SET skill_id = ${skillToEdit.skill_id},
                                                                             category_id = ${skillToEdit.category_id},
                                                                             interest = ${skillToEdit.interest},
                                                                             ability = ${skillToEdit.ability},
                                                                             colleague_id = ${skillToEdit.colleague_id}
                                                                            WHERE id = ${skillToEdit.id}
                                                                            RETURNING id, skill_id, category_id, interest, ability
                                                                            ;`;
    return response.status(200).json({ editColleagueSkillQuery });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
