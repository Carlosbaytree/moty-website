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
type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

// Função para formatar a data
function formatDate(dateString: string) {
  if (!dateString) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}
// Função para formatar valores monetários
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const SimuladorForm: React.FC = () => {
  // HOOKS E FUNÇÕES AUXILIARES
  const [formData, setFormData] = useState<FormData>({
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailError, setEmailError] = useState<string>('');

  // Validação dos campos obrigatórios por passo
function validateStep(step: number): boolean {
  const newErrors: FormErrors = {};
  if (step === 1) {
    if (!formData.nome.trim()) newErrors.nome = 'Nome obrigatório';
    if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = 'Email válido obrigatório';
    if (!formData.telefone.trim() || !/^\d{9}$/.test(formData.telefone)) newErrors.telefone = 'Telefone (9 dígitos) obrigatório';
    if (!formData.dataNascimento.trim() || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNascimento)) newErrors.dataNascimento = 'Data de nascimento obrigatória (dd/mm/yyyy)';
    if (!formData.dataCartaConducao.trim() || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataCartaConducao)) newErrors.dataCartaConducao = 'Data da carta obrigatória (dd/mm/yyyy)';
  }
  if (step === 2) {
    if (!formData.matricula.trim() || !/^\d{2}-[A-Z]{2}-\d{2}$/.test(formData.matricula)) newErrors.matricula = 'Matrícula obrigatória (11-AA-22)';
    if (!formData.marca.trim()) newErrors.marca = 'Marca obrigatória';
    if (!formData.modelo.trim()) newErrors.modelo = 'Modelo obrigatório';
    if (!formData.ano.trim() || !/^\d{4}$/.test(formData.ano)) newErrors.ano = 'Ano obrigatório (formato yyyy)';
    if (!formData.cilindrada.trim()) newErrors.cilindrada = 'Cilindrada obrigatória';
    if (!formData.valor.trim() || isNaN(Number(formData.valor))) newErrors.valor = 'Valor obrigatório';
    if (!formData.utilizacao.trim()) newErrors.utilizacao = 'Escolha a utilização';
  }
  if (step === 3) {
    if (!formData.tipoSeguro.trim()) newErrors.tipoSeguro = 'Tipo de seguro obrigatório';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

// ...demais funções auxiliares como handleAcceptProposal, handleChange, etc...

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
        <form onSubmit={(e) => {
          e.preventDefault();
          if (validateStep(currentStep)) {
            // Calcular o preço do seguro
            const resultado = calcularPrecoSeguro(formData);
          }
        }} className="space-y-6">
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
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                required
                error={errors.nome}
                placeholder="Insira o seu nome completo"
              />
              
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                required
                error={errors.email}
                placeholder="Insira o seu email"
              />
              
              <FormField
                id="telefone"
                label="Telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
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
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData(prev => ({
                        ...prev,
                        [name]: value
                      }));
                    }}
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
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData(prev => ({
                        ...prev,
                        [name]: value
                      }));
                    }}
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
                  onClick={() => {
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
                  }}
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
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
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
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
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
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                placeholder="Valor estimado da mota"
              />
              
              {/* Campo de utilização como dropdown */}
              <FormField
                id="utilizacao"
                label="Utilização"
                type="select"
                value={formData.utilizacao}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
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
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  className="btn-outline-primary py-2 px-6"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
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
                  }}
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
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFormData(prev => ({
                            ...prev,
                            [name]: value
                          }));
                        }}
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
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFormData(prev => ({
                            ...prev,
                            [name]: value
                          }));
                        }}
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
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  className="btn-outline-primary py-2 px-6"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
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
                  }}
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
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
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
            onAccept={async () => {
              setIsSubmitting(true);
              setEmailStatus('sending');
              setEmailError('');
              try {
                const response = await fetch('/api/send-proposal-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });
                if (!response.ok) {
                  throw new Error('Erro ao enviar email');
                }
                setEmailStatus('success');
                setShowConfirmation(true);
                setShowSummary(false);
              } catch (error: any) {
                setEmailStatus('error');
                setEmailError(error.message || 'Erro desconhecido');
              } finally {
                setIsSubmitting(false);
              }
            }}
            onCancel={() => {
              setSimulationResult(null);
              setShowSummary(false);
              setCurrentStep(1);
            }}
          />
        </motion.div>
      )}
      
      {/* Confirmação de Envio */}
      {emailStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <div className="bg-red-50 p-8 rounded-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Erro ao Enviar Email</h3>
            <p className="text-gray-600 mb-6">{emailError || 'Ocorreu um erro ao enviar o email de confirmação. Por favor, tente novamente.'}</p>
            <button
              type="button"
              onClick={() => {
                setEmailStatus('idle');
                setEmailError('');
              }}
              className="btn-primary py-2 px-6"
            >
              Tentar Novamente
            </button>
          </div>
        </motion.div>
      )}
      
      {showConfirmation && emailStatus === 'success' && (
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
                setEmailStatus('idle');
                setEmailError('');
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
        </a>
      </p>
    </div>
  );
};
export default SimuladorForm;
