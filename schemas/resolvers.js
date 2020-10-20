const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth.js');

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
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne
        (
          {
            _id: context.user._id
          }
        )
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
        return userData;
      } else {
        throw new AuthenticationError('Not logged in.');
      }
    },
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
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, args) => {
      const user = await User.findOne
      (
        {
          email: args.email,
        }
      );
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addThought: async (parent, args, context) => {
      if (context.user) {//checking for existence of context.user first before accessing this query
        const thought = await Thought.create
        (
          {
            ...args,
            username: context.user.username
          }
        );
        await User.findByIdAndUpdate
        (
          { _id: context.user._id },
          { 
            $push: {
              thoughts: thought._id
            } 
          },
          { new: true }
        );
        return thought;
      } else {
        throw new AuthenticationError("Must be logged in to do that.");
      }
    },
    addReaction: async (parent, args, context) => {
      if (context.user) {//if user is logged on
        const updatedThought = await Thought.findOneAndUpdate
        (
          { _id: args.thoughtId },
          {
            $push: {
              reactions: {
                reactionBody: args.reactionBody,
                username: context.user.username
              }
            }
          },
          { new: true, runValidators: true }
        );
        return updatedThought;
      } else {
        throw new AuthenticationError("Must be logged in to do that.");
      }
    },
    addFriend: async(parent, args, context) => {
      if (context.user) {//if user is logged in
        const updatedUser = await User.findOneAndUpdate
        (
          { _id: context.user._id },
          {
            $addToSet: {
              friends: args.friendId,
              username: args.username
            }
          },
          { new: true }
        );
        return updatedUser;
      } else {
        throw new AuthenticationError("Must be logged in to do that.");
      }
    }
  }
};

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