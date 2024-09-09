import { app } from "../index";
import supertest from "supertest";

it("should get the available test items ", async () => {
    const response = await supertest(app).get("/api/items");
    expect(response.status).toBe(200);
});
