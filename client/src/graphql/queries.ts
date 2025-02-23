import { gql } from '@apollo/client';

export const ME_QUERY = gql`
query Me {
  me {
    _id
    username
    email
    profilePic
    location
    bio
    createdAt
}
`;