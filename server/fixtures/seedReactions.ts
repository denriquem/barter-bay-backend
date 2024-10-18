import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
    const reactions: any = [];

    fs.createReadStream(path.join(__dirname, "dummyReactions.tsv"))
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
            reactions.push({
                id: row.id,
                emoji: row.emoji,
                itemId: row.itemId !== "NULL" ? row.itemId : null,
                commentId: row.commentId !== "NULL" ? row.commentId : null,
                userId: row.userId,
                createdAt: new Date(row.createdAt),
            });
        })
        .on("end", async () => {
            for (const reaction of reactions) {
                await prisma.reaction.create({ data: reaction });
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
