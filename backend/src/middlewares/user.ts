import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from '../env'; // Ensure correct import of env
import { prisma } from '../prisma'; // Ensure correct import of prisma

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token not found" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const jwtSecret = env.JWT_SECRET; // Use env here
    if (!jwtSecret) {
      console.error("JWT Secret not set!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid user' });
    }

    req.userId = user.id;
    next();
  } catch (e) {
    console.error("Token Verification Error:", e);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default userMiddleware;