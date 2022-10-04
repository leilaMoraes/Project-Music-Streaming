import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      isSearchButtonDisabled: true,
    };
  }

  enableButton = () => {
    const { searchArtist } = this.state;
    const minLength = 2;
    const name = searchArtist.length < minLength;
    this.setState({
      isSearchButtonDisabled: name,
    });
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    return this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  render() {
    const { searchArtist, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist">
          <input
            data-testid="search-artist-input"
            id="search-artist"
            type="text"
            name="searchArtist"
            value={ searchArtist }
            onChange={ this.inputChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isSearchButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
