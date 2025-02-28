import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'supersecret';
const expiration = "7d";

export const generateToken = (user: any) => {
  const payload = {id: user._id, email: user.email };
  return jwt.sign(payload, SECRET, { expiresIn: expiration });
};