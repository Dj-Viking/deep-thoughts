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

  type Query {
    thoughts(username: String): [Thought]
  }
`;
//export the typedefs
module.exports = typeDefs;

