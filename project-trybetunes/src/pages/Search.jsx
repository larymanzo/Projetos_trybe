import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showButton: true,
      searchBar: '',
      album: [],
      loading: false,
      notFound: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const NAME_LOGIN = 2;
    this.setState({ [name]: value });
    if (value.length >= NAME_LOGIN) {
      (this.setState({ showButton: false }));
    } else {
      (this.setState({ showButton: true }));
    }
  }

  onClick = async () => {
    const { searchBar } = this.state;
    this.setState({
      album: [],
      searchBar: '',
      loading: true,
      notFound: false,
    }, async () => {
      const albuns = await searchAlbumsAPI(searchBar);
      if (albuns.length === 0) {
        this.setState({
          loading: false,
          notFound: true,
        });
      } else {
        this.setState({
          album: albuns,
          loading: false,
          notFound: false,
          artistName: searchBar,
        });
      }
    });
  }

  render() {
    const { searchBar, showButton, album, loading, notFound, artistName } = this.state;
    const searchForm = (
      <form data-testid="page-search">
        <label htmlFor="searchBar">
          Pesquisar
          <input
            value={ searchBar }
            type="text"
            data-testid="search-artist-input"
            name="searchBar"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ showButton }
          type="button"
          data-testid="search-artist-button"
          onClick={ this.onClick }
        >
          Procurar
        </button>
        <div>
          {artistName && <div>{ `Resultado de álbuns de: ${artistName}` }</div>}
          {notFound && <div>Nenhum álbum foi encontrado</div>}
          {album.map((albuns) => (
            <Card
              collectionId={ albuns.collectionId }
              key={ albuns.collectionId }
              title={ albuns.collectionName }
              artistName={ albuns.artistName }
              image={ albuns.artworkUrl100 }
            />
          ))}
        </div>
      </form>
    );

    return (
      <div>
        {loading ? <Loading /> : searchForm}
      </div>
    );
  }
}

export default Search;
