import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EachAlbum extends Component {
  render() {
    const {
      artistName,
      albumId,
      url,
      albumName,
    } = this.props;
    return (
      <Link data-testid={ `link-to-album-${albumId}` } to={ `/album/${albumId}` }>
        <img src={ url } alt={ albumName } />
        <h4>{ albumName }</h4>
        <p>{ artistName }</p>
      </Link>
    );
  }
}

EachAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
};

export default EachAlbum;
