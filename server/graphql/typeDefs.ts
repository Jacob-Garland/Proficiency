import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;