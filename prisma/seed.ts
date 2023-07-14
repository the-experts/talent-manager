
async function main() {
    const techniques = await prisma.categories.upsert({
        where: { name: 'Techniques' },
        update: {},
        create: {
            name: 'Techniques',
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
        where: { name: 'Platforms' },
        update: {},
        create: {
            name: 'Platforms',
        },
    })

    const languages = await prisma.categories.upsert({
        where: { name: 'Languages' },
        update: {},
        create: {
            name: 'Languages',
        },
    })
    console.log({ techniques, tools, platforms, languages })
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
