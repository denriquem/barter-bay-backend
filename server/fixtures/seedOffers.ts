import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
    const offers: any = [];

    fs.createReadStream(path.join(__dirname, "dummyOffers.tsv"))
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
            offers.push({
                id: row.id,
                itemOfferedId: row.itemOfferedId,
                itemRequestedId: row.itemRequestedId,
                offeredById: row.offeredById,
                requestedFromId: row.requestedFromId,
                status: row.status,
            });
        })
        .on("end", async () => {
            for (const offer of offers) {
                await prisma.offer.create({ data: offer });
            }
            console.log("Data has been seeded successfully!");
            await prisma.$disconnect();
        })
        .on("error", (error) => {
            console.error("Error reading the TSV file:", error);
        });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
