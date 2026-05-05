import { readData } from "@/lib/json-db";
import { verifyAdmin } from "@/app/admin/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await readData();

        // Transform relative paths to full CDN URLs if needed
        // Assuming the base URL is provided via env or just use a placeholder if not found
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toscanafoundation.org";
        const cloudinaryBase = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

        const transformImg = (img: string | null) => {
            if (!img) return null;
            if (img.startsWith('http')) return img;
            // If it's a local path, we assume it's hosted on the site or has been uploaded to Cloudinary
            // For the backup, the user specifically wants CDN files.
            // If we have a Cloudinary setup, we might want to point to Cloudinary versions.
            return `${baseUrl}${img}`;
        };

        const exportData = {
            ...data,
            beneficiaries: data.beneficiaries.map(b => ({
                ...b,
                img: transformImg(b.img)
            })),
            galleryEvents: data.galleryEvents.map(e => ({
                ...e,
                images: e.images.map(img => ({
                    ...img,
                    url: transformImg(img.url)
                }))
            })),
            exportedAt: new Date().toISOString(),
            version: "2.0 (JSON-based)"
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
