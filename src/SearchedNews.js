import React, { Component } from 'react';

import { getByQuery } from './client';
import { Card } from 'semantic-ui-react';

class SearchedNews extends Component {
  state = {
    News: [],
    query: this.props.query,
  };

  loadFromQuery(query) {
    getByQuery(query, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadFromQuery(this.state.query);
  }

  render() {
    let NewsList = this.state.News.map((article) => (
      <Card
        image={article.urlToImage}
        key={article.id}
        href={article.url}
        header={article.source.name}
        description={article.description}
        meta={article.author}
      />
    ));

    return (
      <div className='ui segment'>
        {' '}
        <div className='ui segment>'>
          <h1 class='ui white header'>Showing filtered news</h1>
        </div>
        <div class='ui divider'></div>
        {NewsList}
      </div>
    );
  }
}

export default SearchedNews;
