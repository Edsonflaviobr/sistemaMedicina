import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdMap } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CriarConta = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post('usuario', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                confirma: formData.senha,
                matricula: formData.matricula,
                roles: formData.roles = 1,
            });

            if (response.status === 201) {
                alert('Conta criada com sucesso!');
                navigate('/login');
            } else {
                alert('Erro ao criar o usuário. E-mail já em uso.');
            }
        } catch (error) {
            console.error('Erro ao criar o usuário', error);
        }
    };

    return (
        <>
            <Header />

            <div className="criar-conta-container">
                <div className="criar-conta-texto">
                    <Title title={<span>Realize seu cadastro no sistema para 
                    ter acesso ao cadastro de avaliações</span>} />
                </div>

                <div className="criar-conta-form">
                    <Text text={<span> FICHA DE CADASTRO </span>} />
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                            leftIcon={<MdAccountCircle />}
                            id="nome"
                            name="nome"
                            control={control}
                            rules={{ required: 'Nome é obrigatório' }}
                            className="criar-conta-input"
                            ariaLabel="Nome completo"
                        />
                        {errors.nome && <span className="input-error">{errors.nome.message}</span>}

                        <Input
                            type="email"
                            placeholder="Digite seu e-mail"
                            leftIcon={<MdEmail />}
                            id="email"
                            name="email"
                            control={control}
                            rules={{ required: 'E-mail é obrigatório' }}
                            className="criar-conta-input"
                            ariaLabel="Endereço de e-mail"
                        />
                        {errors.email && <span className="input-error">{errors.email.message}</span>}

                        <Input
                            type="password"
                            placeholder="Digite uma senha"
                            leftIcon={<MdLock />}
                            id="senha"
                            name="senha"
                            control={control}
                            pattern="[0-9]*"
                            rules={{ required: 'Senha é obrigatório' }}
                            className="criar-conta-input"
                            ariaLabel="Senha"
                        />
                        {errors.senha && <span className="input-error">{errors.senha.message}</span>}

                        <Input
                            type="password"
                            placeholder="Confirme sua senha"
                            leftIcon={<MdLock />}
                            id="confirma"
                            name="confirma"
                            control={control}
                            pattern="[0-9]*"
                            rules={{ required: 'Senha é obrigatório' }}
                            className="criar-conta-input"
                            ariaLabel="Confirmar senha"
                        />
                        {errors.confirma && <span className="input-error">{errors.confirma.message}</span>}

                        <Input
                            type="matricula"
                            placeholder="Digite sua matrícula"
                            leftIcon={<MdMap />}
                            id="matricula"
                            name="matricula"
                            control={control}
                            rules={{ required: 'Matrícula é obrigatória' }}
                            className="criar-conta-input"
                            ariaLabel="Matrícula"
                        />
                        {errors.matricula && <span className="input-error">{errors.matricula.message}</span>}

                        <Button title="Cadastrar" variant="secondary" type="submit" />
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export { CriarConta };
