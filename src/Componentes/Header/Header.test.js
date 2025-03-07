import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock do localStorage
beforeEach(() => {
  localStorage.clear(); // Limpar o localStorage antes de cada teste
});

describe('Componente Header', () => {
  
  it('deve exibir o botão "Entrar" quando o usuário não estiver logado', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Verificar se o botão "Entrar" é exibido
    const entrarButton = screen.getByText(/Entrar/i);
    expect(entrarButton).toBeInTheDocument();
  });

  it('deve exibir as informações do usuário e o botão "Sair" quando o usuário estiver logado', () => {
    // Simular dados de usuário no localStorage
    const mockUser = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      roles: 1
    };
    localStorage.setItem('userData', JSON.stringify([mockUser]));

    render(
      <Router>
        <Header />
      </Router>
    );

    // Verificar se o nome do usuário está sendo exibido
    const userName = screen.getByText(/João Silva/i);
    expect(userName).toBeInTheDocument();

    // Verificar se a imagem do usuário está sendo exibida
    const userImage = screen.getByAltText('Online');
    expect(userImage).toBeInTheDocument();

    // Verificar se o link "Sair" está presente
    const logoutLink = screen.getByText(/Sair/i);
    expect(logoutLink).toBeInTheDocument();
  });

  it('deve limpar o localStorage e remover as informações do usuário quando o botão "Sair" for clicado', () => {
    // Simular dados de usuário no localStorage
    const mockUser = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      roles: 1
    };
    localStorage.setItem('userData', JSON.stringify([mockUser]));

    render(
      <Router>
        <Header />
      </Router>
    );

    // Verificar que o nome do usuário e o botão "Sair" estão presentes
    expect(screen.getByText(/João Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/Sair/i)).toBeInTheDocument();

    // Simular o clique no botão "Sair"
    fireEvent.click(screen.getByText(/Sair/i));

    // Verificar se o localStorage foi limpo e o nome do usuário foi removido
    expect(localStorage.getItem('userData')).toBeNull();

    // Verificar se o botão "Entrar" está visível após o logout
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });
});
