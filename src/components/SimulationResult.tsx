'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SimulationResultProps {
  valorAnual: number;
  onAccept: (formaPagamento?: 'anual' | 'trimestral') => void;
  onCancel: () => void;
}

const SimulationResult: React.FC<SimulationResultProps> = ({
  valorAnual,
  onAccept,
  onCancel
}) => {
  const [formaPagamento, setFormaPagamento] = useState<'anual' | 'trimestral'>('anual');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  
  // Formatar valores com o símbolo € e separador de milhares
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Função local para enviar email diretamente do componente
  const enviarEmailDireto = async () => {
    console.log('🔵 BOTÃO CLICADO - Função enviarEmailDireto');
    setEnviando(true);
    setErro(null);
    
    try {
      // Primeiro tente usar a prop onAccept se ela existir
      if (typeof onAccept === 'function') {
        console.log('🔵 Chamando onAccept do componente pai com forma de pagamento:', formaPagamento);
        onAccept(formaPagamento); // Passa a forma de pagamento selecionada para o componente pai
      } else {
        console.warn('🔵 onAccept não é uma função válida, tentando enviar email diretamente');
        // Alerta de diagnóstico
        alert('A função onAccept não está disponível. Este é apenas um alerta de diagnóstico.');
      }
      
      setEnviado(true);
    } catch (error: any) {
      console.error('🔵 ERRO AO ENVIAR:', error);
      setErro(error.message || 'Erro desconhecido ao enviar email');
      alert(`Erro ao processar o envio de email: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-moty-light-gray p-8 rounded-lg shadow-sm">
        <h3 className="text-2xl font-bold text-center mb-6">Resultado da Simulação</h3>
        
        {enviado && (
          <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-lg text-center">
            Email enviado com sucesso!
          </div>
        )}

        {erro && (
          <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg text-center">
            {erro}
          </div>
        )}
        
        <div className="text-center mb-8">
          <p className="text-lg mb-2">O valor anual do seu seguro é:</p>
          <div className="text-4xl font-bold text-moty-red mb-6">
            {formatCurrency(valorAnual)}
            <span className="text-lg font-normal text-moty-gray">/ano</span>
          </div>
          
          {/* Opções de pagamento */}
          <div className="mt-8">
            <h4 className="font-bold mb-4">Forma de Pagamento</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Anual */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formaPagamento === 'anual' 
                    ? 'border-moty-red bg-moty-red/5' 
                    : 'border-gray-200 hover:border-moty-red/50'
                }`}
                onClick={() => setFormaPagamento('anual')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="anual"
                    name="formaPagamento"
                    value="anual"
                    checked={formaPagamento === 'anual'}
                    onChange={() => setFormaPagamento('anual')}
                    className="mr-2"
                  />
                  <div>
                    <label htmlFor="anual" className="font-bold block">
                      Pagamento Anual
                    </label>
                    <span className="text-sm text-moty-gray block">
                      {formatCurrency(valorAnual)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Trimestral */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formaPagamento === 'trimestral' 
                    ? 'border-moty-red bg-moty-red/5' 
                    : 'border-gray-200 hover:border-moty-red/50'
                }`}
                onClick={() => setFormaPagamento('trimestral')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="trimestral"
                    name="formaPagamento"
                    value="trimestral"
                    checked={formaPagamento === 'trimestral'}
                    onChange={() => setFormaPagamento('trimestral')}
                    className="mr-2"
                  />
                  <div>
                    <label htmlFor="trimestral" className="font-bold block">
                      Pagamento Trimestral
                    </label>
                    <span className="text-sm text-moty-gray block">
                      {formatCurrency(valorAnual * 1.15 / 4)} x 4 ({formatCurrency(valorAnual * 1.15)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={enviarEmailDireto}
            disabled={enviando}
            className={`${enviando ? 'opacity-70 cursor-not-allowed' : ''} btn-primary py-3 px-8 text-lg font-medium`}
          >
            {enviando ? 'Enviando...' : 'Quero esta proposta'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log('📱 Botão "Sair" clicado!');
              if (typeof onCancel === 'function') {
                onCancel();
              } else {
                console.error('📱 onCancel não é uma função válida:', onCancel);
              }
            }}
            className="btn-outline-primary py-3 px-8 text-lg"
            disabled={enviando}
          >
            Sair
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationResult;
