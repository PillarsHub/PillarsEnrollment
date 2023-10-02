import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import  App from './App';
import { BaseUrl, AuthToken } from "./util/baseUrl"

const httpLink = createHttpLink({
  uri: `${BaseUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {  
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json", 
      authorization: AuthToken ? `Bearer ${AuthToken}` : "",
    }
  }
}); 


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);