import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import AlbumCard from './AlbumCard';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      music: [],
      listMusic: [],
    };
  }

  componentDidMount = () => {
    this.handleFetch();
  }

  handleFetch = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const albumMusics = await getMusics(id);
    this.setState({
      music: albumMusics[0],
      loading: false,
      listMusic: albumMusics,
    });
  }

  render() {
    const { loading, music, listMusic } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-album">
        <div>
          <AlbumCard
            collectionId={ music.collectionId }
            key={ music.collectionId }
            title={ music.collectionName }
            artistName={ music.artistName }
          />
        </div>
        <div>
          {listMusic.slice(1)
            .map((musics) => (
              <MusicCard
                key={ musics.trackId }
                previewUrl={ musics.previewUrl }
                trackName={ musics.trackName }
                trackId={ musics.trackId }
                listMusic={ musics }
              />
            ))}
        </div>
      </div>
    );
  }
}

// ref: Izabela Guarino
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
