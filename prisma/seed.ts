import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    firstname: 'admin',
    lastname: 'admin',
    role: Role.ADMIN,
  },
  {
    username: 'john',
    firstname: 'john',
    lastname: 'ladhrin',
    role: Role.USER,
  },
];

const concertsData = [
  { name: 'bodyslam', seat: 1, description: 'private party' },
  {
    name: 'illslick',
    seat: 200,
    description: 'full concert of illslick tours',
  },
];

async function main() {
  await prisma.user.createMany({ data: users });
  const admin = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
  const concerts = concertsData.map((c) => ({ ...c, createdById: admin.id }));
  await prisma.concert.createMany({ data: concerts });
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
