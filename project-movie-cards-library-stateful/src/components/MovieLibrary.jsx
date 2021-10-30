import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import data from '../data';

class MovieLibrary extends React.Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <MovieList movies={ data } />
        <AddMovie />
      </div>
    );
  }
}

export default MovieLibrary;
