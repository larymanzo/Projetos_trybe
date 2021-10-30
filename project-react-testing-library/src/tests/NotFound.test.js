import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa componente `NotFound`', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);

      const title = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });

      expect(title).toBeInTheDocument();
    });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen.getByAltText(/Pikachu crying/i);
    expect(imageNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

// ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/125
