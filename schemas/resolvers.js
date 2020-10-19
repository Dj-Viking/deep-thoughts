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
    //get all thoughts from username and sort them 
    // or all of them if a username is not passed into graphQL
    thoughts: async (parent, args) => {
      const params = args.username ? args.username : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    //get single thought by id
    thought: async(parent, args) => {//destructuring { _id } works but i like the verbose way.. 
      return Thought.findOne({_id: args._id});
    },
    //get all users
    users: async () => {
      return User.find()
      .select('-__v -password')
      .populate('friends')
      .populate('thoughts');
    },
    //get single user by username
    user: async (parent, args) => {
      return User.findOne({username: args.username})
      .select('-__v -password')
      .populate('friends')
      .populate('thoughts');
    }
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