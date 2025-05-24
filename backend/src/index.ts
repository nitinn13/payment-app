import { prisma } from "./prisma"; 
import cors from "cors";
import express from "express";
import userRouter from "./routes/user";
import transactionRouter from "./routes/transaction";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test-body", (req, res) => {
  console.log("Request Body:", req.body);
  res.json({ received: req.body });
});
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
