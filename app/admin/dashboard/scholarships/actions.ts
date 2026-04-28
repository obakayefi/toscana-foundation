'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function getBeneficiaries() {
    return prisma.beneficiary.findMany({
        orderBy: { sortOrder: 'asc' }
    });
}

export async function createBeneficiary(data: {
    type: string,
    name: string,
    yearJoined: string,
    gender: string,
    img?: string,
    grant?: string,
    schoolName?: string,
    course?: string,
    level?: string,
    craft?: string,
    equipmentGiven?: string,
}) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    // Find highest sortOrder
    const last = await prisma.beneficiary.findFirst({
        where: { type: data.type },
        orderBy: { sortOrder: 'desc' }
    });
    
    await prisma.beneficiary.create({
        data: {
            ...data,
            sortOrder: last ? last.sortOrder + 1 : 0
        }
    });
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function updateBeneficiary(id: string, data: any) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    await prisma.beneficiary.update({
        where: { id },
        data
    });
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function updateBeneficiaryOrders(orderedIds: string[]) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    await prisma.$transaction(
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
    
    await prisma.beneficiary.delete({
        where: { id }
    });
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}
