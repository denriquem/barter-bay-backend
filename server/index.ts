import express from "express";
import router from "./router";
import { auth } from "express-openid-connect";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

const { requiresAuth } = require("express-openid-connect");

import dotenv from "dotenv";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.IssuerBaseURL,
};

app.use(morgan("dev"));
app.use(express.json());

app.use(auth(config));

app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
app.use("/api", requiresAuth(), router);

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { app };
export default prisma;
