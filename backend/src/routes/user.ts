import express, { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userMiddleware from "../middlewares/user";

const userRouter: Router = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const schema = z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(3),
        });

        const result = schema.safeParse(req.body);
        if (!result.success) {
            console.log("Validation Error:", result);
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

        const wallet = await prisma.wallet.create({
          data :{
            userId : newUser.id
          }
        })

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


userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const correct = z.object({
            email: z.string().email(),
            password: z.string().min(3)
        });

        const result = correct.safeParse(req.body);
        if (!result.success) {
            console.log("Validation Error:", result);
            return res.status(400).json({ message: "Invalid input" });
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not set" });
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });
        res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});

userRouter.get("/me", userMiddleware, async (req: Request, res: Response) => {
    try {
        const { userId } = req as Request & { userId?: string }; 
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
userRouter.get("/my-balance", userMiddleware, async (req: Request, res: Response)=>{
  try{
    const {userId} = req;
    const balance = await prisma.wallet.findUnique({
      where : { userId },
      select :{
        balance : true,
      }
    })
    if(!balance){
      return res.status(404).json({
        message : "User balance not found"
      })
    }
    res.status(200).json({
      balance
    })
  }
  catch(e){
    res.status(500).json({
      message : "Something went wrong"
    })
  }
});



userRouter.get("/all-users", userMiddleware, async (req:Request, res:Response)=>{
  try{
    const users = await prisma.user.findMany({
      select:{
        name : true,
        email : true
      }
    })

    if(!users || users.length === 0){
      return res.status(404).json({
        message : "No users found"
      })
    }
    res.status(200).json({
      users
    })
  }
  catch(e){
    res.status(500).json({
      message : "Something went wrong"
    })
  }

})

export default userRouter;