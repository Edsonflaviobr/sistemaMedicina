import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { api } from '../../Services/api';
import '@testing-library/jest-dom';

jest.mock('../../Services/api');

describe('Página de Login', () => {
  it('deve exibir erro quando credenciais forem inválidas', async () => {
    api.post.mockResolvedValueOnce({ status: 401 }); // Mocking da API

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), { target: { value: 'usuario@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Digite uma senha'), { target: { value: 'senhaErrada' } });
    
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => expect(screen.getByText('Usuário ou senha inválido')).toBeInTheDocument());
  });

  it('deve redirecionar após login bem-sucedido', async () => {
    api.post.mockResolvedValueOnce({ status: 200, data: { token: 'fake-token' } });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), { target: { value: 'usuario@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Digite uma senha'), { target: { value: 'senhaCorreta' } });
    
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => expect(localStorage.getItem('userData')).toBeTruthy());
  });
});
