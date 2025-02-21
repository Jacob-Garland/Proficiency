import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profilePic: String
    location: String
    bio: String
    albums: [Album]
    posts: [Post]
    token: String!
    createdAt: String!
  }

  type Post {
    _id: ID!
    user: User!
    title: String!
    body: String!
    photos: [String]
    createdAt: String!
  }

  type Album {
    _id: ID!
    user: User!
    name: String!
    photos: [String]
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getPosts: [Post]
    getAlbums: [Album]
    getUsers: [User]
    getUser(_id: ID!): User
    getPost(_id: ID!): [Post]
    getAlbum(_id: ID!): [Album]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload!
    updateProfile(email: String!, username: String!, profilePic: String, location: String, bio: String): User
    createAlbum(_id: ID!, name: String!): Album
    updateAlbum(_id: ID!, name: String!): Album
    createPost(_id: ID!, title: String!, body: String!, photos: [String]): Post
    updatePost(_id: ID!, title: String!, body: String!, photos: [String]): Post
  }
`;

export default typeDefs;