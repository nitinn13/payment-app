import express, { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter: Router = express.Router(); 

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret not set" });
    }

    const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: "7d" });

    res.status(200).json({
      token,
      message: "User created successfully",
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default userRouter;
