const express = require("express");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    audience: "https://barter-bay-api/",
    issuerBaseURL: "https://dev-m0wut2s6duzmzyqq.eu.auth0.com/",
    tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

app.get("/authorized", (req: any, res: any) => {
    res.send("secured");
});

app.listen(port);

console.log("Running on port ", port);
