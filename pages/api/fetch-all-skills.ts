import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const allSkills = await sql`SELECT id, name, categories_id FROM skills;`;
        return response.status(200).json({ allSkills });
    } catch (error) {
        return response.status(500).json({ error });
    }
}