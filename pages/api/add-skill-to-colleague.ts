import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const newSkill = request.body.skillForColleague;

        if (!newSkill) throw new Error('Skill data is required');
        const addSkillToColleagueQuery = await sql`INSERT INTO colleagues_skills(colleague_id, skill_id, category_id, ability, interest)
                                                                    SELECT ${newSkill.colleague_id}, ${newSkill.skill_id}, ${newSkill.category_id}, ${newSkill.ability}, ${newSkill.interest} 
                                                                    WHERE NOT EXISTS (
                                                                    SELECT id FROM colleagues_skills WHERE colleague_id = ${newSkill.colleague_id} AND skill_id = ${newSkill.skill_id}
                                                                    ) RETURNING id, skill_id, colleague_id, ability, interest, category_id;`;
        return response.status(200).json({ addSkillToColleagueQuery: addSkillToColleagueQuery });
    } catch (error) {
        return response.status(500).json({ error });
    }
}