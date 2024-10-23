import express from "express";
import morgan from "morgan";
import { auth as jwtAuth } from "express-oauth2-jwt-bearer";
import { auth, requiresAuth } from "express-openid-connect";
import { PrismaClient } from "@prisma/client";
import router from "./router";
import cors from "cors";

const port = 8080;

const prisma = new PrismaClient();
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.IssuerBaseURL,
};

app.use(auth(config));

const jwtCheck = jwtAuth({
    audience: "https://barter-bay-api/",
    issuerBaseURL: "https://dev-m0wut2s6duzmzyqq.eu.auth0.com/",
    tokenSigningAlg: "RS256",
});

app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

// app.use("/api", jwtCheck, router);
app.use("/api", router);

app.get("/authorized", function (req, res) {
    res.send("Secured Resource");
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { server, app };
export default prisma;
