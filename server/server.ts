import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectDB from './config/database.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { authMiddleware } from './utils/auth.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const corsOptions = {
    origin: ["https://proficiency.onrender.com"],
    credentials: true,
    methods: ["GET, POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions),);
app.use(bodyParser.json());
app.options("*", cors(corsOptions));

app.get("/", (_req, res) => {
    res.send("GraphQL server is running.");
});

connectDB();

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
    context: ({ req }) => {
        authMiddleware({ req });
        const token = req.headers.authorization?.split(" ")[1];
        const user = getUserFromToken(token);
        return { user };
    },
    persistedQueries: false, // Protect against DDOS attacks, recommended by Render
});

async function startServer() {
    await connectDB();
    await server.start();
    console.log('🚀 Server started!')

    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: false, // CORS already handled above
    });
  
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}
  
startServer().catch((err) => {
    console.error('Server startup error:', err);
});