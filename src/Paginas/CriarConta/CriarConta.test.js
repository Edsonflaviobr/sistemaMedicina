import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CriarConta } from './CriarConta';
import { Button } from '../../Componentes/Button/Button';
import { Input } from '../../Componentes/Input/Input';
import { useForm } from 'react-hook-form';
import { api } from '../../Services/api';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock da função de navegação
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock da API
jest.mock('../../Services/api', () => ({
  post: jest.fn(),
}));

describe('Página Criar Conta', () => {
  it('deve renderizar corretamente todos os elementos', () => {
    render(
      <Router>
        <CriarConta />
      </Router>
    );

    // Verifica se o título é renderizado
    expect(screen.getByText(/Realize seu cadastro no sistema/i)).toBeInTheDocument();

    // Verifica se o formulário contém os campos necessários
    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Endereço de e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Matrícula/i)).toBeInTheDocument();

    // Verifica se o botão de "Cadastrar" está presente
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  });

  it('deve exibir erro se o campo nome não for preenchido', async () => {
    render(
      <Router>
        <CriarConta />
      </Router>
    );

    fireEvent.submit(screen.getByRole('form'));

    // Verifica se a mensagem de erro aparece quando o campo nome não é preenchido
    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument();
  });

  it('deve chamar a API e redirecionar para a página de login em caso de sucesso', async () => {
    // Mock da resposta de sucesso da API
    api.post.mockResolvedValueOnce({ status: 201 });

    render(
      <Router>
        <CriarConta />
      </Router>
    );

    // Preenche os campos do formulário
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Endereço de e-mail/i), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Confirmar senha/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Matrícula/i), { target: { value: '1234' } });

    // Simula o envio do formulário
    fireEvent.submit(screen.getByRole('form'));

    // Verifica se a API foi chamada com os dados corretos
    await waitFor(() => expect(api.post).toHaveBeenCalledWith('usuario', expect.objectContaining({
      nome: 'João Silva',
      email: 'joao@example.com',
      senha: '123456',
      confirma: '123456',
      matricula: '1234',
      roles: 1,
    }));

    // Verifica se o redirecionamento ocorreu para a página de login
    expect(window.location.pathname).toBe('/login');
  });

  it('deve exibir erro se o e-mail já estiver em uso', async () => {
    // Mock da resposta de erro da API (e-mail já em uso)
    api.post.mockResolvedValueOnce({ status: 400 });

    render(
      <Router>
        <CriarConta />
      </Router>
    );

    // Preenche os campos do formulário
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: 'Maria Oliveira' } });
    fireEvent.change(screen.getByLabelText(/Endereço de e-mail/i), { target: { value: 'maria@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Confirmar senha/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Matrícula/i), { target: { value: '5678' } });

    // Simula o envio do formulário
    fireEvent.submit(screen.getByRole('form'));

    // Verifica se a mensagem de erro foi exibida
    expect(await screen.findByText(/Erro ao criar o usuário. E-mail já em uso./i)).toBeInTheDocument();
  });
});
