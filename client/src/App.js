import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Login from './pages/Login.js';
import NoMatch from './pages/NoMatch.js';
import SingleThought from './pages/SingleThought.js';
import Profile from './pages/Profile.js';
import Signup from './pages/Signup.js';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//setting to the port of the back end environment
const client = new ApolloClient
(
  {
    request: operation => {
      const token = localStorage.getItem('id_token');
      operation.setContext
      (
        {
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        }
      );
    },
    uri: '/graphql'
  }
);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/thought' component={SingleThought} />
                <Route exact path='/profile/:username?' component={Profile} />{/* :username? means its an optional parameter */}
                <Route exact path='/thought/:id' component={SingleThought} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
