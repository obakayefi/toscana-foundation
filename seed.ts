import { prisma } from './lib/db';
import { ACADEMIC_BENEFICIARIES, YOUTH_EMPOWERMENT_BENEFICIARIES } from './lib/utils';

async function main() {
    console.log('Seeding beneficiaries...');

    let sortOrder = 0;

    // Seed Academic Beneficiaries
    console.log('Seeding Academic beneficiaries...');
    for (const b of ACADEMIC_BENEFICIARIES as any[]) {
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
                    level: b.class, // mapped 'class' to 'level'
                    sortOrder: sortOrder++
                }
            });
        } catch (err) {
            console.error(`Failed to seed academic: ${b.name}`, err);
        }
    }

    console.log('Academic beneficiaries seeded!');

    sortOrder = 0;

    // Seed Youth Empowerment Beneficiaries
    console.log('Seeding Youth Empowerment beneficiaries...');
    for (const b of YOUTH_EMPOWERMENT_BENEFICIARIES as any[]) {
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
            console.error(`Failed to seed youth: ${b.name}`, err);
        }
    }

    console.log('Youth empowerment beneficiaries seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
