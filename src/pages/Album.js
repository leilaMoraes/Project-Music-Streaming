import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: true,
      saveList: [],
    };
  }

  async componentDidMount() {
    this.getMusics();
    this.getFavorites();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musics: response,
      loading: false,
    });
  };

  getFavorites = async () => {
    const list = await getFavoriteSongs();
    this.setState({ saveList: list });
  };

  saveFavorites = (id) => {
    const { saveList } = this.state;
    const findFave = saveList.some((song) => song.trackId === id);
    return findFave;
  };

  onChange = async ({ target }) => {
    this.setState({ loading: true });
    const { musics } = this.state;
    const getMusic = musics.find((music) => music.trackId === Number(target.name));
    if (target.checked === true) {
      await addSong(getMusic);
      this.setState((prevState) => ({ loading: false,
        saveList: [...prevState.saveList, getMusic] }));
    } else {
      await removeSong(getMusic);
      const newList = await getFavoriteSongs();
      this.setState({ loading: false, saveList: newList });
    }
  };

  render() {
    const { musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            (musics.map((music, i) => (i === 0
              ? (
                <div key={ i }>
                  <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                  <h2 data-testid="album-name">{ music.collectionName }</h2>
                  <h3 data-testid="artist-name">{ music.artistName }</h3>
                </div>
              )
              : (
                <div key={ music.trackId }>
                  <MusicCard
                    musicName={ music.trackName }
                    preview={ music.previewUrl }
                    musicId={ music.trackId }
                    check={ this.saveFavorites(music.trackId) }
                    onInputChange={ this.onChange }
                  />
                </div>
              ))))
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;

export default Album;
