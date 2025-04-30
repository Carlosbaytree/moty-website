'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import SimulationResult from '../SimulationResult'; // Importar o componente SimulationResult
import { calcularPrecoSeguro } from '@/utils/calcularPrecoSeguro';
import { fetchVehicleDataByPlate } from '@/services/vehicleService';

// Tipos para os dados do formulário
interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  dataCartaConducao: string; // Adicionado campo para data da carta de condução
  matricula: string;
  marca: string;
  modelo: string;
  ano: string;
  cilindrada: string;
  valor: string;
  utilizacao: string;
  tipoSeguro: string;
  formaPagamento: string;
}

// Tipos para os erros de validação
interface FormErrors {
  [key: string]: string;
}

// Componente principal do formulário
const SimuladorForm: React.FC = () => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    dataCartaConducao: '', // Adicionado campo para data da carta de condução
    matricula: '',
    marca: '',
    modelo: '',
    ano: '',
    cilindrada: '',
    valor: '',
    utilizacao: '', // String vazia para forçar escolha consciente
    tipoSeguro: 'responsabilidade-civil',
    formaPagamento: 'anual'
  });
  
  // Estado para os erros de validação
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para o passo atual do formulário
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para o resultado da simulação
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  
  // Estado para mostrar o resumo da proposta
  const [showSummary, setShowSummary] = useState(false);
  
  // Estado para mostrar a confirmação de envio
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Estado para indicar se está buscando dados do veículo
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  
  // Estado para indicar se está enviando o formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'matricula') {
      // Formatar matrícula automaticamente para 11-AA-22
      const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      let formattedValue = cleaned;
      
      // Aplicar formatação apenas se tiver caracteres suficientes
      if (cleaned.length > 2 && cleaned.length <= 4) {
        formattedValue = `${cleaned.substring(0, 2)}-${cleaned.substring(2)}`;
      } else if (cleaned.length > 4) {
        formattedValue = `${cleaned.substring(0, 2)}-${cleaned.substring(2, 4)}-${cleaned.substring(4, 6)}`;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      // Se a matrícula tiver 6 caracteres (sem traços), buscar dados do veículo
      if (cleaned.length === 6) {
        fetchVehicleData(formattedValue);
      }
    } else if (name === 'dataNascimento' || name === 'dataCartaConducao') {
      // Formatar data no padrão dd/mm/yyyy enquanto o usuário digita
      let digits = value.replace(/[^0-9]/g, '');
      let dateValue = '';
      
      // Permitir digitação completa da data
      if (digits.length > 0) {
        // Dia (primeiros 2 dígitos)
        dateValue = digits.substring(0, Math.min(2, digits.length));
        
        // Mês (próximos 2 dígitos)
        if (digits.length > 2) {
          dateValue += '/' + digits.substring(2, Math.min(4, digits.length));
          
          // Ano (próximos 4 dígitos)
          if (digits.length > 4) {
            dateValue += '/' + digits.substring(4, Math.min(8, digits.length));
          }
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: dateValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpar erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Função para buscar dados do veículo a partir da matrícula
  const fetchVehicleData = async (plate: string) => {
    try {
      setIsLoadingVehicle(true);
      
      // Verificar se a matrícula tem o formato correto (XX-XX-XX ou pelo menos 6 caracteres)
      const cleanedPlate = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (cleanedPlate.length < 6) {
        return;
      }
      
      console.log('Buscando dados para a matrícula:', plate);
      
      // Buscar dados do veículo usando o serviço
      const vehicleData = await fetchVehicleDataByPlate(plate);
      
      if (vehicleData) {
        console.log('Dados do veículo encontrados:', vehicleData);
        
        // Atualizar os campos do formulário com os dados do veículo
        setFormData(prev => ({
          ...prev,
          marca: vehicleData.marca,
          modelo: vehicleData.modelo,
          ano: vehicleData.ano,
          cilindrada: vehicleData.cilindrada
        }));
      } else {
        console.log('Veículo não encontrado para a matrícula:', plate);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do veículo:', error);
    } finally {
      setIsLoadingVehicle(false);
    }
  };
  
  // Função para validar o email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Função para validar o telefone
  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]{9}$/;
    return re.test(phone);
  };
  
  // Função para validar a data de nascimento
  const validateBirthDate = (date: string): boolean => {
    if (!date) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: 'A data de nascimento é obrigatória'
      }));
      return false;
    }

    // Verificar se a data está no formato dd/mm/yyyy
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: 'A data deve estar no formato dd/mm/yyyy'
      }));
      return false;
    }

    // Converter a data do formato dd/mm/yyyy para um objeto Date
    const [day, month, year] = date.split('/').map(Number);
    
    // Verificar se os valores são válidos
    if (month < 1 || month > 12) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: 'Mês inválido (deve ser entre 1 e 12)'
      }));
      return false;
    }
    
    // Verificar o número de dias no mês
    const diasNoMes = new Date(year, month, 0).getDate();
    if (day < 1 || day > diasNoMes) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: `Dia inválido (deve ser entre 1 e ${diasNoMes} para o mês ${month})`
      }));
      return false;
    }
    
    // Verificar se o ano é razoável (entre 1900 e o ano atual)
    const anoAtual = new Date().getFullYear();
    if (year < 1900 || year > anoAtual) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: `Ano inválido (deve ser entre 1900 e ${anoAtual})`
      }));
      return false;
    }
    
    const birthDate = new Date(year, month - 1, day);
    
    // Verificar se a data é válida
    if (isNaN(birthDate.getTime())) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: 'Data de nascimento inválida'
      }));
      return false;
    }

    // Verificar se a idade é maior que 18 anos
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const isOver18 = age > 18 || (age === 18 && monthDiff >= 0 && today.getDate() >= birthDate.getDate());

    if (!isOver18) {
      setErrors(prev => ({
        ...prev,
        dataNascimento: 'Deve ter pelo menos 18 anos para contratar um seguro'
      }));
      return false;
    }

    return true;
  };

  // Função para validar a data da carta de condução
  const validateDriverLicenseDate = (date: string, birthDate: string): boolean => {
    if (!date) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: 'A data da carta de condução é obrigatória'
      }));
      return false;
    }

    // Verificar se a data está no formato dd/mm/yyyy
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: 'A data deve estar no formato dd/mm/yyyy'
      }));
      return false;
    }

    // Converter a data do formato dd/mm/yyyy para um objeto Date
    const [day, month, year] = date.split('/').map(Number);
    
    // Verificar se os valores são válidos
    if (month < 1 || month > 12) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: 'Mês inválido (deve ser entre 1 e 12)'
      }));
      return false;
    }
    
    // Verificar o número de dias no mês
    const diasNoMes = new Date(year, month, 0).getDate();
    if (day < 1 || day > diasNoMes) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: `Dia inválido (deve ser entre 1 e ${diasNoMes} para o mês ${month})`
      }));
      return false;
    }
    
    // Verificar se o ano é razoável (entre 1900 e o ano atual)
    const anoAtual = new Date().getFullYear();
    if (year < 1900 || year > anoAtual) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: `Ano inválido (deve ser entre 1900 e ${anoAtual})`
      }));
      return false;
    }
    
    const licenseDate = new Date(year, month - 1, day);
    
    // Verificar se a data é válida
    if (isNaN(licenseDate.getTime())) {
      setErrors(prev => ({
        ...prev,
        dataCartaConducao: 'Data da carta de condução inválida'
      }));
      return false;
    }

    // Verificar se a data da carta é posterior à data de nascimento + 16 anos
    if (birthDate) {
      const [birthDay, birthMonth, birthYear] = birthDate.split('/').map(Number);
      const birthDateObj = new Date(birthYear, birthMonth - 1, birthDay);
      const minLicenseDate = new Date(birthDateObj);
      minLicenseDate.setFullYear(minLicenseDate.getFullYear() + 16); // Em Portugal, pode-se tirar carta de moto aos 16 anos
      
      if (licenseDate < minLicenseDate) {
        setErrors(prev => ({
          ...prev,
          dataCartaConducao: 'A data da carta deve ser posterior aos 16 anos de idade'
        }));
        return false;
      }
      
      // Verificar se a data da carta não é futura
      const today = new Date();
      if (licenseDate > today) {
        setErrors(prev => ({
          ...prev,
          dataCartaConducao: 'A data da carta não pode ser futura'
        }));
        return false;
      }
    }

    return true;
  };
  
  // Função para validar cada passo do formulário
  const validateStep = (step: number): boolean => {
    console.log('Validando passo:', step);
    console.log('Dados do formulário:', formData);
    
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (step === 1) {
      // Validar nome
      if (!formData.nome.trim()) {
        newErrors.nome = 'Nome é obrigatório';
        isValid = false;
      }
      
      // Validar email
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email inválido';
        isValid = false;
      }
      
      // Validar telefone
      if (!formData.telefone.trim()) {
        newErrors.telefone = 'Telefone é obrigatório';
        isValid = false;
      } else if (!validatePhone(formData.telefone)) {
        newErrors.telefone = 'Telefone inválido (deve ter 9 dígitos)';
        isValid = false;
      }
      
      // Validação da data de nascimento
      if (!formData.dataNascimento) {
        newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        isValid = false;
      } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNascimento)) {
        newErrors.dataNascimento = 'A data deve estar no formato dd/mm/yyyy';
        isValid = false;
      } else {
        // Verificar se a data é válida
        const [day, month, year] = formData.dataNascimento.split('/').map(Number);
        
        // Verificar se os valores são válidos
        if (month < 1 || month > 12) {
          newErrors.dataNascimento = 'Mês inválido (deve ser entre 1 e 12)';
          isValid = false;
        } else {
          // Verificar o número de dias no mês
          const diasNoMes = new Date(year, month, 0).getDate();
          if (day < 1 || day > diasNoMes) {
            newErrors.dataNascimento = `Dia inválido (deve ser entre 1 e ${diasNoMes} para o mês ${month})`;
            isValid = false;
          } else {
            // Verificar se o ano é razoável (entre 1900 e o ano atual)
            const anoAtual = new Date().getFullYear();
            if (year < 1900 || year > anoAtual) {
              newErrors.dataNascimento = `Ano inválido (deve ser entre 1900 e ${anoAtual})`;
              isValid = false;
            } else {
              // Verificar se a idade é maior que 18 anos
              const birthDate = new Date(year, month - 1, day);
              const today = new Date();
              const age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              const isOver18 = age > 18 || (age === 18 && monthDiff >= 0 && today.getDate() >= birthDate.getDate());
              
              if (!isOver18) {
                newErrors.dataNascimento = 'Deve ter pelo menos 18 anos para contratar um seguro';
                isValid = false;
              }
            }
          }
        }
      }
      
      // Validação da data da carta de condução
      if (!formData.dataCartaConducao) {
        newErrors.dataCartaConducao = 'Data da carta de condução é obrigatória';
        isValid = false;
      } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataCartaConducao)) {
        newErrors.dataCartaConducao = 'A data deve estar no formato dd/mm/yyyy';
        isValid = false;
      } else {
        // Verificar se a data é válida
        const [day, month, year] = formData.dataCartaConducao.split('/').map(Number);
        
        // Verificar se os valores são válidos
        if (month < 1 || month > 12) {
          newErrors.dataCartaConducao = 'Mês inválido (deve ser entre 1 e 12)';
          isValid = false;
        } else {
          // Verificar o número de dias no mês
          const diasNoMes = new Date(year, month, 0).getDate();
          if (day < 1 || day > diasNoMes) {
            newErrors.dataCartaConducao = `Dia inválido (deve ser entre 1 e ${diasNoMes} para o mês ${month})`;
            isValid = false;
          } else {
            // Verificar se o ano é razoável (entre 1900 e o ano atual)
            const anoAtual = new Date().getFullYear();
            if (year < 1900 || year > anoAtual) {
              newErrors.dataCartaConducao = `Ano inválido (deve ser entre 1900 e ${anoAtual})`;
              isValid = false;
            } else if (formData.dataNascimento) {
              // Verificar se a data da carta é posterior à data de nascimento + 16 anos
              const [birthDay, birthMonth, birthYear] = formData.dataNascimento.split('/').map(Number);
              const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
              const licenseDate = new Date(year, month - 1, day);
              const minLicenseDate = new Date(birthDate);
              minLicenseDate.setFullYear(minLicenseDate.getFullYear() + 16);
              
              if (licenseDate < minLicenseDate) {
                newErrors.dataCartaConducao = 'A data da carta deve ser posterior aos 16 anos de idade';
                isValid = false;
              } else {
                // Verificar se a data da carta não é futura
                const today = new Date();
                if (licenseDate > today) {
                  newErrors.dataCartaConducao = 'A data da carta não pode ser futura';
                  isValid = false;
                }
              }
            }
          }
        }
      }
    }
    
    if (step === 2) {
      console.log('Validando passo 2 - dados do veículo');
      
      // Validar campos do passo 2 (dados do veículo)
      if (!formData.matricula) {
        newErrors.matricula = 'Matrícula é obrigatória';
        isValid = false;
      }
      
      if (!formData.marca) {
        newErrors.marca = 'Marca é obrigatória';
        isValid = false;
      }
      
      if (!formData.modelo) {
        newErrors.modelo = 'Modelo é obrigatório';
        isValid = false;
      }
      
      if (!formData.ano) {
        newErrors.ano = 'Ano é obrigatório';
        isValid = false;
      }
      
      if (!formData.cilindrada) {
        newErrors.cilindrada = 'Cilindrada é obrigatória';
        isValid = false;
      }
      
      if (!formData.valor) {
        newErrors.valor = 'Valor é obrigatório';
        isValid = false;
      }
      
      // Validar utilização (sem opção padrão)
      if (!formData.utilizacao) {
        newErrors.utilizacao = 'Selecione a utilização da mota';
        isValid = false;
      }
    }
    
    // Validação do passo 3 (tipo de seguro)
    if (step === 3) {
      console.log('Validando passo 3 - tipo de seguro');
      // Não há validações específicas para o passo 3, pois já tem valores padrão
      isValid = true;
    }
    
    // Validação do passo 4 (resumo)
    if (step === 4) {
      console.log('Validando passo 4 - resumo');
      // Não há validações específicas para o passo 4, apenas confirmação
      isValid = true;
    }
    
    console.log('Erros de validação:', newErrors);
    console.log('Formulário válido?', isValid);
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Função para avançar para o próximo passo
  const nextStep = () => {
    console.log('Tentando avançar para o próximo passo:', currentStep + 1);
    
    // Validar o passo atual antes de avançar
    if (validateStep(currentStep)) {
      console.log('Validação passou, avançando para o próximo passo');
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Calcular o preço do seguro
        const result = calcularPrecoSeguro(formData);
        console.log('Resultado da simulação:', result);
        
        // Mostrar o resultado da simulação
        setSimulationResult(result);
        setShowSummary(true);
      }
    } else {
      console.log('Validação falhou, permanecendo no passo atual');
    }
  };
  
  // Função para voltar ao passo anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      // Calcular o preço do seguro
      const resultado = calcularPrecoSeguro(formData);
      setSimulationResult(resultado);
      setShowSummary(true);
    }
  };
  
  // Função para aceitar a proposta
  const handleAcceptProposal = () => {
    // Simular o envio da proposta
    setIsSubmitting(true);
    
    // Simular um atraso de processamento
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSummary(false);
      setShowConfirmation(true);
    }, 1500);
  };
  
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    // Se já estiver no formato dd/mm/yyyy, retornar como está
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      return dateString;
    }
    
    // Converter de formato ISO (yyyy-mm-dd) para dd/mm/yyyy
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    
    return dateString;
  };
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Simulador de Seguro</h2>
      
      {!showSummary && !showConfirmation && (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 text-center relative ${
                  step < currentStep
                    ? 'text-moty-red'
                    : step === currentStep
                    ? 'text-moty-red'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    step <= currentStep ? 'bg-moty-red text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <div className="text-sm font-medium">
                  {step === 1 && 'Dados Pessoais'}
                  {step === 2 && 'Dados do Veículo'}
                  {step === 3 && 'Tipo de Seguro'}
                  {step === 4 && 'Resumo'}
                </div>
                {step < 3 && (
                  <div className="hidden sm:block absolute top-4 -right-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div
                      className={`h-full bg-moty-red transition-all duration-300 ${
                        step < currentStep ? 'w-full' : 'w-0'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!showSummary && !showConfirmation && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Passo 1: Dados Pessoais */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Dados Pessoais</h3>
              
              <FormField
                id="nome"
                label="Nome Completo"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
                error={errors.nome}
                placeholder="Insira o seu nome completo"
              />
              
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
                placeholder="Insira o seu email"
              />
              
              <FormField
                id="telefone"
                label="Telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                required
                error={errors.telefone}
                placeholder="Insira o seu telefone (9 dígitos)"
              />
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="dataNascimento" className="block text-sm font-medium mb-1 text-gray-700">
                    Data de Nascimento <span className="text-moty-red">*</span>
                  </label>
                  <input
                    id="dataNascimento"
                    name="dataNascimento"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-moty-red/50 ${
                      errors.dataNascimento ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.dataNascimento && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataNascimento}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="dataCartaConducao" className="block text-sm font-medium mb-1 text-gray-700">
                    Data da Carta de Condução <span className="text-moty-red">*</span>
                  </label>
                  <input
                    id="dataCartaConducao"
                    name="dataCartaConducao"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formData.dataCartaConducao}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-moty-red/50 ${
                      errors.dataCartaConducao ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.dataCartaConducao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dataCartaConducao}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary py-2 px-6"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Passo 2: Dados do Veículo */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Dados do Veículo</h3>
              
              <FormField
                id="matricula"
                label="Matrícula"
                type="text"
                value={formData.matricula}
                onChange={handleChange}
                required
                error={errors.matricula}
                placeholder="XX-XX-XX"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  id="marca"
                  label="Marca"
                  type="text"
                  value={formData.marca}
                  onChange={handleChange}
                  required
                  error={errors.marca}
                  placeholder="Marca da mota"
                  disabled={isLoadingVehicle}
                />
                
                <FormField
                  id="modelo"
                  label="Modelo"
                  type="text"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                  error={errors.modelo}
                  placeholder="Modelo da mota"
                  disabled={isLoadingVehicle}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  id="ano"
                  label="Ano"
                  type="text"
                  value={formData.ano}
                  onChange={handleChange}
                  required
                  error={errors.ano}
                  placeholder="Ano da mota"
                  disabled={isLoadingVehicle}
                />
                
                <FormField
                  id="cilindrada"
                  label="Cilindrada (cc)"
                  type="text"
                  value={formData.cilindrada}
                  onChange={handleChange}
                  required
                  error={errors.cilindrada}
                  placeholder="Cilindrada em cc"
                  disabled={isLoadingVehicle}
                />
              </div>
              
              <FormField
                id="valor"
                label="Valor Estimado (€)"
                type="text"
                value={formData.valor}
                onChange={handleChange}
                placeholder="Valor estimado da mota"
              />
              
              {/* Campo de utilização como dropdown */}
              <FormField
                id="utilizacao"
                label="Utilização"
                type="select"
                value={formData.utilizacao}
                onChange={handleChange}
                required
                error={errors.utilizacao}
                placeholder="Selecione a utilização da mota"
                options={[
                  { value: 'particular', label: 'Particular - Para uso pessoal e lazer' },
                  { value: 'pendular', label: 'Pendular - Para deslocações diárias casa-trabalho' },
                  { value: 'profissional', label: 'Profissional - Para uso profissional (entregas, etc.)' }
                ]}
              />
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-outline-primary py-2 px-6"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary py-2 px-6"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Passo 3: Tipo de Seguro */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Tipo de Seguro</h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Tipo de Cobertura
                </label>
                
                <div className="space-y-3 mt-2">
                  <div className="border rounded-lg p-4 cursor-pointer transition-all hover:border-moty-red/50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="responsabilidade-civil"
                        name="tipoSeguro"
                        value="responsabilidade-civil"
                        checked={formData.tipoSeguro === 'responsabilidade-civil'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="responsabilidade-civil" className="font-bold">
                        Responsabilidade Civil
                      </label>
                    </div>
                    <p className="text-sm text-moty-gray">
                      Cobertura básica obrigatória para danos causados a terceiros.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer transition-all hover:border-moty-red/50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="danos-proprios"
                        name="tipoSeguro"
                        value="danos-proprios"
                        checked={formData.tipoSeguro === 'danos-proprios'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="danos-proprios" className="font-bold">
                        Danos Próprios (Todos os Riscos)
                      </label>
                    </div>
                    <p className="text-sm text-moty-gray">
                      Cobertura completa, incluindo danos na sua mota, roubo e vandalismo.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-outline-primary py-2 px-6"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary py-2 px-6"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Passo 4: Resumo */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-6">Resumo da Simulação</h3>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-moty-red mb-4">Dados Pessoais</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Nome:</p>
                          <p className="text-sm font-semibold">{formData.nome}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Email:</p>
                          <p className="text-sm font-semibold">{formData.email}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Telefone:</p>
                          <p className="text-sm font-semibold">{formData.telefone}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Data de Nascimento:</p>
                          <p className="text-sm font-semibold">{formatDate(formData.dataNascimento)}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Data da Carta de Condução:</p>
                          <p className="text-sm font-semibold">{formatDate(formData.dataCartaConducao)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-moty-red mb-4">Dados do Veículo</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Matrícula:</p>
                          <p className="text-sm font-semibold">{formData.matricula}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Marca:</p>
                          <p className="text-sm font-semibold">{formData.marca}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Modelo:</p>
                          <p className="text-sm font-semibold">{formData.modelo}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Ano:</p>
                          <p className="text-sm font-semibold">{formData.ano}</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Cilindrada:</p>
                          <p className="text-sm font-semibold">{formData.cilindrada} cc</p>
                        </div>
                        
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <p className="text-sm font-medium text-gray-600">Valor Estimado:</p>
                          <p className="text-sm font-semibold">{formatCurrency(Number(formData.valor))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-moty-red mb-4">Detalhes do Seguro</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <p className="text-sm font-medium text-gray-600">Utilização:</p>
                      <p className="text-sm font-semibold">
                        {formData.utilizacao === 'particular' && 'Particular'}
                        {formData.utilizacao === 'pendular' && 'Pendular (Casa-Trabalho)'}
                        {formData.utilizacao === 'profissional' && 'Profissional'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <p className="text-sm font-medium text-gray-600">Tipo de Seguro:</p>
                      <p className="text-sm font-semibold">
                        {formData.tipoSeguro === 'responsabilidade-civil' && 'Responsabilidade Civil'}
                        {formData.tipoSeguro === 'danos-proprios' && 'Danos Próprios (Todos os Riscos)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-outline-primary py-2 px-6"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-6"
                >
                  Simular
                </button>
              </div>
            </motion.div>
          )}
        </form>
      )}
      
      {/* Resultado da Simulação */}
      {showSummary && simulationResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <SimulationResult
            valorAnual={simulationResult.valorAnual}
            onAccept={handleAcceptProposal}
            onCancel={() => {
              setSimulationResult(null);
              setShowSummary(false);
              setCurrentStep(1);
            }}
          />
        </motion.div>
      )}
      
      {/* Confirmação de Envio */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <div className="bg-green-50 p-8 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Proposta Enviada com Sucesso!</h3>
            <p className="text-gray-600 mb-6">
              Enviámos um email de confirmação para <strong>{formData.email}</strong> com os detalhes da sua proposta.<br />
              <span className="text-sm text-gray-500">(Nota: Em ambiente de desenvolvimento, o email não é realmente enviado)</span><br />
              A nossa equipa entrará em contacto consigo em breve para finalizar o processo.
            </p>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 text-left">
              <h4 className="font-semibold mb-2">Resumo da Proposta:</h4>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Nome:</span> {formData.nome}</li>
                <li><span className="font-medium">Matrícula:</span> {formData.matricula}</li>
                <li><span className="font-medium">Mota:</span> {formData.marca} {formData.modelo} ({formData.ano})</li>
                <li><span className="font-medium">Tipo de Seguro:</span> {formData.tipoSeguro === 'responsabilidade-civil' ? 'Responsabilidade Civil' : 'Danos Próprios'}</li>
                <li><span className="font-medium">Valor Anual:</span> {formatCurrency(simulationResult?.valorAnual || 0)}</li>
                <li><span className="font-medium">Forma de Pagamento:</span> {formData.formaPagamento === 'anual' ? 'Anual' : 'Trimestral'}</li>
              </ul>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setSimulationResult(null);
                setShowSummary(false);
                setShowConfirmation(false);
                setCurrentStep(1);
                setFormData({
                  nome: '',
                  email: '',
                  telefone: '',
                  dataNascimento: '',
                  dataCartaConducao: '',
                  matricula: '',
                  marca: '',
                  modelo: '',
                  ano: '',
                  cilindrada: '',
                  valor: '',
                  utilizacao: '',
                  tipoSeguro: 'responsabilidade-civil',
                  formaPagamento: 'anual'
                });
              }}
              className="btn-primary py-2 px-6"
            >
              Voltar ao Início
            </button>
          </div>
        </motion.div>
      )}
      
      <p className="text-sm text-moty-gray text-center mt-4">
        Ao submeter este formulário, concorda com a nossa{' '}
        <a href="/politica-privacidade" className="text-moty-red hover:underline">
          Política de Privacidade
        </a>.
      </p>
    </div>
  );
};

export default SimuladorForm;
