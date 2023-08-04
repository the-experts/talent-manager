import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const email = request.query.email as string;

        if (!email) throw new Error('Email are required');
        await sql`SELECT id FROM colleagues WHERE email = (${email});`;
    } catch (error) {
        return response.status(500).json({ error });
    }

    const colleagues = await sql`SELECT * FROM colleagues;`;
    return response.status(200).json({ colleagues });
}