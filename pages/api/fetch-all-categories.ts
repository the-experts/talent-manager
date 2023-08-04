import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const categories = await sql`SELECT * FROM categories;`;
        return response.status(200).json({ categories });
    } catch (error) {
        return response.status(500).json({ error });
    }
}