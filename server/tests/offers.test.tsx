// import prisma, { app, server } from "../apiServer";
// import supertest from "supertest";
// import dotenv from "dotenv";
// import { getToken } from "../helpers/getToken";

// dotenv.config();

// let token: string;

// beforeEach(async () => {
//     token = await getToken();
// });

// afterAll(async () => {
//     await server.close();
// });

// describe("Retrieve offers", () => {
//     it("should return all offers", async () => {
//         const response = await supertest(app)
//             .get("/api/offers")
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body[0].id).toBe(1);
//     });

//     it("should return the offers received for a given user", async () => {
//         const response = await supertest(app)
//             .get("/api/offers-received/testUser2")
//             .set("Authorization", `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body[0].id).toBe(1);
//     });
// });

// describe("Offer actions", () => {
//     it("should make an offer", async () => {
//         const newOffer = {
//             itemOfferedId: 26,
//             itemRequestedId: 2,
//             offeredById: "2",
//             requestedFromId: "1",
//         };

//         const response = await supertest(app)
//             .post("/api/offers")
//             .set("Authorization", `Bearer ${token}`)
//             .send(newOffer);

//         expect(response.status).toBe(200);
//         expect(response.body.message).toEqual("Offer created");
//         expect(response.body.createdOffer.id).toBeDefined();

//         const createdOffer = response.body.createdOffer.id;
//         await prisma.offer.delete({ where: { id: createdOffer } });
//     });
// });
