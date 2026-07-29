const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Prisma models:');
console.log('GalleryEvent:', !!prisma.galleryEvent);
console.log('Beneficiary:', !!prisma.beneficiary);
console.log('Keys:', Object.keys(prisma).filter(k => !k.startsWith('$')));

prisma.$disconnect();
