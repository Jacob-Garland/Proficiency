import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    location: String
    bio: String
    profilePic: String
    createdAt: String!
    posts: [Post]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
    getUser(id: ID!): User
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateProfile(username: String, location: String, bio: String, profilePic: String): User
  }
`;

export default userTypeDefs;