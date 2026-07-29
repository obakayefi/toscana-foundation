import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Cleaning MongoDB gallery events and images...');
    await prisma.image.deleteMany({});
    await prisma.galleryEvent.deleteMany({});

    console.log('Seeding demo gallery events to MongoDB...');

    const demoEvents = [
      {
        title: 'Rural Health Outreach 2025',
        slug: 'rural-health-2025',
        year: '2025',
        description: 'Providing essential medical services and supplies to underserved rural communities.',
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-health-1',
            },
            {
              url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-health-2',
            }
          ]
        }
      },
      {
        title: 'Scholarship Award Ceremony',
        slug: 'scholarship-awards-2024',
        year: '2024',
        description: 'Celebrating the academic excellence of our scholarship recipients.',
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-scholarship-1',
            },
            {
              url: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-scholarship-2',
            }
          ]
        }
      },
      {
        title: 'Foundation Gala Dinner',
        slug: 'annual-gala-2024',
        year: '2024',
        description: 'An evening of fundraising and celebration with our partners and donors.',
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-gala-1',
            },
            {
              url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000',
              publicId: 'demo-gala-2',
            }
          ]
        }
      },
    ];

    for (const event of demoEvents) {
      await prisma.galleryEvent.create({ data: event });
    }

    return NextResponse.json({ message: "Seeding MongoDB complete" });
  } catch (error: any) {
    console.error("SEEDING ERROR:", error);
    return NextResponse.json({ 
        error: "Seeding failed", 
        message: error.message,
    }, { status: 500 });
  }
}
