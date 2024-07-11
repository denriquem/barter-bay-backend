import express from "express";
import router from "./router";
import { PrismaClient } from "@prisma/client";
import morgan from 'morgan'

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default prisma;