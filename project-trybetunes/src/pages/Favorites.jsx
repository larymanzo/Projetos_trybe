import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import FavoritesCard from './FavoritesCard';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesList: [],
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    this.setState({
      loading: true,
    });
    const favoritesListRequested = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesList: favoritesListRequested,
    });
  }

  render() {
    const { loading, favoritesList } = this.state;
    const favoritesRender = (
      <div>
        {favoritesList.map((music) => (
          <FavoritesCard
            key={ music.trackId }
            listMusic={ music }
            previewUrl={ music.previewUrl }
            trackName={ music.trackName }
            trackId={ music.trackId }
          />
        ))}
      </div>
    );

    return (
      <main data-testid="page-favorites">
        { loading ? <Loading /> : favoritesRender }
      </main>
    );
  }
}

export default Favorites;
