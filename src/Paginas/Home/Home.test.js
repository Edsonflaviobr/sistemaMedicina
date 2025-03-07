// src/Paginas/Home/Home.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';
import { BrowserRouter as Router } from 'react-router-dom'; // Necessário para testar o Link
import '@testing-library/jest-dom';

describe('Página Home', () => {
  
  it('deve renderizar corretamente todos os elementos', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Verificar se o título está presente
    expect(screen.getByText(/Bem-vindo ao Sistema Integrado de Fisioterapia/i)).toBeInTheDocument();

    // Verificar se o texto informativo está presente
    expect(screen.getByText(/Essa aplicação web foi desenvolvida para facilitar a logística/i)).toBeInTheDocument();

    // Verificar se a imagem do logo está presente
    const logoImage = screen.getByAltText('Logo Santa Casa');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('tapi.jpg'));

    // Verificar se o botão "Começar agora" está presente
    const button = screen.getByRole('button', { name: /Começar agora/i });
    expect(button).toBeInTheDocument();
  });

  it('deve redirecionar para a página de login ao clicar no botão "Começar agora"', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Verificar se o botão "Começar agora" está presente
    const button = screen.getByRole('button', { name: /Começar agora/i });

    // Simular o clique no botão
    fireEvent.click(button);

    // Verificar se o redirecionamento foi realizado para a página de login
    expect(window.location.pathname).toBe('/login');
  });
});
