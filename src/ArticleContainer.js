import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import LatestNews from './LatestNews';
import SourceNews from './SourceNews';
import SearchedNews from './SearchedNews';

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
          <Redirect from='/search/' to='/' />
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
            path='*'
            render={() => {
              return [
                <div className='ui segment'>
                  <Image
                    fluid
                    src='https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1'
                  />
                  <Link to='/'>
                    <div class='ui floating message'>
                      <h1 class='ui white header'>Return Home...</h1>
                    </div>
                  </Link>
                  ,
                </div>,
              ];
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default ArticleContainer;
