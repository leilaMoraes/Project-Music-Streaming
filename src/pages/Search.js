import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import EachAlbum from '../components/EachAlbum';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      albuns: [],
      emptyAlbuns: false,
      searchName: '',
    };
  }

  enableButton = () => {
    const { searchArtist } = this.state;
    const minLength = 2;
    const name = searchArtist.length < minLength;
    this.setState({
      isSearchButtonDisabled: name,
      albuns: [],
      emptyAlbuns: false,
    });
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    return this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  searchArtistBtn = async () => {
    const { searchArtist } = this.state;
    this.setState({ isLoading: true });
    const result = await searchAlbumsAPI(searchArtist);
    if (result.length <= 0) {
      this.setState({ emptyAlbuns: true, isLoading: false });
    } if (result.length > 0) {
      this.setState({ isLoading: false,
        albuns: result,
        searchName: searchArtist,
        searchArtist: '',
      });
    }
  };

  render() {
    const { searchArtist, isSearchButtonDisabled, isLoading, albuns, emptyAlbuns,
      searchName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
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
              onClick={ this.searchArtistBtn }
            >
              Pesquisar
            </button>
          </div>
        )}
        {emptyAlbuns && <h2>Nenhum álbum foi encontrado</h2>}
        {albuns.length > 0 && (
          <h3>
            Resultado de álbuns de:
            {' '}
            { searchName.toUpperCase() }
          </h3>)}
        {albuns.map((album) => (
          <EachAlbum
            key={ album.collectionId }
            artistName={ album.artistName }
            albumId={ album.collectionId }
            albumName={ album.collectionName }
            url={ album.artworkUrl100 }
          />))}
      </div>
    );
  }
}

export default Search;
