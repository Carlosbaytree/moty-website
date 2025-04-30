'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegistarPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar se as passwords coincidem
    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    // Validar complexidade da password
    if (password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, nome);
      router.push('/perfil');
    } catch (error: any) {
      console.error('Erro ao registar:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está a ser utilizado.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido.');
      } else if (error.code === 'auth/weak-password') {
        setError('A palavra-passe é demasiado fraca.');
      } else {
        setError('Ocorreu um erro ao registar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar Conta</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                  placeholder="Introduza o seu nome completo"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                  placeholder="Introduza o seu email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Palavra-passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                  placeholder="Introduza a sua palavra-passe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Palavra-passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                  placeholder="Confirme a sua palavra-passe"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-moty-red focus:ring-moty-red border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Aceito os <a href="#" className="text-moty-red hover:underline">Termos e Condições</a> e a <a href="#" className="text-moty-red hover:underline">Política de Privacidade</a>
                </label>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary py-3 text-lg font-medium"
                  disabled={loading}
                >
                  {loading ? 'A processar...' : 'Registar'}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Já tem conta?{' '}
                  <Link href="/entrar" className="text-moty-red hover:underline">
                    Iniciar Sessão
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
