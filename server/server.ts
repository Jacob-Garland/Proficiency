import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './config/database.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { verifyToken } from './utils/auth.js';

dotenv.config();

const app = express();
app.use(cors());

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = verifyToken(token);
        return { user };
    },
});

server.start().then(() => {
    server.applyMiddleware({ app });
  
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}/graphql`);
    });
});