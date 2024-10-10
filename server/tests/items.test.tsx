import prisma, { app, server } from "../apiServer";
import supertest from "supertest";
import dotenv from "dotenv";
import { getToken } from "../helpers/getToken";

dotenv.config();

let token: string;

beforeEach(async () => {
    token = await getToken();
});

afterAll(async () => {
    await server.close();
});

describe("Retreive items", () => {
    it("should get the available test items ", async () => {
        const response = await supertest(app)
            .get("/api/items")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].title).toBe("Wooden Chair");
    });

    it("should get a single item when the item id is passed in", async () => {
        const response = await supertest(app)
            .get("/api/item/2")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Coffee Table");
    });
});

describe("Create item", () => {
    it("should create an item", async () => {
        const newItem = {
            title: "new test item",
            description: "a brand new test item",
            userId: "1",
        };
        const response = await supertest(app)
            .post("/api/item")
            .set("Authorization", `Bearer ${token}`)
            .send(newItem);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("item succesfully created");
        expect(response.body.newItem.id).toBeDefined();

        const newItemId = response.body.newItem.id;
        await prisma.item.delete({ where: { id: newItemId } });
    });
});
