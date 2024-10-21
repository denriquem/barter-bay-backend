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

describe("Reaction actions", () => {
    it("should return all reactions for a comment", async () => {
        const response = await supertest(app)
            .get("/api/reactions/c1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body[0].emoji).toBe("grinning_face");
    });

    it("should be able to create a reaction", async () => {
        const newReaction = {
            emoji: "grinning_face",
            itemId: null,
            commentId: "c1",
            userId: "user1",
        };

        const response = await supertest(app)
            .post("/api/reactions")
            .set("Authorization", `Bearer ${token}`)
            .send(newReaction);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("succesfully created reaction");
        expect(response.body.newReaction.id).toBeDefined();

        const newReactionId = response.body.newReaction.id;
        await prisma.reaction.delete({ where: { id: newReactionId } });
    });
});
