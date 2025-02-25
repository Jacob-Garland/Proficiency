import { gql } from "@apollo/client";

// Create a New Post
export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $images: [String]) {
    createPost(content: $content, images: $images) {
      id
      content
      images
      createdAt
      author {
        id
        username
        profilePic
      }
    }
  }
`;

// Delete a Post
export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      success
      message
    }
  }
`;
