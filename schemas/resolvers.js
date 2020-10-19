const { User, Thought } = require('../models');
 

// const resolvers = {
//   Query: {
//     thoughts: async () => {
//       return Thought.find().sort({ createdAt: -1 });
//     }
//   }
// }
// query{
// 	thoughts{
//     _id
//     username
//     thoughtText
//     createdAt
//   }
// }

const resolvers = {
  Query: {
    thoughts: async (parent, args) => {
      const params = args.username ? args.username : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  }
}

module.exports = resolvers;

//parent: used if we have nested resolvers to handle more 
// complicated actions. would hold reference to the resolver that 
/// executed the nested resolver function.

//args object of all the values passed into a query or mutation req
// as parameters. can destructure { username } param  out

// context if we need same data to be accessible by all resolvers
// such as a logged-in user's status or API access token, this
// data comes through context parameter object

// info this wil contain extra info about an operation's
// current state.