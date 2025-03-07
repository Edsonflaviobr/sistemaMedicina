import React, { useState } from 'react';
import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdEmail, MdLock } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    try {
      const response = await api.post('usuario/login', {
        email: formData.email,
        senha: formData.senha,
      });

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        navigate('/cadastro-avaliacao');
      } else {
        setError('Usuário ou senha inválido');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Usuário ou senha inválido');
    }
  };

  return (
    <>
      <Header />

      <div className="login-container">
        <div className="login-form">
          <h2>Acesse o Sistema Integrado de Medicina</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              leftIcon={<MdEmail />}
              id="email"
              name="email"
              control={control}
              rules={{
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Digite um e-mail válido',
                },
              }}
              ariaLabel="Endereço de e-mail"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <Input
              type="password"
              placeholder="Digite uma senha"
              leftIcon={<MdLock />}
              id="senha"
              name="senha"
              control={control}
              rules={{
                required: 'Senha é obrigatória'
              }}
              ariaLabel="Senha"
            />
            {errors.senha && <span>{errors.senha.message}</span>}

            {error && <span className="error-message">{error}</span>}

            <Button title="Entrar" variant="secondary" type="submit" />
          </form>

          <div className="links">
            <p><Link to="/criar-conta"> <span className="criar-text">Criar Conta</span></Link></p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export { Login };
