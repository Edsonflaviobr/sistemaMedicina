import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./Styles/global";
import { Login } from "./Paginas/Login/Login.jsx"
import { Home } from "./Paginas/Home/Home.jsx"
import { CriarConta } from "./Paginas/CriarConta/CriarConta.jsx";
import { CadastroAvaliacao } from "./Paginas/CadastroAvaliacao/CadastroAvaliacao.jsx";
import { ConsultaAdministrador } from "./Paginas/ConsultaAdministrador/ConsultaAdministrador.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/cadastro-avaliacao" element={<CadastroAvaliacao/>} />
          <Route path="/consulta-administrador" element={<ConsultaAdministrador />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
