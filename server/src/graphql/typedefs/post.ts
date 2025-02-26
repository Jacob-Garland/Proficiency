import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type Post {
    id: ID!
    user: User!
    title: String!
    content: String!
    images: [String]
    createdAt: String!
  }

  extend type Query {
    getPost(id: ID!): Post
    getUserPosts(userId: ID!): [Post]
  }

  extend type Mutation {
    createPost(content: String!, images: [String]): Post
    deletePost(id: ID!): Boolean
  }
`;

export default postTypeDefs;