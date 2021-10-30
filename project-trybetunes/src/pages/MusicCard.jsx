import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
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

  // ref: https://github.com/tryber/sd-014-b-project-trybetunes/pull/83/files
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

  // ref: https://github.com/tryber/sd-014-b-project-trybetunes/pull/83/files
  loadFavorites = async () => {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((favoriteSong) => {
      if (favoriteSong.trackId === trackId) {
        this.setState({ checked: true });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    const cardMusic = (
      <section className="Card">
        <h3>
          { trackName }
        </h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <form>
          <label htmlFor={ trackName }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name={ trackName }
              id={ trackId }
              onChange={ this.handleChange }
              checked={ checked }
            />
          </label>
        </form>
      </section>
    );

    return (
      loading ? <Loading /> : cardMusic
    );
  }
}

MusicCard.propTypes = {
  listMusic: PropTypes.objectOf(PropTypes.object),
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
}.isRequired;

export default MusicCard;
