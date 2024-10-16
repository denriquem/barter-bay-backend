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

describe("Retrieve offers", () => {
    it("should return all offers", async () => {
        const response = await supertest(app)
            .get("/api/offers")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe("1");
    });

    it("should return the offers received for a given user", async () => {
        const response = await supertest(app)
            .get("/api/offers-received/user_2")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe("1");
    });
});

describe("Offer actions", () => {
    it("should make an offer", async () => {
        const newOffer = {
            itemOfferedId: "26",
            itemRequestedId: "2",
            offeredById: "2",
            requestedFromId: "1",
        };

        const response = await supertest(app)
            .post("/api/offers")
            .set("Authorization", `Bearer ${token}`)
            .send(newOffer);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Offer created");
        expect(response.body.createdOffer.id).toBeDefined();

        const createdOffer = response.body.createdOffer.id;
        await prisma.offer.delete({ where: { id: createdOffer } });
    });

    it("should return an error if the new offer is incomplete", async () => {
        const newOffer = {
            itemOfferedId: "26",
            requestedFromId: "1",
        };

        const response = await supertest(app)
            .post("/api/offers")
            .set("Authorization", `Bearer ${token}`)
            .send(newOffer);

        expect(response.status).toBe(400);
    });

    it("Should be able to accept an offer", async () => {
        const response = await supertest(app)
            .put("/api/accept-offer/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Offer: 1 has been accepted");
        expect(response.body.updatedOffer.status).toEqual("Accepted");

        await prisma.offer.update({
            where: { id: "1" },
            data: {
                status: "Pending",
            },
        });
    });

    it("Should be able to decline an offer", async () => {
        const response = await supertest(app)
            .put("/api/decline-offer/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Offer: 1, has been declined");
        expect(response.body.updatedOffer.status).toEqual("Declined");

        await prisma.offer.update({
            where: { id: "1" },
            data: {
                status: "Pending",
            },
        });
    });

    it("Should be able to delete an offer", async () => {
        const newOffer = {
            itemOfferedId: "26",
            itemRequestedId: "2",
            offeredById: "2",
            requestedFromId: "1",
        };

        await prisma.offer.create({
            data: { id: "999900999", status: "Pending", ...newOffer },
        });

        const response = await supertest(app)
            .delete("/api/offers/999900999")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.deletedOffer.id).toEqual("999900999");
    });
});
