import express from "express";
import { expressMiddleware } from "@apollo/server/express4"
import jwt from "jsonwebtoken";
import connectDB from './config/database.js';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './graphql/index.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import path from 'node:path';
import { Request, Response } from 'express';
import config from './config/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { fileURLToPath } from "node:url";

const PORT = config.PORT || 3001;
const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
    schema,
    persistedQueries: false, // Protect against DDOS attacks, recommended by Render
    formatError: (error) => {
        console.error("GraphQL Error:", error);
        return error;
    },
});

const startApolloServer = async () => {
  await server.start();
  await connectDB();

  app.use('/graphql', express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
      authMiddleware({ req });
      const token = req.headers.authorization?.split(" ")[1];
      const user = token ? jwt.verify(token, config.JWT_SECRET) : null;
      return { user };
    }
  }));

  app.use(express.static(path.join(__dirname, "../public/dist")));
  
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();