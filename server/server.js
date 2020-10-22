const express = require('express');
const path = require('path');

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

//redirect http traffic to https while on heroku since heroku
// wont do this for us
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => 
  {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

//integrate Apollo server with Express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve up static assets from build folder
// if node environment is in production
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(
      path.join(__dirname, '../client/build')
    )
  );
}

app.get('*', (req, res) => {
  res.sendFile(
    path.join(
      __dirname, '../client/build/index.html'
    )
  )
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //log where we can go to test our GQL QPI
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
