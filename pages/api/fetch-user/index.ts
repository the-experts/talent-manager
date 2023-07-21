import prisma from "@/prisma/prisma";

export default async function handle(req, res) {
    const { id } = req.body;


    const result = await prisma.colleagues.findFirst({
        where: {id: id},
    });
    res.json(result);
}