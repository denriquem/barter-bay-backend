import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
    const comments: any = [];

    fs.createReadStream(path.join(__dirname, "dummyComments.tsv"))
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
            comments.push({
                id: row.id,
                content: row.content,
                itemId: row.itemId,
                userId: row.userId,
                createdAt: new Date(row.createdAt),
            });
        })
        .on("end", async () => {
            for (const comment of comments) {
                await prisma.comment.create({ data: comment });
            }
            console.log("Comments have been seeded successfully!");
            await prisma.$disconnect();
        });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
