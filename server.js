const express = require('express');

//import apollo server
const { ApolloServer } = require('apollo-server-express');

//import typedefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

//import middleware function for auth
const { authMiddleware } = require('./utils/auth.js');

const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();

//create a new Apollo server and pass in our schema data
const server = new ApolloServer
(
  {
    typeDefs,
    resolvers,
    context: authMiddleware// ({ req }) => req.headers
    
  }
);

//integrate Apollo server with Express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('*', (req, res) => {
//   res.status(404)
//   .sendFile(
//       path.join(__dirname, './public/404.html')
//     );
// })

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //log where we can go to test our GQL QPI
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
