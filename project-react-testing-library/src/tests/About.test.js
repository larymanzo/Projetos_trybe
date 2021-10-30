import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o componente about', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const h2Heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2Heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application simulates/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = screen.getByText(/One can filter/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/125
