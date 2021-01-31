import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import { Provider } from 'react-redux';
import store from './data/store';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
