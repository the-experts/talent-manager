import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    try {
        const colleagueId = request.query.colleague_id as string;
        const allSkills = await sql`SELECT * FROM colleagues_skills INNER JOIN skills ON colleagues_skills.skill_id = skills.id WHERE colleagues_skills.colleague_id = ${colleagueId};`;
        return response.status(200).json({ allSkills });
    } catch (error) {
        return response.status(500).json({ error });
    }
}