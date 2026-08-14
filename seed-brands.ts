import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const brands = [
    { name: 'Bridgestone', logoUrl: '/brands/BRIDGESTONE.png', order: 1 },
    { name: 'Continental', logoUrl: '/brands/CONTINENTAL.png', order: 2 },
    { name: 'Goodyear', logoUrl: '/brands/GOODYEAR.png', order: 3 },
    { name: 'Hankook', logoUrl: '/brands/Hankook_Logo.png', order: 4 },
    { name: 'Michelin', logoUrl: '/brands/MICHELIN.png', order: 5 },
    { name: 'Nexen', logoUrl: '/brands/NEXEN.png', order: 6 },
    { name: 'Pirelli', logoUrl: '/brands/PIRELLI.png', order: 7 },
    { name: 'Toyo', logoUrl: '/brands/TOYO.png', order: 8 },
    { name: 'Yokohama', logoUrl: '/brands/YOKOHAMA.png', order: 9 },
  ];

  // Clear existing to avoid duplicates if re-running
  await prisma.brand.deleteMany({});

  for (const b of brands) {
    await prisma.brand.create({ data: b });
  }

  console.log('Seeded brands successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
