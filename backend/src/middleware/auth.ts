// auth
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";

const SECRET = process.env.JWT_SECRET || "devsecret";

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token provided" });

    const token = header.split(" ")[1];
    const data = jwt.verify(token, SECRET) as any;

    req.userId = data.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
