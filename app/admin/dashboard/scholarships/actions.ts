'use server';

import { prisma } from "@/lib/db";
import cloudinary, { uploadToCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function getBeneficiaries() {
    return await prisma.beneficiary.findMany({
        orderBy: { sortOrder: 'asc' }
    });
}

/**
 * Upload a beneficiary photo to Cloudinary.
 * Called client-side via a server action — accepts FormData with an "image" file.
 */
export async function uploadBeneficiaryImage(formData: FormData): Promise<{ url: string; publicId: string }> {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    const file = formData.get("image") as File;
    if (!file || file.size === 0) throw new Error("No image provided");

    return uploadToCloudinary(file, 'toscana-scholars');
}

export async function createBeneficiary(beneficiaryData: {
    type: 'academic' | 'youth',
    name: string,
    yearJoined: string,
    gender: string,
    img?: string,
    imgPublicId?: string,
    grant?: string,
    schoolName?: string,
    course?: string,
    level?: string,
    craft?: string,
    equipmentGiven?: string,
}) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    const sameType = await prisma.beneficiary.findMany({
        where: { type: beneficiaryData.type },
        select: { sortOrder: true }
    });
    const maxSortOrder = sameType.reduce((max, b) => Math.max(max, b.sortOrder), -1);

    const newBeneficiary = await prisma.beneficiary.create({
        data: {
            ...beneficiaryData,
            sortOrder: maxSortOrder + 1,
            img: beneficiaryData.img || null,
            imgPublicId: beneficiaryData.imgPublicId || null,
        }
    });

    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true, beneficiary: newBeneficiary };
}

export async function updateBeneficiary(id: string, updateData: any) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    // Strip out immutable and system fields to prevent Prisma schema validation errors
    const { id: _id, createdAt: _created, updatedAt: _updated, ...cleanData } = updateData;

    // If image is being replaced and there was an old one, delete it from Cloudinary
    if (cleanData.imgPublicId !== undefined) {
        const existing = await prisma.beneficiary.findUnique({ where: { id }, select: { imgPublicId: true } });
        if (existing?.imgPublicId && existing.imgPublicId !== cleanData.imgPublicId) {
            await cloudinary.uploader.destroy(existing.imgPublicId).catch(() => {});
        }
    }

    const updatedBeneficiary = await prisma.beneficiary.update({
        where: { id },
        data: cleanData
    });

    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true, beneficiary: updatedBeneficiary };
}

export async function updateBeneficiaryOrders(orderedIds: string[]) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    await Promise.all(
        orderedIds.map((id, index) =>
            prisma.beneficiary.update({
                where: { id },
                data: { sortOrder: index }
            })
        )
    );

    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function deleteBeneficiary(id: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    // Clean up Cloudinary image if it exists
    const beneficiary = await prisma.beneficiary.findUnique({ where: { id }, select: { imgPublicId: true } });
    if (beneficiary?.imgPublicId) {
        await cloudinary.uploader.destroy(beneficiary.imgPublicId).catch(() => {});
    }

    await prisma.beneficiary.delete({ where: { id } });

    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}
