import { prisma } from "@/lib/db";
import ScholarshipsClient from "./ScholarshipsClient";

export default async function ScholarshipsPage() {
    let beneficiaries = [];
    
    try {
        beneficiaries = await prisma.beneficiary.findMany({
            orderBy: { sortOrder: 'asc' }
        });
    } catch (error) {
        console.error("Failed to fetch beneficiaries. Did you run 'npx prisma db push'?", error);
        // Fallback to empty array if the DB table doesn't exist yet
    }

    return <ScholarshipsClient beneficiaries={beneficiaries} />;
}