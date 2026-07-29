import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.galleryEvent.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    const formattedEvents = events.map((event) => ({
      id: event.slug,
      dbId: event.id,
      title: event.title,
      date: event.year,
      description: event.description,
      coverImage: event.images[0]?.url || "",
      photoCount: event.images.length,
      images: event.images,
    }));

    return NextResponse.json(formattedEvents);
  } catch (error: any) {
    console.error("API GET /api/gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery events", message: error.message },
      { status: 500 }
    );
  }
}
