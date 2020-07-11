import React, { Component } from 'react';
import { Menu, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContactDialogue from './ContactDialogue';
import { getSources } from './client';

export default class TopMenu extends Component {
  state = {
    sources: [],
    searchName: '',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSearchChange(evt) {
    this.setState({ searchName: evt.target.value });
  }

  loadSources() {
    getSources((data) => {
      const randomNum = Math.random() * (33 - 0) + 0;
      const newSources = data.sources.slice(randomNum, 5 + randomNum);

      this.setState({ sources: newSources }, () => {});
    });
  }

  componentDidMount() {
    this.loadSources();
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
      <div className='ui top attached menu' style={{ height: '70px' }}>
        <Link to='/'>
          <h1
            className='ui black header'
            style={{
              marginTop: '5px',
              marginLeft: '10px',
              fontFamily: 'Lucida Console',
              fontSize: '240%',
              fontWeight: '900',
            }}
          >
            News App
          </h1>
        </Link>

        <Divider />

        <Menu
          stackable
          borderless
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

          <ContactDialogue />
        </div>
      </div>
    );
  }
}
