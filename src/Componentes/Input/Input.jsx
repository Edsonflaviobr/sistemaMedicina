import React from 'react';
import { Controller } from 'react-hook-form';
import './styles.css';

const Input = ({ leftIcon, name, control, placeholder, type, rules, ariaLabel, ...rest }) => {
  return (
    <div className="input-container">
      {leftIcon && <div className="icon-container">{leftIcon}</div>}

      <Controller
        name={name}
        control={control}
        rules={rules} 
        render={({ field }) => (
          <input
            className="input-text"
            placeholder={placeholder}
            type={type}
            id={name}
            aria-label={ariaLabel || placeholder}  /* Usando o placeholder como fallback */
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export { Input };
