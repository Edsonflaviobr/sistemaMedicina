// src/Paginas/CadastroAvaliacao/CadastroAvaliacao.test.js
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CadastroAvaliacao } from './CadastroAvaliacao';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '@testing-library/jest-dom';

// Mock da API
jest.mock('../../Services/api', () => ({
  post: jest.fn(),
}));

// Mock do jsPDF
jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    text: jest.fn(),
    save: jest.fn(),
  })),
}));

// Mock da função useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Página CadastroAvaliacao', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    api.post.mockClear();
    jsPDF.mockClear();
  });

  it('deve renderizar todos os campos corretamente', () => {
    render(<CadastroAvaliacao />);

    // Verificar se os campos de Data e Hora estão presentes
    expect(screen.getByLabelText(/Data/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument();

    // Verificar se os outros campos estão presentes
    expect(screen.getByLabelText(/Nome do Paciente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diagnóstico do Paciente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pressões Respiratórias Máximas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Força de Preensão Palmar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pico de Fluxo Expiratório/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Escala de Funcionalidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/MRC/i)).toBeInTheDocument();
  });

  it('deve exibir alerta quando data ou hora não forem selecionadas', async () => {
    render(<CadastroAvaliacao />);

    // Simula o clique no botão de cadastro
    fireEvent.click(screen.getByText(/Cadastrar Avaliação/i));

    // Verifica se o alerta aparece
    expect(window.alert).toHaveBeenCalledWith('Por favor, selecione uma data e hora.');
  });

  it('deve chamar a API e gerar PDF em caso de sucesso', async () => {
    // Mock da resposta da API com sucesso
    api.post.mockResolvedValueOnce({ status: 201 });

    render(<CadastroAvaliacao />);

    // Preencher os campos com dados de exemplo
    fireEvent.change(screen.getByLabelText(/Nome do Paciente/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Diagnóstico do Paciente/i), { target: { value: 'Pneumonia' } });
    fireEvent.change(screen.getByLabelText(/Pressões Respiratórias Máximas/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Força de Preensão Palmar/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Pico de Fluxo Expiratório/i), { target: { value: '350' } });
    fireEvent.change(screen.getByLabelText(/Escala de Funcionalidade/i), { target: { value: 'Moderada' } });
    fireEvent.change(screen.getByLabelText(/MRC/i), { target: { value: '3' } });

    // Simula a seleção da data e hora
    fireEvent.change(screen.getByLabelText(/Data/i), { target: { value: '2024-11-16' } });
    fireEvent.change(screen.getByLabelText(/Hora/i), { target: { value: '12:30:00' } });

    // Simula o clique no botão de cadastro
    fireEvent.click(screen.getByText(/Cadastrar Avaliação/i));

    // Verifica se a API foi chamada com os dados corretos
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/avaliacao', expect.objectContaining({
        data_select: '2024-11-16',
        hora_select: '12:30:00',
        nome_paciente: 'João Silva',
        hd_paciente: 'Pneumonia',
        pi: '100',
        hand: '30',
        peak: '350',
        ims: 'Moderada',
        mrc: '3',
      }));
    });

    // Verifica se o PDF foi gerado
    expect(jsPDF.mock.instances[0].text).toHaveBeenCalledWith('Dados da Avaliação', 10, 10);
    expect(jsPDF.mock.instances[0].save).toHaveBeenCalledWith('AvaliacaoCadastrada.pdf');

    // Verifica se a navegação ocorreu
    expect(useNavigate()).toHaveBeenCalledWith('/');
  });

  it('deve exibir erro na criação caso a API falhe', async () => {
    // Mock da resposta da API com erro
    api.post.mockResolvedValueOnce({ status: 400 });

    render(<CadastroAvaliacao />);

    // Preencher os campos com dados de exemplo
    fireEvent.change(screen.getByLabelText(/Nome do Paciente/i), { target: { value: 'Maria Oliveira' } });
    fireEvent.change(screen.getByLabelText(/Diagnóstico do Paciente/i), { target: { value: 'Gripe' } });
    fireEvent.change(screen.getByLabelText(/Pressões Respiratórias Máximas/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/Força de Preensão Palmar/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Pico de Fluxo Expiratório/i), { target: { value: '400' } });
    fireEvent.change(screen.getByLabelText(/Escala de Funcionalidade/i), { target: { value: 'Leve' } });
    fireEvent.change(screen.getByLabelText(/MRC/i), { target: { value: '2' } });

    // Simula a seleção da data e hora
    fireEvent.change(screen.getByLabelText(/Data/i), { target: { value: '2024-11-16' } });
    fireEvent.change(screen.getByLabelText(/Hora/i), { target: { value: '13:00:00' } });

    // Simula o clique no botão de cadastro
    fireEvent.click(screen.getByText(/Cadastrar Avaliação/i));

    // Verifica se o erro foi tratado corretamente
    await waitFor(() => expect(screen.getByText(/Erro ao cadastrar avaliação/i)).toBeInTheDocument());
  });
});
