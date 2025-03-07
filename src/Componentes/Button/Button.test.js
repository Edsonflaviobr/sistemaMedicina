// src/Componentes/Button/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Mock da função onClick
const mockOnClick = jest.fn();

describe('Componente Button', () => {
  it('deve renderizar o título do botão corretamente', () => {
    render(<Button title="Cadastrar" />);
    
    // Verifica se o botão renderiza com o texto correto
    const buttonElement = screen.getByText(/Cadastrar/i); // O texto pode ser case insensitive
    expect(buttonElement).toBeInTheDocument();
  });

  it('deve chamar a função onClick quando clicado', () => {
    render(<Button title="Clique aqui" onClick={mockOnClick} />);
    
    // Simula o clique no botão
    const buttonElement = screen.getByText(/Clique aqui/i);
    fireEvent.click(buttonElement);
    
    // Verifica se a função mockOnClick foi chamada
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
