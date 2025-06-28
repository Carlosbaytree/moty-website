'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import SimulationResult from '../SimulationResult';
import { calcularPrecoSeguro } from '@/utils/calcularPrecoSeguro';
import { fetchVehicleDataByPlate } from '@/services/vehicleService';

// Tipos para os dados do formulário
interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  dataCartaConducao: string;
  morada: string;
  codigoPostal: string;
  localidade: string;
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

// Tipo para o estado do envio de email
type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

const SimuladorForm: React.FC = () => {
  // Estados para formulário e navegação
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    dataCartaConducao: '',
    morada: '',
    codigoPostal: '',
    localidade: '',
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
  const [simulationResult, setSimulationResult] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailError, setEmailError] = useState<string>('');

  // Manipulador para campos de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Formatar campos de data automaticamente (dd/mm/yyyy)
    if (name === 'dataNascimento' || name === 'dataCartaConducao') {
      let formattedValue = value.replace(/\D/g, ''); // Remove não-dígitos
      
      if (formattedValue.length > 0) {
        // Formato dd/mm/yyyy
        if (formattedValue.length > 8) {
          formattedValue = formattedValue.slice(0, 8);
        }
        
        if (formattedValue.length > 4) {
          formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4)}`;
        } else if (formattedValue.length > 2) {
          formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
        }

        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    } 
    // Formatar código postal (1111-222)
    else if (name === 'codigoPostal') {
      let formattedValue = value.replace(/\D/g, '');
      
      if (formattedValue.length > 0) {
        // Formato 1111-222
        if (formattedValue.length > 7) {
          formattedValue = formattedValue.slice(0, 7);
        }
        
        if (formattedValue.length > 4) {
          formattedValue = `${formattedValue.slice(0, 4)}-${formattedValue.slice(4)}`;
        } 

        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
    // Para matrícula (formato 11-AA-22)
    else if (name === 'matricula') {
      let digits = value.replace(/[^0-9A-Z]/gi, '').toUpperCase();
      let formattedValue = '';
      
      if (digits.length > 0) {
        // Limitar a 6 caracteres (2 números + 2 letras + 2 números)
        if (digits.length > 6) digits = digits.slice(0, 6);
        
        // Formato os dois primeiros dígitos
        if (digits.length <= 2) {
          formattedValue = digits;
        }
        // Adiciona o primeiro hífen e as duas letras
        else if (digits.length <= 4) {
          const numPart = digits.slice(0, 2);
          // Converte para letras maiúsculas mesmo que o usuário digite números
          const letterPart = digits.slice(2).replace(/[0-9]/g, '');
          formattedValue = `${numPart}-${letterPart}`;
        } 
        // Adiciona o segundo hífen e os dois últimos números
        else {
          const numPart1 = digits.slice(0, 2);
          const letterPart = digits.slice(2, 4).replace(/[0-9]/g, '');
          const numPart2 = digits.slice(4);
          formattedValue = `${numPart1}-${letterPart}-${numPart2}`;
        }
        
        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpar erro específico quando o campo é alterado
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Função para buscar dados da localidade pelo código postal
  useEffect(() => {
    const fetchPostalCode = async () => {
      const codigoPostal = formData.codigoPostal;
      if (codigoPostal && /^\d{4}-\d{3}$/.test(codigoPostal)) {
        setIsLoadingPostalCode(true);
        try {
          // Busca do código postal no arquivo CSV
          const response = await fetch(`/data/codigos_postais.csv`);
          const text = await response.text();
          const rows = text.split('\n');
          
          // Pular a linha de cabeçalho
          const headers = rows[0].split(',');
          const numCodPostalIndex = headers.indexOf('num_cod_postal');
          const extCodPostalIndex = headers.indexOf('ext_cod_postal');
          const desigPostalIndex = headers.indexOf('desig_postal');
          
          let localidade = '';
          
          // Começar da linha 1 para pular o cabeçalho
          for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns.length <= Math.max(numCodPostalIndex, extCodPostalIndex, desigPostalIndex)) {
              continue;
            }
            
            const numCodPostal = columns[numCodPostalIndex];
            const extCodPostal = columns[extCodPostalIndex];
            const cpCompleto = `${numCodPostal}-${extCodPostal}`;
            
            if (cpCompleto === codigoPostal) {
              localidade = columns[desigPostalIndex];
              break;
            }
          }
          
          if (localidade) {
            console.log(`Localidade encontrada: ${localidade}`);
            setFormData(prev => ({
              ...prev,
              localidade
            }));
          } else {
            console.log(`Nenhuma localidade encontrada para o código postal: ${codigoPostal}`);
          }
        } catch (error) {
          console.error("Erro ao buscar código postal:", error);
        } finally {
          setIsLoadingPostalCode(false);
        }
      }
    };

    fetchPostalCode();
  }, [formData.codigoPostal]);

  // Função para buscar dados do veículo pela placa
  useEffect(() => {
    const fetchVehicleData = async () => {
      const matricula = formData.matricula;
      // Verificar se a matrícula tem o formato correto (11-AA-22)
      if (matricula && /^\d{2}-[A-Z]{2}-\d{2}$/.test(matricula)) {
        setIsLoadingVehicle(true);
        try {
          // Buscar dados do veículo no arquivo CSV
          const response = await fetch(`/data/registo_motas_mock.csv`);
          const text = await response.text();
          const rows = text.split('\n');
          
          // Pular a linha de cabeçalho
          const headers = rows[0].split(',');
          const matriculaIndex = headers.indexOf('matricula');
          const marcaIndex = headers.indexOf('marca');
          const modeloIndex = headers.indexOf('modelo');
          const anoIndex = headers.indexOf('ano');
          const cilindradaIndex = headers.indexOf('cilindrada');
          
          let vehicleData = null;
          
          // Começar da linha 1 para pular o cabeçalho
          for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns.length <= Math.max(matriculaIndex, marcaIndex, modeloIndex, anoIndex, cilindradaIndex)) {
              continue;
            }
            
            const plateFromCSV = columns[matriculaIndex];
            
            if (plateFromCSV === matricula) {
              vehicleData = {
                marca: columns[marcaIndex],
                modelo: columns[modeloIndex],
                ano: columns[anoIndex],
                cilindrada: columns[cilindradaIndex]
              };
              break;
            }
          }
          
          if (vehicleData) {
            console.log(`Veículo encontrado: ${JSON.stringify(vehicleData)}`);
            setFormData(prev => ({
              ...prev,
              marca: vehicleData.marca || '',
              modelo: vehicleData.modelo || '',
              ano: vehicleData.ano || '',
              cilindrada: vehicleData.cilindrada || ''
            }));
          } else {
            console.log(`Nenhum veículo encontrado para a matrícula: ${matricula}`);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do veículo:", error);
        } finally {
          setIsLoadingVehicle(false);
        }
      }
    };

    fetchVehicleData();
  }, [formData.matricula]);

  // Validação de cada passo
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    // Função auxiliar para validar datas
    const validateDate = (dateStr: string, fieldName: string): string | null => {
      if (!dateStr.trim() || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        return `${fieldName} obrigatória (formato: dd/mm/yyyy)`;
      }
      
      const [day, month, year] = dateStr.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date();
      
      // Verifica data inválida (como 31/02/2023)
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return `${fieldName} inválida`;
      }
      
      // Verifica data futura
      if (date > today) {
        return `${fieldName} não pode ser no futuro`;
      }
      
      // Para data de nascimento, verifica idade mínima (18 anos)
      if (fieldName === 'Data de nascimento') {
        const minAge = 18;
        const ageDate = new Date(today.getTime() - date.getTime());
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
        if (age < minAge) {
          return `Idade mínima: ${minAge} anos`;
        }
      }
      
      // Para carta de condução, verifica se é posterior à data de nascimento + 18 anos
      if (fieldName === 'Data da carta' && formData.dataNascimento.trim()) {
        const [bDay, bMonth, bYear] = formData.dataNascimento.split('/').map(Number);
        const birthDate = new Date(bYear, bMonth - 1, bDay);
        const minLicenseDate = new Date(birthDate);
        minLicenseDate.setFullYear(minLicenseDate.getFullYear() + 18);
        
        if (date < minLicenseDate) {
          return 'A data da carta deve ser depois de completar 18 anos';
        }
      }
      
      return null;
    };

    if (step === 1) {
      // Validação de dados pessoais
      if (!formData.nome.trim()) newErrors.nome = 'Nome obrigatório';
      if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = 'Email válido obrigatório';
      if (!formData.telefone.trim() || !/^\d{9}$/.test(formData.telefone)) newErrors.telefone = 'Telefone (9 dígitos) obrigatório';
      
      // Validação avançada de datas
      const birthDateError = validateDate(formData.dataNascimento, 'Data de nascimento');
      if (birthDateError) newErrors.dataNascimento = birthDateError;
      
      const licenseError = validateDate(formData.dataCartaConducao, 'Data da carta');
      if (licenseError) newErrors.dataCartaConducao = licenseError;
      
      if (!formData.codigoPostal.trim() || !/^\d{4}-\d{3}$/.test(formData.codigoPostal)) newErrors.codigoPostal = 'Código postal obrigatório (formato: 1111-222)';
      if (!formData.localidade.trim()) newErrors.localidade = 'Localidade obrigatória';
      if (!formData.morada.trim()) newErrors.morada = 'Morada obrigatória';
    } 
    else if (step === 2) {
      // Validação de dados do veículo
      if (!formData.matricula.trim() || !/^\d{2}-[A-Z]{2}-\d{2}$/.test(formData.matricula)) newErrors.matricula = 'Matrícula obrigatória (formato: 11-AA-22)';
      if (!formData.marca.trim()) newErrors.marca = 'Marca obrigatória';
      if (!formData.modelo.trim()) newErrors.modelo = 'Modelo obrigatório';
      if (!formData.ano.trim()) newErrors.ano = 'Ano obrigatório';
      if (!formData.cilindrada.trim()) newErrors.cilindrada = 'Cilindrada obrigatória';
      if (!formData.valor.trim() || isNaN(parseFloat(formData.valor))) newErrors.valor = 'Valor estimado obrigatório';
      if (!formData.utilizacao.trim()) newErrors.utilizacao = 'Utilização obrigatória';
    }
    else if (step === 3) {
      // Validação do tipo de seguro
      if (!formData.tipoSeguro.trim()) newErrors.tipoSeguro = 'Tipo de seguro obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avançar para o próximo passo
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 3) {
        setShowSummary(true);
      }
    }
  };

  // Voltar para o passo anterior
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (showSummary) {
      setShowSummary(false);
      setCurrentStep(3);
    }
  };

  // Calcular preço do seguro e mostrar resultado
  const handleSimulate = () => {
    // Função fictícia para calcular o preço do seguro
    // Você pode substituir isso pela lógica real de calcularPrecoSeguro
    const calculatePrice = (data: FormData): number => {
      const basePrice = 200;
      
      // Fator de idade
      const [day, month, year] = data.dataNascimento.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const ageFactor = age < 25 ? 1.3 : age > 60 ? 1.2 : 1;
      
      // Fator de experiência
      const [licDay, licMonth, licYear] = data.dataCartaConducao.split('/').map(Number);
      const licenseDate = new Date(licYear, licMonth - 1, licDay);
      const experience = today.getFullYear() - licenseDate.getFullYear();
      const experienceFactor = experience < 2 ? 1.5 : experience < 5 ? 1.2 : 1;
      
      // Fator de valor do veículo
      const vehicleValue = parseFloat(data.valor);
      const valueFactor = vehicleValue > 10000 ? 1.4 : vehicleValue > 5000 ? 1.2 : 1;
      
      // Fator de utilização
      const usageFactor = 
        data.utilizacao === 'profissional' ? 1.5 : 
        data.utilizacao === 'pendular' ? 1.2 : 1;
      
      // Fator de tipo de seguro
      const insuranceTypeFactor = data.tipoSeguro === 'danos-proprios' ? 1.8 : 1;
      
      // Calcular preço final
      const price = basePrice * ageFactor * experienceFactor * valueFactor * usageFactor * insuranceTypeFactor;
      
      return Math.round(price * 100) / 100;
    };
    
    const valorSeguro = calculatePrice(formData);
    setSimulationResult(valorSeguro);
    setShowSummary(false);
  };

  // Função para enviar email com a simulação
  const handleAcceptSimulation = async (formaPagamentoSelecionada?: 'anual' | 'trimestral') => {
    console.log('⭐⭐⭐ Função handleAcceptSimulation chamada!');
    setEmailStatus('sending');
    setIsSubmitting(true);
    setEmailError('');
    
    // Adiciona forma de pagamento aos dados do formulário
    const dadosCompletos = { 
      ...formData,
      formaPagamento: formaPagamentoSelecionada || 'anual',
      
      // Garantir que todos os campos obrigatórios estejam presentes
      nome: formData.nome || '',
      email: formData.email || '',
      telefone: formData.telefone || '',
      dataNascimento: formData.dataNascimento || '',
      marca: formData.marca || '',
      modelo: formData.modelo || '',
      ano: formData.ano || '',
      cilindrada: formData.cilindrada || '',
      matricula: formData.matricula || '',
      dataCartaConducao: formData.dataCartaConducao || '',
      utilizacao: formData.utilizacao || 'particular',
      tipoSeguro: formData.tipoSeguro || 'civil',
      valor: simulationResult || 0,
      valorAnual: simulationResult || 0
    };
    
    console.log('📢 Dados completos para envio:', dadosCompletos);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('📢 Iniciando chamada para API...');
      
      const response = await fetch('/api/send-proposal-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCompletos),
        cache: 'no-store'
      });
      
      console.log('📢 Resposta HTTP recebida! Status:', response.status);
      
      let result;
      try {
        result = await response.json();
        console.log('📢 Dados da resposta:', result);
      } catch (jsonError) {
        console.warn('📢 Erro ao parsear JSON da resposta:', jsonError);
        result = { 
          success: response.ok, 
          error: response.ok ? null : 'Formato de resposta inválido' 
        };
      }
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erro ao enviar email');
      }
      
      console.log('✅ Email enviado com sucesso!');
      
      setEmailStatus('success');
      setShowConfirmation(true);
    } catch (error: any) {
      console.error('❌ ERRO AO ENVIAR EMAIL:', error);
      setEmailStatus('error');
      setEmailError(error.message || 'Erro ao enviar email. Por favor, tente novamente.');
      alert(`Erro ao enviar email: ${error.message || 'Erro desconhecido'}. Verifique as configurações SMTP.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancelar a simulação e voltar ao formulário
  const handleCancelSimulation = () => {
    setSimulationResult(null);
    setShowSummary(true);
  };

  // Reiniciar o formulário
  const handleReset = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      dataCartaConducao: '',
      morada: '',
      codigoPostal: '',
      localidade: '',
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
    setErrors({});
    setCurrentStep(1);
    setShowSummary(false);
    setShowConfirmation(false);
    setSimulationResult(null);
    setEmailStatus('idle');
    setEmailError('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Passos do formulário */}
      {!showSummary && simulationResult === null && !showConfirmation && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Dados Pessoais</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Dados do Veículo</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Tipo de Seguro</div>
          </div>
        </div>
      )}

      {/* Passo 1: Dados Pessoais */}
      {currentStep === 1 && !showSummary && simulationResult === null && !showConfirmation && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Dados Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="nome"
              label="Nome Completo"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              required
              error={errors.nome}
              placeholder="Seu nome completo"
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={errors.email}
              placeholder="seu.email@exemplo.com"
            />

            <FormField
              id="telefone"
              label="Telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              error={errors.telefone}
              placeholder="912345678"
            />

            <FormField
              id="dataNascimento"
              label="Data de Nascimento"
              type="text"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required
              error={errors.dataNascimento}
              placeholder="DD/MM/AAAA"
            />

            <FormField
              id="dataCartaConducao"
              label="Data da Carta de Condução"
              type="text"
              value={formData.dataCartaConducao}
              onChange={handleInputChange}
              required
              error={errors.dataCartaConducao}
              placeholder="DD/MM/AAAA"
            />

            <FormField
              id="morada"
              label="Morada"
              type="text"
              value={formData.morada}
              onChange={handleInputChange}
              required
              error={errors.morada}
              placeholder="Sua morada"
              className="md:col-span-2"
            />

            <FormField
              id="codigoPostal"
              label="Código Postal"
              type="text"
              value={formData.codigoPostal}
              onChange={handleInputChange}
              required
              error={errors.codigoPostal}
              placeholder="1234-567"
            />

            <div className="relative">
              <FormField
                id="localidade"
                label="Localidade"
                type="text"
                value={formData.localidade}
                onChange={handleInputChange}
                required
                error={errors.localidade}
                placeholder="Sua localidade"
                disabled={isLoadingPostalCode}
              />
              {isLoadingPostalCode && (
                <div className="absolute right-3 top-10">
                  <div className="spinner-border h-5 w-5"></div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              type="button" 
              onClick={handleNext}
              className="btn-primary py-2 px-6"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}

      {/* Passo 2: Dados do Veículo */}
      {currentStep === 2 && !showSummary && simulationResult === null && !showConfirmation && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Dados do Veículo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FormField
                id="matricula"
                label="Matrícula"
                type="text"
                value={formData.matricula}
                onChange={handleInputChange}
                required
                error={errors.matricula}
                placeholder="11-AA-22"
              />
              {isLoadingVehicle && (
                <div className="absolute right-3 top-10">
                  <div className="spinner-border h-5 w-5"></div>
                </div>
              )}
            </div>

            <FormField
              id="marca"
              label="Marca"
              type="text"
              value={formData.marca}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
              error={errors.modelo}
              placeholder="Modelo da mota"
              disabled={isLoadingVehicle}
            />

            <FormField
              id="ano"
              label="Ano"
              type="text"
              value={formData.ano}
              onChange={handleInputChange}
              required
              error={errors.ano}
              placeholder="2023"
              disabled={isLoadingVehicle}
            />

            <FormField
              id="cilindrada"
              label="Cilindrada"
              type="text"
              value={formData.cilindrada}
              onChange={handleInputChange}
              required
              error={errors.cilindrada}
              placeholder="125cc"
              disabled={isLoadingVehicle}
            />

            <FormField
              id="valor"
              label="Valor estimado"
              type="text"
              value={formData.valor}
              onChange={handleInputChange}
              required
              error={errors.valor}
              placeholder="0.00"
            />

            <FormField
              id="utilizacao"
              label="Utilização"
              type="select"
              value={formData.utilizacao}
              onChange={handleInputChange}
              required
              error={errors.utilizacao}
              options={[
                { value: '', label: 'Selecione a utilização' },
                { value: 'particular', label: 'Particular - Para uso pessoal e lazer' },
                { value: 'pendular', label: 'Pendular - Para deslocações diárias casa-trabalho' },
                { value: 'profissional', label: 'Profissional - Para uso profissional, (entregas, etc)' }
              ]}
              className="col-span-1 md:col-span-2"
            />
          </div>

          <div className="mt-6 flex justify-between">
            <button 
              type="button" 
              onClick={handleBack}
              className="btn-secondary py-2 px-6"
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              className="btn-primary py-2 px-6"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}

      {/* Passo 3: Tipo de Seguro */}
      {currentStep === 3 && !showSummary && simulationResult === null && !showConfirmation && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Tipo de Seguro</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o tipo de seguro</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => setFormData({...formData, tipoSeguro: 'responsabilidade-civil'})}
                     className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${formData.tipoSeguro === 'responsabilidade-civil' ? 'border-blue-500 bg-blue-50' : ''}`}>
                  <h3 className="font-semibold text-lg mb-2">Responsabilidade Civil</h3>
                  <p className="text-gray-600 text-sm">Cobre danos causados a terceiros em caso de acidente.</p>
                  <p className="text-sm mt-2 font-semibold">Recomendado para motas de baixo valor ou com mais de 10 anos</p>
                </div>
                <div onClick={() => setFormData({...formData, tipoSeguro: 'danos-proprios'})}
                     className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${formData.tipoSeguro === 'danos-proprios' ? 'border-blue-500 bg-blue-50' : ''}`}>
                  <h3 className="font-semibold text-lg mb-2">Danos Próprios</h3>
                  <p className="text-gray-600 text-sm">Cobre danos ao seu próprio veículo, além de danos a terceiros.</p>
                  <p className="text-sm mt-2 font-semibold">Recomendado para motas de valor elevado ou recentes</p>
                </div>
              </div>
              {errors.tipoSeguro && <p className="text-red-500 text-xs mt-1">{errors.tipoSeguro}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento</label>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="formaPagamento-anual"
                    name="formaPagamento"
                    value="anual"
                    checked={formData.formaPagamento === 'anual'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Anual (desconto de 10%)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="formaPagamento-semestral"
                    name="formaPagamento"
                    value="semestral"
                    checked={formData.formaPagamento === 'semestral'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Semestral (desconto de 5%)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="formaPagamento-trimestral"
                    name="formaPagamento"
                    value="trimestral"
                    checked={formData.formaPagamento === 'trimestral'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Trimestral</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button 
              type="button" 
              onClick={handleBack}
              className="btn-secondary py-2 px-6"
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              className="btn-primary py-2 px-6"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      )}

      {/* Resumo da Simulação */}
      {showSummary && simulationResult === null && !showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Resumo da Simulação</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Dados Pessoais</h3>
              <p><strong>Nome:</strong> {formData.nome}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Telefone:</strong> {formData.telefone}</p>
              <p><strong>Data de Nascimento:</strong> {formData.dataNascimento}</p>
              <p><strong>Data da Carta de Condução:</strong> {formData.dataCartaConducao}</p>
              <p><strong>Morada:</strong> {formData.morada}</p>
              <p><strong>Código Postal:</strong> {formData.codigoPostal}</p>
              <p><strong>Localidade:</strong> {formData.localidade}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Dados do Veículo</h3>
              <p><strong>Matrícula:</strong> {formData.matricula}</p>
              <p><strong>Marca:</strong> {formData.marca}</p>
              <p><strong>Modelo:</strong> {formData.modelo}</p>
              <p><strong>Ano:</strong> {formData.ano}</p>
              <p><strong>Cilindrada:</strong> {formData.cilindrada}</p>
              <p><strong>Valor Estimado:</strong> {formData.valor}€</p>
              <p><strong>Utilização:</strong> {formData.utilizacao.charAt(0).toUpperCase() + formData.utilizacao.slice(1)}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-3">Detalhes do Seguro</h3>
              <p>
                <strong>Tipo de Seguro:</strong> {formData.tipoSeguro === 'responsabilidade-civil' ? 'Responsabilidade Civil' : 'Danos Próprios'}
              </p>
              <p>
                <strong>Forma de Pagamento:</strong> {formData.formaPagamento.charAt(0).toUpperCase() + formData.formaPagamento.slice(1)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button 
              type="button" 
              onClick={handleBack}
              className="btn-secondary py-2 px-6"
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={handleSimulate}
              className="btn-primary py-2 px-6"
            >
              Simular Seguro
            </button>
          </div>
        </motion.div>
      )}

      {/* Resultado da Simulação */}
      {simulationResult !== null && !showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Resultado da Simulação</h2>
          
          <SimulationResult 
            valorAnual={simulationResult} 
            onAccept={handleAcceptSimulation}
            onCancel={handleCancelSimulation}
          />

          {/* Os botões são fornecidos pelo componente SimulationResult */}
        </motion.div>
      )}

      {/* Confirmação */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md text-center"
        >
          {emailStatus === 'success' ? (
            <>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2">Simulação Enviada com Sucesso!</h2>
              <p className="mb-6">Enviámos os detalhes da sua simulação para o email {formData.email}</p>
              <p className="mb-6">Um dos nossos consultores entrará em contacto consigo em breve.</p>
            </>
          ) : emailStatus === 'error' ? (
            <>
              <div className="text-red-500 text-5xl mb-4">✗</div>
              <h2 className="text-2xl font-bold mb-2">Erro no Envio</h2>
              <p className="mb-6">{emailError}</p>
            </>
          ) : null}

          <button 
            type="button" 
            onClick={handleReset}
            className="btn-primary py-2 px-6"
          >
            Nova Simulação
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SimuladorForm;