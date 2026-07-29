import { writeData, AppData } from './lib/json-db';
import { ACADEMIC_BENEFICIARIES, YOUTH_EMPOWERMENT_BENEFICIARIES } from './lib/utils';
import crypto from 'crypto';

async function main() {
    console.log('Seeding to data.json...');

    const data: AppData = {
        galleryEvents: [], // Currently no hardcoded gallery events in utils.ts
        beneficiaries: [],
        updatedAt: new Date().toISOString()
    };

    let sortOrder = 0;

    // Seed Academic Beneficiaries
    console.log('Processing Academic beneficiaries...');
    for (const b of ACADEMIC_BENEFICIARIES as any[]) {
        data.beneficiaries.push({
            id: crypto.randomUUID(),
            type: 'academic',
            name: b.name,
            yearJoined: b.yearJoined.toString(),
            gender: b.gender,
            img: b.img, // Keep as is for now, will handle CDN in export
            grant: b.grant,
            schoolName: b.schoolName,
            course: b.course,
            level: b.class,
            sortOrder: sortOrder++,
            createdAt: new Date().toISOString()
        });
    }

    sortOrder = 0;

    // Seed Youth Empowerment Beneficiaries
    console.log('Processing Youth Empowerment beneficiaries...');
    for (const b of YOUTH_EMPOWERMENT_BENEFICIARIES as any[]) {
        data.beneficiaries.push({
            id: crypto.randomUUID(),
            type: 'youth',
            name: b.name,
            yearJoined: b.yearJoined.toString(),
            gender: b.gender,
            img: b.img,
            craft: b.craft,
            equipmentGiven: b.equipmentGiven,
            sortOrder: sortOrder++,
            createdAt: new Date().toISOString()
        });
    }

    await writeData(data);
    console.log('Successfully seeded data.json!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
