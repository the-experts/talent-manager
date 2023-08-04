import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    const techniques = await prisma.categories.upsert({
        where: { name: 'Technieken' },
        update: {},
        create: {
            name: 'Technieken',
        },
    })

    const tools = await prisma.categories.upsert({
        where: { name: 'Tools' },
        update: {},
        create: {
            name: 'Tools',
        },
    })

    const platforms = await prisma.categories.upsert({
        where: { name: 'Platformen' },
        update: {},
        create: {
            name: 'Platformen',
        },
    })

    const languages = await prisma.categories.upsert({
        where: { name: 'Programmeertalen' },
        update: {},
        create: {
            name: 'Programmeertalen',
        },
    })

    const other = await prisma.categories.upsert({
        where: { name: 'Anders' },
        update: {},
        create: {
            name: 'Anders',
        },
    })


    const adminRole = await prisma.roles.upsert({
        where: { name: 'Administrator' },
        update: {},
        create: {
            name: 'Administrator',
        },
    })

    const salesRole = await prisma.roles.upsert({
        where: { name: 'Sales' },
        update: {},
        create: {
            name: 'Sales',
        },
    })

    const employeeRole = await prisma.roles.upsert({
        where: { name: 'Employee' },
        update: {},
        create: {
            name: 'Employee',
        },
    })

    console.log({ adminRole, salesRole, employeeRole })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })

    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
