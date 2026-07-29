import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  try {
    const client = new PrismaClient({
      log: ["error"]
    });
    return client;
  } catch (err: any) {
    console.error("PRISMA SINGLETON ERROR:", err);
    throw new Error(`Failed to initialize Prisma: ${err.message}`);
  }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;