import "dotenv/config";
import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/db';
import { uploadToCloudinary } from '../lib/cloudinary';

async function seedCloudinary() {
    console.log("Starting MongoDB seeding with Cloudinary uploads...");

    const dataPath = path.join(process.cwd(), 'data.json');
    if (!fs.existsSync(dataPath)) {
        console.error("data.json file not found");
        process.exit(1);
    }

    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const { beneficiaries, galleryEvents } = jsonData;

    // 1. Seed Beneficiaries
    if (beneficiaries && Array.isArray(beneficiaries)) {
        console.log(`Processing ${beneficiaries.length} beneficiaries...`);
        for (const b of beneficiaries) {
            try {
                let imgUrl = b.img;
                let imgPublicId: string | null = null;

                if (imgUrl) {
                    if (imgUrl.startsWith('https://res.cloudinary.com')) {
                        const match = imgUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
                        imgPublicId = match?.[1] ?? null;
                    } else {
                        console.log(`Uploading beneficiary image to Cloudinary for ${b.name} (${imgUrl})...`);
                        const uploadRes = await uploadToCloudinary(imgUrl, 'toscana-scholars');
                        imgUrl = uploadRes.url;
                        imgPublicId = uploadRes.publicId;
                        console.log(`Uploaded ${b.name} -> ${imgUrl}`);
                    }
                }

                // Check if already exists in DB
                const existing = await prisma.beneficiary.findFirst({
                    where: { name: b.name, type: b.type }
                });

                if (existing) {
                    await prisma.beneficiary.update({
                        where: { id: existing.id },
                        data: {
                            yearJoined: b.yearJoined,
                            gender: b.gender,
                            img: imgUrl,
                            imgPublicId: imgPublicId ?? existing.imgPublicId,
                            grant: b.grant,
                            schoolName: b.schoolName,
                            course: b.course,
                            level: b.level,
                            craft: b.craft,
                            equipmentGiven: b.equipmentGiven,
                            sortOrder: b.sortOrder ?? 0,
                        }
                    });
                    console.log(`Updated beneficiary: ${b.name}`);
                } else {
                    await prisma.beneficiary.create({
                        data: {
                            type: b.type,
                            name: b.name,
                            yearJoined: b.yearJoined,
                            gender: b.gender,
                            img: imgUrl,
                            imgPublicId: imgPublicId,
                            grant: b.grant,
                            schoolName: b.schoolName,
                            course: b.course,
                            level: b.level,
                            craft: b.craft,
                            equipmentGiven: b.equipmentGiven,
                            sortOrder: b.sortOrder ?? 0,
                        }
                    });
                    console.log(`Created beneficiary: ${b.name}`);
                }
            } catch (err: any) {
                console.error(`Error processing beneficiary ${b.name}:`, err.message);
            }
        }
    }

    // 2. Seed Gallery Events
    if (galleryEvents && Array.isArray(galleryEvents)) {
        console.log(`Processing ${galleryEvents.length} gallery events...`);
        for (const e of galleryEvents) {
            try {
                const slug = e.slug || e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const existingEvent = await prisma.galleryEvent.findUnique({
                    where: { slug }
                });

                const imagesToCreate = [];
                for (const img of e.images || []) {
                    let url = img.url;
                    let publicId = img.publicId || 'existing';

                    if (url && !url.startsWith('https://res.cloudinary.com')) {
                        const uploadRes = await uploadToCloudinary(url, 'toscana-gallery');
                        url = uploadRes.url;
                        publicId = uploadRes.publicId;
                    }
                    imagesToCreate.push({ url, publicId });
                }

                if (existingEvent) {
                    await prisma.galleryEvent.update({
                        where: { id: existingEvent.id },
                        data: {
                            title: e.title,
                            year: e.year,
                            description: e.description,
                        }
                    });
                    for (const img of imagesToCreate) {
                        const existingImg = await prisma.image.findFirst({
                            where: { eventId: existingEvent.id, url: img.url }
                        });
                        if (!existingImg) {
                            await prisma.image.create({
                                data: {
                                    url: img.url,
                                    publicId: img.publicId,
                                    eventId: existingEvent.id
                                }
                            });
                        }
                    }
                    console.log(`Updated gallery event: ${e.title}`);
                } else {
                    await prisma.galleryEvent.create({
                        data: {
                            title: e.title,
                            slug,
                            year: e.year,
                            description: e.description,
                            images: {
                                create: imagesToCreate
                            }
                        }
                    });
                    console.log(`Created gallery event: ${e.title}`);
                }
            } catch (err: any) {
                console.error(`Error processing gallery event ${e.title}:`, err.message);
            }
        }
    }

    console.log("Seeding and Cloudinary image sync completed successfully!");
}

seedCloudinary().catch(console.error);
