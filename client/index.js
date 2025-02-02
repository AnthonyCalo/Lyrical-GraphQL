import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import SongList from "./components/SongList";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from "./App";
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o =>o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route exact path="songs/new" component={SongCreate} />
          <Route exact path="songs/:id" component={SongDetail} />
        </Route>
        <SongList />

      </Router>
    </ApolloProvider>
    )
  }

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
