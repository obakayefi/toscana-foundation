const { PrismaClient } = require('./generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');
const fs = require('fs');

async function main() {
    // We check both dev.db and foundation.db just in case
    const dbPath = path.resolve(process.cwd(), './dev.db');
    console.log('Checking database at:', dbPath);
    
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    const prisma = new PrismaClient({ adapter });

    try {
        const galleryEvents = await prisma.galleryEvent.findMany({
            include: { images: true }
        });

        const beneficiaries = await prisma.beneficiary.findMany();

        const data = {
            galleryEvents,
            beneficiaries
        };

        fs.writeFileSync('backup_data.json', JSON.stringify(data, null, 2));
        console.log('Data exported successfully to backup_data.json');
        
        // Quick summary
        console.log(`Summary:`);
        console.log(`- Gallery Events: ${galleryEvents.length}`);
        console.log(`- Total Images: ${galleryEvents.reduce((acc, curr) => acc + curr.images.length, 0)}`);
        console.log(`- Beneficiaries: ${beneficiaries.length}`);
        
        // Check for non-cloudinary links
        const localImages = [];
        galleryEvents.forEach(e => {
            e.images.forEach(img => {
                if (!img.url.includes('cloudinary.com')) {
                    localImages.push(img.url);
                }
            });
        });
        beneficiaries.forEach(b => {
            if (b.img && !b.img.includes('cloudinary.com')) {
                localImages.push(b.img);
            }
        });
        
        if (localImages.length > 0) {
            console.warn(`\nWarning: Found ${localImages.length} local or non-Cloudinary image links:`);
            localImages.slice(0, 5).forEach(url => console.warn(` - ${url}`));
            if (localImages.length > 5) console.warn(` ... and ${localImages.length - 5} more.`);
        } else {
            console.log('\nAll image links are verified Cloudinary URLs.');
        }

    } catch (err) {
        console.error('Export failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
