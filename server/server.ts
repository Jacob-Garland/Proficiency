import express from "express";
import { expressMiddleware } from "@apollo/server/express4"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectDB from './config/database.js';
import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { authMiddleware } from './utils/auth.js';
import path from 'node:path';
import { Request, Response } from 'express';

dotenv.config();

const getUserFromToken = (token: string | undefined) => {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded;
    } catch (error) {
      return null;
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false, // Protect against DDOS attacks, recommended by Render
    formatError: (error) => {
        console.error("GraphQL Error:", error);
        return error;
    },
});

const startApolloServer = async () => {
  await server.start();
  await connectDB();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any, {
    context: async ({ req }) => {
      authMiddleware({ req });
      const token = req.headers.authorization?.split(" ")[1];
      const user = getUserFromToken(token);
      return { user };
    }
    }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();