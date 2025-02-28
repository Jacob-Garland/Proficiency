import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: String!
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
    getUserProfile(id: String!): User
    getUserById(id: String!): User
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUserProfile(username: String, location: String, bio: String, profilePic: String): User
  }
`;

export default userTypeDefs;