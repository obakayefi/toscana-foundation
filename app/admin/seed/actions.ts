'use server';

import { readData, writeData, AppData } from "@/lib/json-db";
import { verifyAdmin } from "../actions";
import { revalidatePath } from "next/cache";

export async function seedFromJson(jsonData: any) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const { galleryEvents, beneficiaries } = jsonData;
    
    const data: AppData = {
        galleryEvents: (galleryEvents || []).map((e: any) => ({
            ...e,
            id: e.id || crypto.randomUUID(),
            createdAt: e.createdAt || new Date().toISOString()
        })),
        beneficiaries: (beneficiaries || []).map((b: any) => ({
            ...b,
            id: b.id || crypto.randomUUID(),
            createdAt: b.createdAt || new Date().toISOString()
        })),
        updatedAt: new Date().toISOString()
    };

    await writeData(data);

    revalidatePath('/admin/dashboard');
    revalidatePath('/gallery');
    revalidatePath('/scholarships');
    revalidatePath('/about');
    
    return { 
        success: true, 
        count: (galleryEvents?.length || 0) + (beneficiaries?.length || 0) 
    };
}
