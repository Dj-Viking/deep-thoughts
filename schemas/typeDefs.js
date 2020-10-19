//import the GraphQL tagged template function
//this is a tag template function which is advanced use
// of template literals
// its from a library that provides explicit details on how
// it's used in a situation. 


const { gql } = require('apollo-server-express');
//create typeDefs
const typeDefs = gql`

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;
//export the typedefs
module.exports = typeDefs;

//exclamation point in the query data type indicates
// for the query to be carried out, the data must exist
// otherwise apollo will return an error to client
// making the request and then the query wont even
// reach the resolver function associated with it