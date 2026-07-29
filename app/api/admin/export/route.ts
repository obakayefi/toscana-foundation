import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/app/admin/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const beneficiaries = await prisma.beneficiary.findMany();
        const galleryEvents = await prisma.galleryEvent.findMany({
            include: { images: true }
        });

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toscanafoundation.com";

        const transformImg = (img: string | null) => {
            if (!img) return null;
            if (img.startsWith('http')) return img;
            return `${baseUrl}${img}`;
        };

        const exportData = {
            beneficiaries: beneficiaries.map(b => ({
                ...b,
                img: transformImg(b.img)
            })),
            galleryEvents: galleryEvents.map(e => ({
                ...e,
                images: e.images.map(img => ({
                    ...img,
                    url: transformImg(img.url)
                }))
            })),
            exportedAt: new Date().toISOString(),
            version: "3.0 (MongoDB-based)"
        };

        return NextResponse.json(exportData);
    } catch (error: any) {
        console.error("Export API Error:", error);
        return NextResponse.json({
            error: "Failed to export data",
            message: error.message
        }, { status: 500 });
    }
}
