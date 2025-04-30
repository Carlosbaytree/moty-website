'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function EntrarPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { login, resetPassword } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/perfil');
    } catch (error: any) {
      console.error('Erro ao iniciar sessão:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Email ou palavra-passe incorretos.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Demasiadas tentativas falhadas. Tente novamente mais tarde.');
      } else {
        setError('Ocorreu um erro ao iniciar sessão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setError('');
      alert('Foi enviado um email para redefinir a sua palavra-passe. Verifique a sua caixa de entrada.');
      setForgotPassword(false);
    } catch (error: any) {
      console.error('Erro ao redefinir palavra-passe:', error);
      if (error.code === 'auth/user-not-found') {
        setError('Não existe nenhuma conta com este email.');
      } else {
        setError('Ocorreu um erro ao enviar o email de redefinição. Tente novamente.');
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
            <h1 className="text-3xl font-bold mb-6 text-center">
              {forgotPassword ? 'Recuperar Palavra-passe' : 'Iniciar Sessão'}
            </h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {forgotPassword ? (
              <form onSubmit={handleResetPassword} className="space-y-6">
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
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-lg font-medium"
                    disabled={loading}
                  >
                    {loading ? 'A processar...' : 'Enviar Email de Recuperação'}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setForgotPassword(false)}
                    className="text-moty-red hover:underline"
                  >
                    Voltar ao Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
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
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-moty-red focus:ring-moty-red border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-moty-red hover:underline"
                    >
                      Esqueceu a palavra-passe?
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-lg font-medium"
                    disabled={loading}
                  >
                    {loading ? 'A iniciar sessão...' : 'Entrar'}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Ainda não tem conta?{' '}
                    <Link href="/registar" className="text-moty-red hover:underline">
                      Registar
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
