import jwt from "jsonwebtoken";
import { Request } from "express";

const SECRET = process.env.JWT_SECRET || 'supersecret';
const expiration = "1d";

export const generateToken = (user: any) => {
  const payload = {id: user._id, email: user.email };
  return jwt.sign(payload, SECRET, { expiresIn: expiration });
};

export const authMiddleware = ({ req }: { req: Request }) => {
  let token = req.headers.authorization || '';

  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, SECRET) as { data: any };
    return { user: data };
  } catch {
    console.warn('Invalid token');
    return { user: null };
  }
};