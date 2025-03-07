import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { MdAccountCircle } from 'react-icons/md';

describe('Componente Input', () => {
  it('deve renderizar o ícone e o campo de input', () => {
    render(<Input leftIcon={<MdAccountCircle />} name="nome" placeholder="Nome" type="text" />);
    
    // Verifica se o ícone está presente
    expect(screen.getByTestId('icon-container')).toBeInTheDocument();

    // Verifica se o input está presente
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
  });

  it('deve chamar o evento onChange corretamente', () => {
    const mockOnChange = jest.fn();
    render(<Input name="nome" placeholder="Nome" type="text" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Nome');
    fireEvent.change(input, { target: { value: 'Novo Nome' } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
