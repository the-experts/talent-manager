import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const fullName = request.body.name as string;
        const email = request.body.email as string;
        const role = request.body.roles_id as string;

        if (!fullName || !email || !role) throw new Error('Name and Email are required');
        const addUserQuery = await sql`INSERT INTO colleagues(email, name, roles_id)
                                                                    SELECT ${email}, ${fullName}, ${role} 
                                                                    WHERE
                                                                    NOT EXISTS (
                                                                    SELECT id FROM colleagues WHERE email = ${email}
                                                                    );`;
        return response.status(200).json({ addUserQuery });
    } catch (error) {
        return response.status(500).json({ error });
    }

    const colleagues = await sql`SELECT * FROM colleagues;`;
    return response.status(200).json({ colleagues });
}