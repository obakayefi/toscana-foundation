import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/app/admin/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const p = prisma as any;
        
        // Try to find the models with different casings if needed
        const galleryEventModel = p.galleryEvent || p.galleryevent || p.GalleryEvent;
        const beneficiaryModel = p.beneficiary || p.beneficiary || p.Beneficiary;

        if (!galleryEventModel || !beneficiaryModel) {
            console.error("Models missing from Prisma client:", { 
                galleryEvent: !!galleryEventModel, 
                beneficiary: !!beneficiaryModel 
            });
            throw new Error(`Prisma models not found. Available: ${Object.keys(p).filter(k => !k.startsWith('$')).join(', ')}`);
        }

        const galleryEvents = await galleryEventModel.findMany({
            include: { images: true }
        });

        const beneficiaries = await beneficiaryModel.findMany();

        return NextResponse.json({
            galleryEvents,
            beneficiaries,
            exportedAt: new Date().toISOString(),
            version: "1.0"
        });
    } catch (error: any) {
        console.error("Export API Error:", error);
        return NextResponse.json({ 
            error: "Failed to export data", 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
