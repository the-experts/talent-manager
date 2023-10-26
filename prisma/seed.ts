import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const techniques = await prisma.categories.upsert({
    where: { name: 'Techniques' },
    update: {},
    create: {
      name: 'Techniques',
    },
  });

  const tools = await prisma.categories.upsert({
    where: { name: 'Tools' },
    update: {},
    create: {
      name: 'Tools',
    },
  });

  const platforms = await prisma.categories.upsert({
    where: { name: 'Platforms' },
    update: {},
    create: {
      name: 'Platforms',
    },
  });

  const languages = await prisma.categories.upsert({
    where: { name: 'Languages' },
    update: {},
    create: {
      name: 'Languages',
    },
  });

  const other = await prisma.categories.upsert({
    where: { name: 'Other' },
    update: {},
    create: {
      name: 'Other',
    },
  });

  const adminRole = await prisma.roles.upsert({
    where: { name: 'Administrator' },
    update: {},
    create: {
      name: 'Administrator',
    },
  });

  const salesRole = await prisma.roles.upsert({
    where: { name: 'Sales' },
    update: {},
    create: {
      name: 'Sales',
    },
  });

  const employeeRole = await prisma.roles.upsert({
    where: { name: 'Employee' },
    update: {},
    create: {
      name: 'Employee',
    },
  });

  console.log({ adminRole, salesRole, employeeRole });
  console.log({ techniques, tools, platforms, languages, other });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
