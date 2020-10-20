import gql from 'graphql-tag';

export const QUERY_THOUGHTS = gql`
  query thoughts {
    thoughts {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;