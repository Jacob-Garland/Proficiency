import { gql } from '@apollo/client';

export const ME_QUERY = gql`
query Me {
  me {
    id
    name
    email
    profilePic
    location
    bio
    albums[albums.id, albums.name]
  }
}
`;