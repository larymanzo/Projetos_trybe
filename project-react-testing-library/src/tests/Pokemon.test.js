import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByText(/All/);
    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card do Pokémon contém o link de detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);
    expect(detailsLink.href).toContain('pokemons/25');
  });

  it('Testa se o redirecionamento para "More Details" é feito corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);
    const favCheck = screen.getByRole('checkbox');

    userEvent.click(favCheck);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favIcon.src).toContain('/star-icon.svg');
  });
});

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/125
// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/33
