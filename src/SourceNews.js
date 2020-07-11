import React, { Component } from 'react';

import { getSource } from './client';
import { Card } from 'semantic-ui-react';
class SourceNews extends Component {
  state = {
    News: [],
    source: this.props.source,
  };

  loadFromSource(source) {
    getSource(source, (data) => {
      const newSources = data.articles;

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadFromSource(this.state.source);
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
          <h1 class='ui white header'>Showing selected news</h1>
        </div>
        <div class='ui divider'></div>
        {NewsList}
      </div>
    );
  }
}

export default SourceNews;
