import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const notFoundPokFav = screen.getByText(/No favorite pokemon found/);
      expect(notFoundPokFav).toBeInTheDocument();
    });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const pokFavoriteCheckBox = screen.getByRole('checkbox');
    userEvent.click(pokFavoriteCheckBox);

    history.push('/favorites');
    const favoritePokemon = screen.getByText(/Pikachu/i);

    expect(favoritePokemon).toBeInTheDocument();
  });
});

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/6/
// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/29
// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/125
