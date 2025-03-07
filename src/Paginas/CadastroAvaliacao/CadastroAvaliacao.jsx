import React, { useState } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api.js';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';
import { jsPDF } from 'jspdf';

const CadastroAvaliacao = () => {
  const [data_select, setData_Select] = useState(null);
  const [hora_select, setHora_Select] = useState(null);
  const [nome_paciente, setNomePaciente] = useState('');
  const [hd_paciente, setHdPaciente] = useState('');
  const [previa_paciente, setPreviaPaciente] = useState('');
  const [pi, setPi] = useState('');
  const [hand, setHand] = useState('');
  const [peak, setPeak] = useState('');
  const [ims, setIms] = useState('');
  const [mrc, setMrc] = useState('');
  const navigate = useNavigate();

  const handleDataSelecionada = (date) => {
    setData_Select(date);
  };

  const handleHoraSelecionada = (time) => {
    setHora_Select(time);
  };

  const handleCadastrar = async () => {
    try {
      if (!data_select || !hora_select) {
        alert('Por favor, selecione uma data e hora.');
        return;
      }

      const dataFormatted = data_select.toISOString().split('T')[0];
      const horaFormatted = hora_select.toTimeString().split(' ')[0];
      const formData = {
        data_select: dataFormatted,
        hora_select: horaFormatted,
        nome_paciente,
        hd_paciente,
        pi,
        hand,
        peak,
        ims,
        mrc,
      };

      const url = '/avaliacao'; // Corrigido a definição da URL
      const response = await api.post(url, formData);

      if (response.status === 201) {
        alert('Avaliação cadastrada com sucesso!');
        const doc = new jsPDF();
        doc.text('Dados da Avaliação', 10, 10);
        doc.text(`Data: ${dataFormatted}`, 10, 20);
        doc.text(`Hora: ${horaFormatted}`, 10, 30);
        doc.text(`Nome do Paciente: ${nome_paciente}`, 10, 40);
        doc.text(`Diagnóstico do Paciente: ${hd_paciente}`, 10, 50);
        doc.text(`Doenças Prévias - Comorbidades: ${previa_paciente}`, 10, 60)
        doc.text(`Avaliação Neurológica: ${pi}`, 10, 70);
        doc.text(`Avaliação Cardiológica - Hemodinâmica: ${hand}`, 10, 80);
        doc.text(`Avaliação Respiratória: ${peak}`, 10, 90);
        doc.text(`Avaliação Renal - Hepatológica - Metabólica: ${ims}`, 10, 100);
        doc.text(`Outras Avaliações: ${mrc}`, 10, 110);
        doc.save('AvaliacaoMedicaCadastrada.pdf');
        navigate('/');
      } else {
        console.error('Erro ao cadastrar avaliação', response);
      }
    } catch (error) {
      alert('Erro ao cadastrar avaliação');
      console.error('Erro ao cadastrar avaliação', error);
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Cadastro de Avaliação</h2>
          <div className="form-content">
            {/* Primeira Div - Data, Hora e Nome */}
            <div className="left-column">
              <div className="date-time-container">
                <div>
                  <label className="form-label">Data</label>
                  <DatePicker
                    selected={data_select}
                    onChange={handleDataSelecionada}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Selecione uma data"
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    todayButton="Hoje"
                    minDate={new Date()}
                    maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                  />
                </div>
                <div>
                  <label className="form-label">Hora</label>
                  <DatePicker
                    selected={hora_select}
                    onChange={handleHoraSelecionada}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Hora"
                    dateFormat="HH:mm:ss"
                    placeholderText="Selecione uma hora"
                  />
                </div>
              </div>
              <LabelInput label="Nome do Paciente" value={nome_paciente} onChange={setNomePaciente} id="nome-paciente"/>
              <LabelInput label="Diagnóstico do Paciente" value={hd_paciente} onChange={setHdPaciente} id="hd-paciente"/>
              <LabelInput label="Doenças Prévias - Cobormidades" value={previa_paciente} onChange={setPreviaPaciente} id="previa-paciente"/>
            </div>

            {/* Segunda Div - Diagnóstico e Outros Campos */}
            <div className="right-column">
              <LabelInput label="Avaliação Neurológica" value={pi} onChange={setPi} id="pi" />
              <LabelInput label="Avaliação Cardiológica - Hemodinâmica" value={hand} onChange={setHand} id="hand"/>
              <LabelInput label="Avaliação Respiratória" value={peak} onChange={setPeak} id="peak"/>
              <LabelInput label="Avaliação Renal - Hepática - Metabólica" value={ims} onChange={setIms} id="ims"/>
              <LabelInput label="Outras Avaliações" value={mrc} onChange={setMrc} type="textarea" id="mrc"/>
            </div>
          </div>

          {/* Botão comum para envio */}
          <button type="button" onClick={handleCadastrar}>Cadastrar Avaliação</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export { CadastroAvaliacao };
