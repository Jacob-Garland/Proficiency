import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profilePic: String
    location: String
    bio: String
    token: String!
    createdAt: String!
  }

  type Post {
    _id: ID!
    user: User!
    title: String!
    body: String!
    createdAt: String!
  }

  type Album {
    _id: ID!
    user: User!
    name: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getPosts: [Post]
    getUsers: [User]
    getUser(_id: ID!): User
    getPost(_id: ID!): Post
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload!
    updateProfile(email: String!, username: String!, profilePic: String, location: String, bio: String): User
    createPost(_id: ID!, title: String!, body: String!): Post
    updatePost(_id: ID!, title: String!, body: String!): Post
  }
`;

export default typeDefs;