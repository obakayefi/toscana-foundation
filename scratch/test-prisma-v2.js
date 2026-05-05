const { prisma } = require('../lib/db');

async function test() {
    try {
        console.log('Prisma initialized:', !!prisma);
        if (prisma) {
            console.log('Models on prisma object:');
            const models = Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_'));
            console.log(models);
            
            console.log('galleryEvent exists:', !!prisma.galleryEvent);
            console.log('beneficiary exists:', !!prisma.beneficiary);
        }
    } catch (err) {
        console.error('Error during test:', err);
    } finally {
        if (prisma && prisma.$disconnect) await prisma.$disconnect();
    }
}

test();
