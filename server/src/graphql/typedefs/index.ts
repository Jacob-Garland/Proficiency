import userTypeDefs from "./user.js";
import postTypeDefs from "./post.js";
import { gql } from "apollo-server-express";

const baseTypeDefs = gql`
  type Query {
    _: String
  }
    
  type Mutation {
    _: String
  }
`;

const typeDefs = [baseTypeDefs, userTypeDefs, postTypeDefs];

export default typeDefs;