'use client';

import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  dateFormat?: string; 
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  options,
  disabled = false,
  className = '',
  onBlur,
  dateFormat = 'dd/MM/yyyy' 
}) => {
  const isSelect = type === 'select';
  const isDate = type === 'date';
  
  const formatDateForDisplay = (dateValue: string): string => {
    if (!dateValue || !isDate) return dateValue;
    
    try {
      // Se já estiver no formato dd/mm/yyyy, retornar como está
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
        return dateValue;
      }
      
      // Se estiver no formato yyyy-mm-dd, converter para dd/mm/yyyy
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        const [year, month, day] = dateValue.split('-');
        return `${day}/${month}/${year}`;
      }
      
      // Tentar converter de qualquer formato para o formato desejado
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return dateValue;
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateValue;
    }
  };
  
  const displayValue = isDate ? formatDateForDisplay(value) : value;
  
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">
        {label}
        {required && <span className="text-moty-red ml-1">*</span>}
      </label>
      
      {isSelect ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-moty-red/50 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={displayValue}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || (isDate ? 'dd/mm/aaaa' : undefined)}
          disabled={disabled}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-moty-red/50 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
