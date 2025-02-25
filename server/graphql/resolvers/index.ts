import userResolvers from "./user.js";
import postResolvers from "./post.js";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};

export default resolvers;