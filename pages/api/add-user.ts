import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const fullName = request.query.fullName as string;
        const email = request.query.email as string;
        const role = request.query.role as string;

        if (!fullName || !email || !role) throw new Error('Name and Email are required');
        await sql`INSERT INTO colleagues (email, name, roles_id) VALUES (${email}, ${fullName}, ${role});`;
    } catch (error) {
        return response.status(500).json({ error });
    }

    const colleagues = await sql`SELECT * FROM colleagues;`;
    return response.status(200).json({ colleagues });
}

// http://localhost:3000/api/add-user?fullName=Andrea%20Busse&email=andrea.busse@the-experts.nl&role=1
