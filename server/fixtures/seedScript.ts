import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
    const items: any = [];

    fs.createReadStream(path.join(__dirname, "dummyItems.tsv"))
        .pipe(csv({ separator: "\t" })) // Use \t as the separator for TSV
        .on("data", (row) => {
            items.push({
                id: row.id,
                title: row.title,
                description: row.description,
                ownerId: row.ownerId,
            });
        })
        .on("end", async () => {
            for (const item of items) {
                await prisma.item.create({ data: item });
            }
            console.log("Data has been seeded successfully!");
            await prisma.$disconnect();
        });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
