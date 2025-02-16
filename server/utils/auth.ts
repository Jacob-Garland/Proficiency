import jwt from "jsonwebtoken";
import { Request } from "express";

const SECRET = process.env.JWT_SECRET || "defaultsecret";
const expiration = "1d";

export const generateToken = (user: any) => {
  const payload = {id: user._id, email: user.email };
  return jwt.sign(payload, SECRET, { expiresIn: expiration });
};

export const authMiddleware = ({ req }: { req: Request }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  if (!token) return null;
  
  try {
    const user = jwt.verify(token, SECRET);
    return user;
  } catch {
    console.warn("Invalid token");
    return null;
  }
};