import { gql } from "@apollo/client";

// Fetch posts for the home feed (user + friends)
export const GET_FEED_POSTS = gql`
  query GetFeedPosts {
    getFeedPosts {
      id
      user {
        id
        username
        profilePic
      }
      title
      content
      images
      createdAt
    }
  }
`;

// Fetch posts from a specific user
export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    getUserPosts(userId: $userId) {
      id
      title
      content
      images
      createdAt
    }
  }
`;