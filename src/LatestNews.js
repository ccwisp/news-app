import React, { Component } from 'react';
import { getLatest } from './client';
import { Card } from 'semantic-ui-react';

class LatestNews extends Component {
  state = {
    News: [],
  };

  loadLatestNews() {
    getLatest((data) => {
      const newSources = data.articles.filter((n) => n.author !== null);

      console.log(newSources);

      this.setState({ News: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadLatestNews();
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
      ></Card>
    ));
    return (
      <div className='ui segment'>
        {' '}
        <div className='ui segment>'>
          <h1 class='ui white header'>Latest News</h1>
        </div>
        <div class='ui divider'></div>
        {NewsList}
      </div>
    );
  }
}

export default LatestNews;
