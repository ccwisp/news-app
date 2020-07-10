import { Card, Header } from 'semantic-ui-react';
import React, { Component } from 'react';
import { getLatest, loadSource, getSource, getByQuery } from './client';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import Article from './Article';

const matchUrl = window.location.pathname;

class ArticleContainer extends Component {
  state = {
    News: [],
  };

  loadLatestNews() {
    getLatest((data) => {
      const newSources = data.articles.splice(2, 22);

      this.setState({ News: newSources }, () => {});
    });
  }

  loadFromSource(source) {
    getSource(source, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  loadFromQuery(query) {
    getByQuery(query, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadLatestNews();
  }

  render() {
    let NewsList = this.state.News.map((article) => (
      <Article
        key={article.id}
        href={article.url}
        header={article.source.name}
        description={article.description}
        meta={article.author}
      />
    ));

    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              this.loadLatestNews();
              return [
                <div className='ui segment>'>
                  <h1 class='ui white header'>Latest News</h1>
                </div>,
                NewsList,
              ];
            }}
          />
          <Route
            exact
            path={`${matchUrl}/categories/:sourceId`}
            render={({ match }) => {
              this.loadFromSource(match.params.sourceId);
              return [
                <div className='ui segment>'>
                  <h1 class='ui white header'>Showing selected News</h1>
                </div>,
                NewsList,
              ];
            }}
          />
          <Route
            path={`${matchUrl}/search/:searchId`}
            render={({ match }) => {
              this.loadFromQuery(match.params.searchId);
              return [
                <div className='ui segment>'>
                  <h1 class='ui white header'>Showing filtered News</h1>
                </div>,
                NewsList,
              ];
            }}
          />
          <Route
            exact
            path={`${matchUrl}/search`}
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
