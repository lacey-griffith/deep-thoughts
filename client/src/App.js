import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

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
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
        <Home />
        </div>
      <Footer />
      </div>
  </ApolloProvider>
  );
}

export default App;
