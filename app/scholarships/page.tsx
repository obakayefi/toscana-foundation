import { prisma } from "@/lib/db";
import ScholarshipsClient from "./ScholarshipsClient";

export default async function ScholarshipsPage() {
    let beneficiaries: any[] = [];
    
    try {
        beneficiaries = await prisma.beneficiary.findMany({
            orderBy: { sortOrder: 'asc' }
        });
    } catch (error) {
        console.error("Failed to fetch beneficiaries from MongoDB:", error);
    }

    return <ScholarshipsClient beneficiaries={beneficiaries} />;
}