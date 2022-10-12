import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      musicName,
      preview,
      musicId,
      onInputChange,
    } = this.props;
    return (
      <div>
        <h4>{ musicName }</h4>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-song">
          <input
            data-testid={ `checkbox-music-${musicId}` }
            id="favorite-song"
            type="checkbox"
            name={ musicId }
            onChange={ onInputChange }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  musicId: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default MusicCard;
