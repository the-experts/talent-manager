import prisma from "@/prisma/prisma";

export default async function handle(req, res) {
    const { id, email, fullName } = req.body;


    const result = await prisma.colleagues.create({
        data: {
            id,
            email,
            name: fullName
        },
    });
    res.json(result);
}