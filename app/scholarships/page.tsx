import { readData } from "@/lib/json-db";
import ScholarshipsClient from "./ScholarshipsClient";

export default async function ScholarshipsPage() {
    let beneficiaries = [];
    
    try {
        const data = await readData();
        beneficiaries = data.beneficiaries.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (error) {
        console.error("Failed to fetch beneficiaries from JSON:", error);
    }

    return <ScholarshipsClient beneficiaries={beneficiaries} />;
}