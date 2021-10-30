import React from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieLibrary from './components/SearchBar';
import AddMovie from './components/AddMovie';
import data from './data';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieLibrary />
      <MovieList movies={ data } />
      <AddMovie />
    </div>
  );
}

export default App;
