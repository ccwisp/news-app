import { Card, Header } from 'semantic-ui-react';
import React, { Component } from 'react';
import { getLatest, loadSource, getSource } from './client';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import Article from './Article';
import ArticleContainer from './ArticleContainer';
class CategoryPage extends Component {
  state = { News: [], source: this.props.source };

  loadFromSource(source) {
    getSource(source, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.setState({ source: this.props.source });
    this.loadFromSource(this.state.source);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ source: newProps.source });
  }
  render() {
    console.log(withRouter(ArticleContainer));
    let NewsList = this.state.News.map((article) => (
      <Article
        key={article.id}
        href={article.url}
        header={article.source.name}
        description={article.description}
        meta={article.author}
      />
    ));

    return <div className='App'>{NewsList}</div>;
  }
}

export default CategoryPage;
