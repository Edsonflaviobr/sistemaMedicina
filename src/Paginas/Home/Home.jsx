import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import tapi from '../../Assets/Imagens/tapi.jpg';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';

const Home = () => {
    return (
        <>
            <Header />

            <div className="home-container">
                <div className="home-text">
                    <figure>
                        <img src={tapi} alt="Logo Santa Casa" title="Logo Santa Casa" />
                    </figure>

                    <h1>Bem-vindo ao Sistema Integrado de Medicina</h1>
                    <Text text="Essa aplicação web foi desenvolvida para facilitar a logística 
                        de dados colhidos pelos plantonistas médicos no setor da UTI da Santa Casa Misericórdia de Guaxupé" />

                    <Link to="/login">
                        <button className="button--assine">Começar agora</button>
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
};

export { Home };

