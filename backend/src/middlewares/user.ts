import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "express";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token not found" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT Secret not set!");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (e) {
        console.error("Token Verification Error:", e);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default userMiddleware;