import { Request } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const authMiddleware = ({ req }: { req: Request }) => {
    let token = req.headers.authorization || '';
  
    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
  
    if (!token) {
      return { user: null };
    }
  
    try {
      const decodedToken = jwt.verify(token, SECRET) as unknown as { data: any };
      const { data } = decodedToken;
      return { user: data };
    } catch {
      console.warn('Invalid token');
      return { user: null };
    }
  };