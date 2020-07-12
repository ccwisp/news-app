import React, { Component } from 'react';
import { getByExactSources } from '../client';
import { Card } from 'semantic-ui-react';

class SearchedAndFilteredNews extends Component {
  state = {
    News: [],
    query: this.props.query,
    sources: this.props.sources,
  };

  loadFromQueryAndSource(query, sources) {
    getByExactSources(query, sources, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadFromQueryAndSource(this.state.query, this.state.sources);
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
          <h1 class='ui white header'>
            Showing filtered (+ with sources) news
          </h1>
        </div>
        <div class='ui divider'></div>
        {NewsList}
      </div>
    );
  }
}

export default SearchedAndFilteredNews;
