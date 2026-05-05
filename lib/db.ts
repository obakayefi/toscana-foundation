import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const prismaClientSingleton = () => {
  try {
    // Parse DATABASE_URL, stripping the 'file:' prefix if present
    const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
    const dbRelative = rawUrl.replace(/^file:/, "");
    const dbPath = path.resolve(process.cwd(), dbRelative);
    const normalizedPath = dbPath.replace(/\\/g, "/");
    const adapter = new PrismaBetterSqlite3({ url: `file:${normalizedPath}` });

    const client = new PrismaClient({
      adapter,
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