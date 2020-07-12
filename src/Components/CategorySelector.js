import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getSources } from '../client';

export default class CategorySelector extends Component {
  state = {
    sources: [],
    searchQuery: '',
  };

  loadSources() {
    getSources((data) => {
      const newSources = data.sources;

      this.setState({ sources: newSources }, () => {});
    });
  }

  sendSources() {
    this.props.sendSources(this.state.value);
  }

  componentDidMount() {
    this.loadSources();
  }

  handleChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, value }, () => this.sendSources());
  };

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { searchQuery, value } = this.state;
    const sourceOptions = this.state.sources.map((s) => ({
      key: s.id,
      text: s.name,
      value: s.id,
    }));

    return (
      <Dropdown
        multiple
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={sourceOptions}
        placeholder='State'
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    );
  }
}
