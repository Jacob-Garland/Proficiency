import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
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
    getUserProfile(id: ID!): User
    getUserById(id: ID!): User
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(input: LoginInput!): AuthPayload
    updateUserProfile(username: String, location: String, bio: String, profilePic: String): User
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

export default userTypeDefs;