import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(beneficiaries);
  } catch (error: any) {
    console.error("API GET /api/scholarships error:", error);
    return NextResponse.json(
      { error: "Failed to fetch scholarships/beneficiaries", message: error.message },
      { status: 500 }
    );
  }
}
