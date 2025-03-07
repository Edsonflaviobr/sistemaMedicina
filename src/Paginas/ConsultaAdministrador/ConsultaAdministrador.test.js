// src/Paginas/ConsultaAdministrador/ConsultaAdministrador.test.js
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ConsultaAdministrador } from './ConsultaAdministrador';
import { api } from '../../Services/api';
import '@testing-library/jest-dom';

// Mock da API
jest.mock('../../Services/api', () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

describe('Página ConsultaAdministrador', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    api.get.mockClear();
    api.delete.mockClear();
  });

  it('deve renderizar os elementos corretamente', () => {
    render(<ConsultaAdministrador />);

    // Verificar se o título, campo de pesquisa e botão de pesquisar estão presentes
    expect(screen.getByText(/Consultar Usuários/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/Pesquisar/i)).toBeInTheDocument();
  });

  it('deve realizar a pesquisa corretamente e exibir os usuários', async () => {
    // Mock da resposta da API com uma lista de usuários
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Oliveira' },
      ],
    });

    render(<ConsultaAdministrador />);

    // Preencher o campo de pesquisa
    fireEvent.change(screen.getByLabelText(/Nome do usuário/i), {
      target: { value: 'João' },
    });

    // Simula o clique no botão de pesquisa
    fireEvent.click(screen.getByText(/Pesquisar/i));

    // Verifica se a API foi chamada corretamente
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('usuario');
    });

    // Verifica se os usuários filtrados são exibidos corretamente
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Oliveira')).not.toBeInTheDocument();
  });

  it('deve exibir "Carregando..." enquanto a pesquisa está em andamento', async () => {
    // Mock da resposta da API com usuários
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Oliveira' },
      ],
    });

    render(<ConsultaAdministrador />);

    // Simula o clique no botão de pesquisa
    fireEvent.click(screen.getByText(/Pesquisar/i));

    // Verifica se o texto "Carregando..." é exibido
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it('deve excluir o usuário corretamente e atualizar a lista', async () => {
    // Mock da resposta da API com usuários
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Oliveira' },
      ],
    });

    // Mock da resposta da API para deletar o usuário
    api.delete.mockResolvedValueOnce({ status: 204 });

    render(<ConsultaAdministrador />);

    // Simula a pesquisa
    fireEvent.change(screen.getByLabelText(/Nome do usuário/i), {
      target: { value: 'João' },
    });
    fireEvent.click(screen.getByText(/Pesquisar/i));

    // Espera os usuários aparecerem na tabela
    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    // Simula o clique no botão "Deletar" para o usuário "João Silva"
    fireEvent.click(screen.getByText('Deletar'));

    // Verifica se a API foi chamada com o ID correto para deletar o usuário
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('usuario/1');
    });

    // Verifica se o usuário foi removido da tabela
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });

  it('deve exibir um erro se ocorrer uma falha ao deletar o usuário', async () => {
    // Mock da resposta da API com usuários
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Oliveira' },
      ],
    });

    // Mock da resposta da API para falha ao deletar
    api.delete.mockRejectedValueOnce(new Error('Erro ao deletar usuário'));

    render(<ConsultaAdministrador />);

    // Simula a pesquisa
    fireEvent.change(screen.getByLabelText(/Nome do usuário/i), {
      target: { value: 'João' },
    });
    fireEvent.click(screen.getByText(/Pesquisar/i));

    // Espera os usuários aparecerem na tabela
    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    // Simula o clique no botão "Deletar"
    fireEvent.click(screen.getByText('Deletar'));

    // Verifica se um erro foi exibido
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro ao deletar usuário');
    });
  });
});
