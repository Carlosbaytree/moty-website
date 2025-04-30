'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-moty-black">
              <span className="text-moty-red">MO</span>TY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/seguros" className="font-medium hover:text-moty-red">
              Seguros
            </Link>
            <Link href="/assistencia" className="font-medium hover:text-moty-red">
              Assistência
            </Link>
            <Link href="/comunidade" className="font-medium hover:text-moty-red">
              Comunidade
            </Link>
            <Link href="/eventos" className="font-medium hover:text-moty-red">
              Eventos
            </Link>
            <Link href="/contactos" className="font-medium hover:text-moty-red">
              Contactos
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/entrar" className="font-medium hover:text-moty-red">
              Entrar
            </Link>
            <Link href="/simulador" className="btn-primary">
              Simular Seguro
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-moty-black hover:text-moty-red"
              aria-label={isMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/seguros" 
              className="font-medium hover:text-moty-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Seguros
            </Link>
            <Link 
              href="/assistencia" 
              className="font-medium hover:text-moty-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Assistência
            </Link>
            <Link 
              href="/comunidade" 
              className="font-medium hover:text-moty-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Comunidade
            </Link>
            <Link 
              href="/eventos" 
              className="font-medium hover:text-moty-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/contactos" 
              className="font-medium hover:text-moty-red py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactos
            </Link>
            <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
              <Link 
                href="/entrar" 
                className="font-medium hover:text-moty-red py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link 
                href="/simulador" 
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Simular Seguro
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
