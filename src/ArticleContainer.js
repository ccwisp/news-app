import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import LatestNews from './LatestNews';
import SourceNews from './SourceNews';
import SearchedNews from './SearchedNews';
import ErrorPage from './ErrorPage';

class ArticleContainer extends Component {
  render() {
    return (
      <div className='App'>
        {/* Creating router for rendering latest, sorted , and searched news */}
        <Switch>
          <Route
            exact
            path={`/`}
            render={(...props) => <LatestNews {...props} key={uuid()} />}
          />
          <Redirect exact from='/search/' to='/' />
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

          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}
export default ArticleContainer;
