import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class Article extends Component {
  render() {
    return (
      <Card
        fluid
        key={this.props.key}
        href={this.props.href}
        header={this.props.header}
        meta={this.props.meta}
        description={this.props.description}
      ></Card>
    );
  }
}

export default Article;
