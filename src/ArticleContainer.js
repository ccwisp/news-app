import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import LatestNews from './LatestNews';
import SourceNews from './SourceNews';
import SearchedNews from './SearchedNews';

class ArticleContainer extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path={`/`}
            render={(...props) => <LatestNews {...props} key={uuid()} />}
          />
          <Route
            path={`/categories/:sourceId`}
            render={({ match }, props) => (
              <SourceNews
                {...props}
                key={uuid()}
                source={match.params.sourceId}
              />
            )}
          />
          <Route
            path={`/search/:searchId`}
            render={({ match }, props) => (
              <SearchedNews
                {...props}
                key={uuid()}
                query={match.params.searchId}
              />
            )}
          />
          <Route
            exact
            path={`/search`}
            render={() => {
              return [<Redirect to='/'></Redirect>];
            }}
          />
          <Route
            path='*'
            render={() => {
              return [
                <div className='ui segment'>
                  <span color='white'>Looks like you are lost...</span>
                </div>,
                <Link to='/'>Go to Home </Link>,
              ];
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default ArticleContainer;
