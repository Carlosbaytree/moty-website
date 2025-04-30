'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiShield, FiFileText, FiAlertCircle } from 'react-icons/fi';

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('perfil');
  
  // Dados fictícios para demonstração
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '912 345 678',
    dataNascimento: '01/01/1985',
    morada: 'Rua Principal, 123, 1000-100 Lisboa',
    nif: '123456789',
    cartaConducao: 'L-123456789',
  });
  
  const [seguros, setSeguros] = useState([
    {
      id: 'SEG-2023-001',
      tipo: 'Seguro de Mota - Responsabilidade Civil',
      veiculo: 'Honda CBR 600RR (2020)',
      dataInicio: '01/01/2023',
      dataFim: '31/12/2023',
      estado: 'Ativo',
      valor: '350,00€',
      cobertura: 'Responsabilidade Civil'
    }
  ]);
  
  const [sinistros, setSinistros] = useState([
    {
      id: 'SIN-2023-001',
      data: '15/03/2023',
      local: 'Avenida da Liberdade, Lisboa',
      descricao: 'Colisão lateral com automóvel',
      estado: 'Em processamento',
      seguro: 'SEG-2023-001'
    }
  ]);
  
  useEffect(() => {
    if (!user) {
      router.push('/entrar');
    } else {
      // Atualizar dados do usuário com informações do Firebase
      setUserData(prevData => ({
        ...prevData,
        nome: user.displayName || 'Utilizador',
        email: user.email || '',
      }));
    }
  }, [user, router]);
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao terminar sessão:', error);
    }
  };
  
  if (!user) {
    return <div className="container-custom mx-auto py-16 text-center">A carregar...</div>;
  }
  
  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-24 h-24 mb-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Foto de perfil"
                        className="rounded-full object-cover w-24 h-24"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-moty-light-gray rounded-full flex items-center justify-center text-moty-black text-2xl font-bold">
                        {userData.nome.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{userData.nome}</h2>
                  <p className="text-moty-gray">{userData.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('perfil')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'perfil' ? 'bg-moty-red text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FiUser className="mr-2" /> Perfil
                  </button>
                  <button
                    onClick={() => setActiveTab('seguros')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'seguros' ? 'bg-moty-red text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FiShield className="mr-2" /> Meus Seguros
                  </button>
                  <button
                    onClick={() => setActiveTab('sinistros')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'sinistros' ? 'bg-moty-red text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FiAlertCircle className="mr-2" /> Sinistros
                  </button>
                  <button
                    onClick={() => setActiveTab('documentos')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'documentos' ? 'bg-moty-red text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FiFileText className="mr-2" /> Documentos
                  </button>
                </nav>
                
                <div className="mt-8 pt-4 border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Terminar Sessão
                  </button>
                </div>
              </div>
            </div>
            
            {/* Conteúdo Principal */}
            <div className="col-span-1 md:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Perfil */}
                {activeTab === 'perfil' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <FiUser className="text-moty-gray mr-2" />
                            <span>{userData.nome}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <FiMail className="text-moty-gray mr-2" />
                            <span>{userData.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <FiPhone className="text-moty-gray mr-2" />
                            <span>{userData.telefone}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <FiCalendar className="text-moty-gray mr-2" />
                            <span>{userData.dataNascimento}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Morada</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <FiMapPin className="text-moty-gray mr-2" />
                            <span>{userData.morada}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-moty-gray mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{userData.nif}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Carta de Condução</label>
                          <div className="flex items-center border rounded-md px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-moty-gray mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <span>{userData.cartaConducao}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button className="btn-primary px-6 py-2">
                            Editar Informações
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Seguros */}
                {activeTab === 'seguros' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Meus Seguros</h2>
                      <button className="btn-primary px-4 py-2 text-sm">
                        + Novo Seguro
                      </button>
                    </div>
                    
                    {seguros.map((seguro) => (
                      <div key={seguro.id} className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{seguro.tipo}</h3>
                            <p className="text-moty-gray">{seguro.veiculo}</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {seguro.estado}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-moty-gray">Período</p>
                            <p>{seguro.dataInicio} a {seguro.dataFim}</p>
                          </div>
                          <div>
                            <p className="text-sm text-moty-gray">Valor Anual</p>
                            <p className="font-bold">{seguro.valor}</p>
                          </div>
                          <div>
                            <p className="text-sm text-moty-gray">Cobertura</p>
                            <p>{seguro.cobertura}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex space-x-2">
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Ver Detalhes
                          </button>
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Renovar
                          </button>
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Documentos
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 text-center">
                      <button className="text-moty-red hover:underline">
                        Ver histórico de seguros
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Sinistros */}
                {activeTab === 'sinistros' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Sinistros</h2>
                      <button className="btn-primary px-4 py-2 text-sm">
                        + Reportar Sinistro
                      </button>
                    </div>
                    
                    {sinistros.map((sinistro) => (
                      <div key={sinistro.id} className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">Sinistro #{sinistro.id}</h3>
                            <p className="text-moty-gray">{sinistro.data} - {sinistro.local}</p>
                          </div>
                          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            {sinistro.estado}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-moty-gray">Descrição</p>
                          <p>{sinistro.descricao}</p>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-moty-gray">Seguro Associado</p>
                          <p>{sinistro.seguro}</p>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex space-x-2">
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Ver Detalhes
                          </button>
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Adicionar Documentos
                          </button>
                          <button className="btn-outline-primary px-4 py-1 text-sm">
                            Contactar Assistente
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 text-center">
                      <button className="text-moty-red hover:underline">
                        Ver histórico de sinistros
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Documentos */}
                {activeTab === 'documentos' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Documentos</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-moty-red mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <h3 className="font-bold">Apólice de Seguro</h3>
                            <p className="text-sm text-moty-gray">SEG-2023-001.pdf</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="text-moty-red hover:underline text-sm">
                            Descarregar
                          </button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-moty-red mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <h3 className="font-bold">Carta Verde</h3>
                            <p className="text-sm text-moty-gray">carta-verde-2023.pdf</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="text-moty-red hover:underline text-sm">
                            Descarregar
                          </button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-moty-red mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <h3 className="font-bold">Relatório de Sinistro</h3>
                            <p className="text-sm text-moty-gray">sinistro-SIN-2023-001.pdf</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="text-moty-red hover:underline text-sm">
                            Descarregar
                          </button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-moty-red mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <h3 className="font-bold">Fatura Anual</h3>
                            <p className="text-sm text-moty-gray">fatura-2023.pdf</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <button className="text-moty-red hover:underline text-sm">
                            Descarregar
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="btn-primary px-6 py-2">
                        Carregar Novo Documento
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
