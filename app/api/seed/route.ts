import { readData, writeData } from "@/lib/json-db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await readData();
    console.log('Cleaning JSON database gallery events...');
    data.galleryEvents = [];

    console.log('Seeding demo gallery events...');

    const events = [
      {
        id: crypto.randomUUID(),
        title: 'Rural Health Outreach 2025',
        slug: 'rural-health-2025',
        year: '2025',
        description: 'Providing essential medical services and supplies to underserved rural communities.',
        images: [
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-health-1',
          },
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-health-2',
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Scholarship Award Ceremony',
        slug: 'scholarship-awards-2024',
        year: '2024',
        description: 'Celebrating the academic excellence of our scholarship recipients.',
        images: [
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-scholarship-1',
          },
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-scholarship-2',
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Foundation Gala Dinner',
        slug: 'annual-gala-2024',
        year: '2024',
        description: 'An evening of fundraising and celebration with our partners and donors.',
        images: [
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-gala-1',
          },
          {
            id: crypto.randomUUID(),
            url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000',
            publicId: 'demo-gala-2',
          }
        ],
        createdAt: new Date().toISOString()
      },
    ];

    data.galleryEvents = events;
    data.updatedAt = new Date().toISOString();
    await writeData(data);

    return NextResponse.json({ message: "Seeding complete" });
  } catch (error: any) {
    console.error("SEEDING ERROR:", error);
    return NextResponse.json({ 
        error: "Seeding failed", 
        message: error.message,
    }, { status: 500 });
  }
}
