const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log('Testimonials:', await prisma.testimonial.findMany());
  console.log('ContentItems:', await prisma.contentItem.findMany());
}
main().catch(console.error).finally(() => prisma.$disconnect());
