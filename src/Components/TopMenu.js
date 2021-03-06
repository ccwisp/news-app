import React, { Component } from 'react';
import { Menu, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContactDialogue from './ContactDialogue';
import { getSources } from '../client';
import CategorySelector from './CategorySelector';

export default class TopMenu extends Component {
  state = {
    sources: [],
    searchName: '',
    selectedSources: [],
  };

  loadSources() {
    getSources((data) => {
      // Shuffle array
      const shuffled = data.sources.sort(() => 0.5 - Math.random());

      // Get sub-array of first 6 elements after shuffled
      const newSources = shuffled.slice(0, 6);

      this.setState({ sources: newSources }, () => {});
    });
  }

  sendSources = (value) => {
    this.setState({ selectedSources: value });
  };

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
      <div className='ui top attached menu' style={{ height: '6 0px' }}>
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
              to={
                this.state.selectedSources.length
                  ? `/search/filters/${this.state.selectedSources.join()}/${
                      this.state.searchName
                    }`
                  : `/search/${this.state.searchName}`
              }
              class='ui icon button'
            >
              <i aria-hidden='true' class='search icon' />
            </Button>
          </div>
          <CategorySelector sendSources={this.sendSources} />
          <ContactDialogue />
        </div>
      </div>
    );
  }
}
