import "dotenv/config";
import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

const prisma = new PrismaClient({
    adapter,
    log: ["error"]
});

async function main() {
    try {
        const events = await prisma.galleryEvent.findMany();
        console.log("Success:", events.length);
    } catch (e) {
        console.error("Failed:", e);
    }
}
main();
