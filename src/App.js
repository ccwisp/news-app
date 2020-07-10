import React, { Component } from 'react';
import './App.css';
import TopMenu from './TopMenu';
import ArticleContainer from './ArticleContainer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='header'>
          <TopMenu />
        </div>

        <div
          className='ui one column stackable center aligned page grid'
          style={{ marginTop: '40px' }}
        >
          <ArticleContainer />
        </div>
      </div>
    );
  }
}

export default App;
