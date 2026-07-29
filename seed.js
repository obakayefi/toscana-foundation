const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');
const { ACADEMIC_BENEFICIARIES, YOUTH_EMPOWERMENT_BENEFICIARIES } = require('./lib/utils');

async function main() {
    const dbPath = path.resolve(process.cwd(), './dev.db');
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    const prisma = new PrismaClient({ adapter });

    console.log('Seeding beneficiaries...');

    let sortOrder = 0;

    // Seed Academic Beneficiaries
    console.log('Seeding Academic beneficiaries...');
    for (const b of ACADEMIC_BENEFICIARIES) {
        try {
            await prisma.beneficiary.create({
                data: {
                    type: 'academic',
                    name: b.name,
                    yearJoined: b.yearJoined.toString(),
                    gender: b.gender,
                    img: b.img,
                    grant: b.grant,
                    schoolName: b.schoolName,
                    course: b.course,
                    level: b.class,
                    sortOrder: sortOrder++
                }
            });
        } catch (err) {
            console.error(`Failed to seed academic: ${b.name}`, err.message);
        }
    }

    sortOrder = 0;

    // Seed Youth Empowerment Beneficiaries
    console.log('Seeding Youth Empowerment beneficiaries...');
    for (const b of YOUTH_EMPOWERMENT_BENEFICIARIES) {
        try {
            await prisma.beneficiary.create({
                data: {
                    type: 'youth',
                    name: b.name,
                    yearJoined: b.yearJoined.toString(),
                    gender: b.gender,
                    img: b.img,
                    craft: b.craft,
                    equipmentGiven: b.equipmentGiven,
                    sortOrder: sortOrder++
                }
            });
        } catch (err) {
            console.error(`Failed to seed youth: ${b.name}`, err.message);
        }
    }

    console.log('Finished seeding!');
    await prisma.$disconnect();
}

main().catch(console.error);
