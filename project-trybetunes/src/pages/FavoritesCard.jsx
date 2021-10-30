import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class FavoritesCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  handleChange = async ({ target: { checked } }) => {
    const { listMusic } = this.props;
    this.setState({
      loading: true,
    });
    if (!checked) {
      await removeSong(listMusic);
      this.setState({
        checked: false,
      });
    } else {
      this.setState({
        checked: true,
      });
      await addSong(listMusic);
    }
    this.setState({
      loading: false,
    });
  }

  loadFavorites = async () => {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((favoriteSong) => {
      if (favoriteSong.trackId === trackId) {
        this.setState({
          checked: true,
        });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    const isFavorite = checked;
    const musicCard = (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <form>
          <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
            Favorita
            <input
              id={ trackId }
              type="checkbox"
              onChange={ this.handleChange }
              checked={ checked }
            />
          </label>
        </form>
      </div>
    );

    return (
      <div>
        { loading && <Loading /> }
        { isFavorite && musicCard }
      </div>
    );
  }
}

FavoritesCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default FavoritesCard;

// ref https://github.com/tryber/sd-014-b-project-trybetunes/pull/83
