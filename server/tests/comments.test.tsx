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

describe("Retreive comments", () => {
    it("getCommentsByItem", async () => {
        const response = await supertest(app)
            .get("/api/comments/1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].content).toBe(
            "Great quality chair, really comfortable!"
        );
    });
});

describe("Comment actions", () => {
    it("should create a comment", async () => {
        const newComment = {
            content: "This is the best thing i've ever seen",
            itemId: "1",
            userId: "user_1",
        };
        const response = await supertest(app)
            .post("/api/comment")
            .set("Authorization", `Bearer ${token}`)
            .send(newComment);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("succesfully added comment");
        expect(response.body.newComment.id).toBeDefined();

        const newCommentId = response.body.newComment.id;
        await prisma.comment.delete({ where: { id: newCommentId } });
    });

    it("should delete a comment", async () => {
        const newComment = {
            id: "999900999",
            content: "This is the best thing i've ever seen",
            itemId: "1",
            userId: "user_1",
        };

        await prisma.comment.create({ data: newComment });

        const response = await supertest(app)
            .delete("/api/comment/999900999")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(
            `Comment: 999900999, succesfully deleted`
        );
    });
});
