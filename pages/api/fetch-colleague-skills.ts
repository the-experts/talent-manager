import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    try {
        const colleagueId = request.query.colleague_id as string;
        const allSkills = await sql`SELECT 
                                                               colleagues_skills.id, colleagues_skills.colleague_id, colleagues_skills.skill_id, colleagues_skills.ability, colleagues_skills.interest, colleagues_skills.category_id,
                                                               skills.id as skills_table_skill_id, skills.name
                                                               FROM colleagues_skills 
                                                               INNER JOIN skills 
                                                               ON colleagues_skills.skill_id = skills.id 
                                                               WHERE colleagues_skills.colleague_id = ${colleagueId};`;
        return response.setHeader('Cache-Control', 's-maxage=0').status(200).json({ allSkills });
    } catch (error) {
        return response.status(500).json({ error });
    }
}