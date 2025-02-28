import { gql } from "@apollo/client";

// User Signup
export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// User Login
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

// Update User Profile
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($bio: String, $location: String, $profilePic: String) {
    updateUserProfile(bio: $bio, location: $location, profilePic: $profilePic) {
      id
      username
      bio
      location
      profilePic
    }
  }
`;