'use server';

import { readData, writeData, Beneficiary } from "@/lib/json-db";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function getBeneficiaries() {
    const data = await readData();
    return data.beneficiaries.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createBeneficiary(beneficiaryData: {
    type: 'academic' | 'youth',
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
    
    const data = await readData();
    
    // Find highest sortOrder for this type
    const sameType = data.beneficiaries.filter(b => b.type === beneficiaryData.type);
    const maxSortOrder = sameType.reduce((max, b) => Math.max(max, b.sortOrder), -1);
    
    const newBeneficiary: Beneficiary = {
        ...beneficiaryData,
        id: crypto.randomUUID(),
        sortOrder: maxSortOrder + 1,
        createdAt: new Date().toISOString(),
        img: beneficiaryData.img || null
    };
    
    data.beneficiaries.push(newBeneficiary);
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function updateBeneficiary(id: string, updateData: any) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    const index = data.beneficiaries.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Beneficiary not found");
    
    data.beneficiaries[index] = {
        ...data.beneficiaries[index],
        ...updateData,
        updatedAt: new Date().toISOString()
    };
    
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function updateBeneficiaryOrders(orderedIds: string[]) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    
    orderedIds.forEach((id, index) => {
        const bIndex = data.beneficiaries.findIndex(b => b.id === id);
        if (bIndex !== -1) {
            data.beneficiaries[bIndex].sortOrder = index;
        }
    });
    
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}

export async function deleteBeneficiary(id: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    data.beneficiaries = data.beneficiaries.filter(b => b.id !== id);
    
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/scholarships');
    revalidatePath('/admin/dashboard/scholarships');
    return { success: true };
}
