import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// establish new link to the server at /graphql endpoint
const httpLink = createHttpLink({
  // location for backend server
  // react server enviroment runs at localhost:3000
  uri: '/graphql'
})

// instantiate apollo client instance and create connection to the above endpoint
// also create new cache object
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App() {
  return (
    //passing in the client object so that everything between the ApolloProvider tag will have access to the data from the API
    <ApolloProvider client={client}>
      <Router>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/profile/:username?' component={Profile}/>
          <Route exact path='/thought/:id' component={SingleThought}/>

          <Route component={NoMatch}/>
          </Switch>
        </div>
      <Footer />
      </div>
      </Router>
  </ApolloProvider>
  );
}

export default App;
