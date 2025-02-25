import { gql } from "@apollo/client";

// Fetch logged-in user's profile
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      username
      email
      location
      bio
      profilePic
      posts {
        _id
        title
        content
        images
        createdAt
      }
    }
  }
`;

// Fetch another user's profile by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      location
      bio
      profilePic
      posts {
        _id
        title
        content
        images
        createdAt
      }
    }
  }
`;