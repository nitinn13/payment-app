import { PrismaClient } from "@prisma/client";
import express from "express";
import userRouter from "./routes/user";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
