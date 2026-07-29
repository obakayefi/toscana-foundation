import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const event = await prisma.galleryEvent.findUnique({
      where: { slug },
      include: { images: true },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Gallery event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error: any) {
    console.error("API GET /api/gallery/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery event", message: error.message },
      { status: 500 }
    );
  }
}
