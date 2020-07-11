import React, { Component } from 'react';
import './App.css';
import TopMenu from './TopMenu';
import ArticleContainer from './ArticleContainer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='ui  header'>
          <TopMenu />
        </div>

        <div
          className='ui center aligned page grid'
          style={{ marginTop: '40px', backgroundColor: '#282c34' }}
        >
          <ArticleContainer />
        </div>
      </div>
    );
  }
}

export default App;
