import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/app/admin/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const galleryEvents = await prisma.galleryEvent.findMany({
            include: { images: true }
        });

        const beneficiaries = await prisma.beneficiary.findMany();

        return NextResponse.json({
            galleryEvents,
            beneficiaries,
            exportedAt: new Date().toISOString(),
            version: "1.0"
        });
    } catch (error) {
        console.error("Export API Error:", error);
        return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
    }
}
