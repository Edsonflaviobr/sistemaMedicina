import React from 'react';
import './styles.css';

const LabelInput = ({ label, value, onChange, id, type = 'text' }) => {
  return (
    <div className="form-group">
      <label label htmlFor={id} >{label}</label>
      <input
        id={id} // Associando o id ao input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${label.toLowerCase()}`}
      />
    </div>
  );
};

export default LabelInput