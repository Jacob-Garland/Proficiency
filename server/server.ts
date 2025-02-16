import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/database.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { authMiddleware } from './utils/auth.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const user = authMiddleware({ req });
            return { user };
        },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    try {
        if (!MONGO_URI) {
            throw new Error("MongoDB connection string missing in .env");
        }

        await connectDB();
        
        app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error("❌ Server error:", error);
        process.exit(1);
    }
};

startServer();