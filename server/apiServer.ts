import express from "express";
import morgan from "morgan";
import { auth } from "express-oauth2-jwt-bearer";
import { PrismaClient } from "@prisma/client";
import router from "./router";

const port = 8080;

const prisma = new PrismaClient();
const app = express();
app.use(morgan("dev"));
app.use(express.json());

const jwtCheck = auth({
    audience: "https://barter-bay-api/",
    issuerBaseURL: "https://dev-m0wut2s6duzmzyqq.eu.auth0.com/",
    tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

app.use("/api", jwtCheck, router);

app.get("/authorized", function (req, res) {
    res.send("Secured Resource");
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { server, app };
export default prisma;
