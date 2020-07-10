import React, { Component } from 'react';
import { Menu, Divider, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContactDialogue from './ContactDialogue';
import { getSources } from './client';

export default class TopMenu extends Component {
  state = {
    sources: [],
    searchName: 'valod',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  loadSources() {
    getSources((data) => {
      const randomNum = Math.random() * (33 - 0) + 0;
      const newSources = data.sources.slice(randomNum, 5 + randomNum);
      console.log(newSources);
      this.setState({ sources: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadSources();
  }

  handleSearchChange(evt) {
    this.setState({ searchName: evt.target.value });
  }
  render() {
    const { activeItem } = this.state;
    const sourceList = this.state.sources.map((source) => (
      <Menu.Item
        key={source.id}
        as={Link}
        to={`/categories/${source.id}`}
        name={source.name}
        active={activeItem === source.id}
      >
        {source.name}
      </Menu.Item>
    ));

    return (
      <div className='ui top attached menu'>
        <Link to='/'>
          <h1
            className='ui black header'
            style={{
              marginTop: '10px',
              marginLeft: '10px',
              fontFamily: 'Lucida Console',
              fontSize: '300%',
            }}
          >
            News App
          </h1>
        </Link>

        <Divider />

        <Menu
          inverted
          fixed
          compact
          style={{ marginLeft: '20px', marginRight: '20px' }}
        >
          {sourceList}
        </Menu>

        <div className='ui right menu'>
          <div class='ui action input'>
            <input
              type='text'
              placeholder='Search...'
              onChange={(evt) =>
                this.setState({ searchName: evt.target.value })
              }
            />
            <Button
              as={Link}
              to={`/search/${this.state.searchName}`}
              class='ui icon button'
            >
              <i aria-hidden='true' class='search icon'></i>
            </Button>
          </div>
          <Divider />
          <ContactDialogue />
        </div>
      </div>
    );
  }
}
