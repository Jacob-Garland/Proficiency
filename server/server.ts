import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

dotenv.config();

const app = express();

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    });
}

startServer();