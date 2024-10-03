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

// enforce on all endpoints
app.use(jwtCheck);

app.use("/api", jwtCheck, router);

app.get("/authorized", function (req, res) {
    res.send("Secured Resource");
});

app.listen(port);

console.log("Running on port ", port);

// export default app;

export { app };
export default prisma;
