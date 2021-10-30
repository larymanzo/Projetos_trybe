import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokemons).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se é redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');

    expect(history.location.pathname).toBe('/pagina-nao-existente');
    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
