import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
    const categories1 = prisma.categories.create({
        data: {
            name: 'Techniques'
        }
    })
    const categories2 = prisma.categories.create({
        data: {
            name: 'Tools'
        }
    })
    const categories3 = prisma.categories.create({
        data: {
            name: 'Platforms'
        }
    })
    const categories4 = prisma.categories.create({
        data: {
            name: 'Languages'
        }
    })

    console.log(categories1)
    console.log(categories2)
    console.log(categories3)
    console.log(categories4)
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
