import prisma, { app, server } from "../futureFeIndex";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config();

afterAll(() => {
    server.close();
});

describe("Retreive items", () => {
    it("should get the available test items ", async () => {
        const response = await supertest(app).get("/api/items");
        expect(response.status).toBe(200);
        expect(response.body[0].title).toBe("Pair of Shoes");
    });

    it("should get a single item when the item id is passed in", async () => {
        const response = await supertest(app).get("/api/item/2");
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Trumpet");
    });
});

describe("Create item", () => {
    it("should create an item", async () => {
        const newItem = {
            title: "new test item",
            description: "a brand new test item",
            userId: "1",
        };
        const response = await supertest(app).post("/api/item").send(newItem);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("item succesfully created");
        expect(response.body.newItem.id).toBeDefined();

        const newItemId = response.body.newItem.id;
        await prisma.item.delete({ where: { id: newItemId } });
    });
});
