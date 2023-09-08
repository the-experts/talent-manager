import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const email = request.body.email as string;
        if (!email) throw new Error('Email is required');

        const userExistQuery = await sql`SELECT id, name, email, roles_id FROM colleagues WHERE email = (${email});`;
        return response.status(200).json({ userExistQuery });
    } catch (error) {
        return response.status(500).json({ error });
    }
}

export type Colleague = {
    id: number;
    name: string;
    roles_id: number;
}