import { Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { generateToken } from '../utils/generateToken.js';

export const authMiddleware = ({ req }: { req: Request }) => {
    let token = req.headers.authorization || '';
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
  
    if (!token) {
      return { user: null };
    }
  
    try {
      const decodedUser = jwt.verify(token, config.JWT_SECRET!);
      return { user: decodedUser };
    } catch (error) {
      if ((error as jwt.JsonWebTokenError).name === 'TokenExpiredError') {
        console.log('Token expired. Refreshing token...');
        const user = jwt.decode(token) as { id: string, email: string };
        const newToken = generateToken({ _id: user.id, email: user.email });
        return { user, newToken };
      }
      console.error("Invalid token:", error);
      return { user: null };
    }
  };