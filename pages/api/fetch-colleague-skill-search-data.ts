import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const searchTerm = request.query.searchTerm as string;
    const searchType = request.query.searchType;

    // @todo: figure out to avoid this duplication. a 2nd ${} does not yield the expected results
    if (searchType === '1') {
      const searchResults = await sql`SELECT
                    colleagues_skills.id,
                        colleagues_skills.colleague_id,
                        colleagues_skills.ability,
                        colleagues_skills.interest,
                        skills.name as skill_name,
                        colleagues.name as colleague_name
                    FROM colleagues_skills
                    LEFT JOIN skills ON colleagues_skills.skill_id = skills.id
                    LEFT JOIN colleagues ON colleagues_skills.colleague_id = colleagues.id
                    WHERE skills.name ILIKE ${'%' + searchTerm + '%'};`;
      return response.status(200).json({ searchResults });
    } else if (searchType === '2') {
      const searchResults = await sql`SELECT
                colleagues_skills.id,
                    colleagues_skills.colleague_id,
                    colleagues_skills.ability,
                    colleagues_skills.interest,
                    skills.name as skill_name,
                    colleagues.name as colleague_name
                FROM colleagues_skills
                LEFT JOIN skills ON colleagues_skills.skill_id = skills.id
                LEFT JOIN colleagues ON colleagues_skills.colleague_id = colleagues.id
                WHERE colleagues.name ILIKE ${'%' + searchTerm + '%'};`;
      return response.status(200).json({ searchResults });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}
