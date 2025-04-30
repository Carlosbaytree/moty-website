'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-moty-black text-white pt-12 pb-6">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              <span className="text-moty-red">MO</span>TY
            </h4>
            <p className="text-moty-light-gray mb-4">
              A MOTY é uma seguradora digital para motociclistas, com foco em serviços interativos e comunidade.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-moty-light-gray hover:text-moty-red">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-moty-light-gray hover:text-moty-red">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-moty-light-gray hover:text-moty-red">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-moty-light-gray hover:text-moty-red">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Seguros */}
          <div>
            <h4 className="text-xl font-bold mb-4">Seguros</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/seguros/responsabilidade-civil" className="text-moty-light-gray hover:text-moty-red">
                  Responsabilidade Civil
                </Link>
              </li>
              <li>
                <Link href="/seguros/danos-proprios" className="text-moty-light-gray hover:text-moty-red">
                  Danos Próprios
                </Link>
              </li>
              <li>
                <Link href="/seguros/assistencia" className="text-moty-light-gray hover:text-moty-red">
                  Assistência em Viagem
                </Link>
              </li>
              <li>
                <Link href="/seguros/protecao-juridica" className="text-moty-light-gray hover:text-moty-red">
                  Proteção Jurídica
                </Link>
              </li>
              <li>
                <Link href="/simulador" className="text-moty-light-gray hover:text-moty-red">
                  Simular Seguro
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Comunidade */}
          <div>
            <h4 className="text-xl font-bold mb-4">Comunidade</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/comunidade/rotas" className="text-moty-light-gray hover:text-moty-red">
                  Rotas Recomendadas
                </Link>
              </li>
              <li>
                <Link href="/comunidade/forum" className="text-moty-light-gray hover:text-moty-red">
                  Fórum
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-moty-light-gray hover:text-moty-red">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/comunidade/moto-clubes" className="text-moty-light-gray hover:text-moty-red">
                  Moto Clubes
                </Link>
              </li>
              <li>
                <Link href="/comunidade/oficinas" className="text-moty-light-gray hover:text-moty-red">
                  Oficinas Parceiras
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contactos */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contactos</h4>
            <ul className="space-y-2">
              <li className="text-moty-light-gray">
                <strong>Email:</strong> info@moty.pt
              </li>
              <li className="text-moty-light-gray">
                <strong>Telefone:</strong> +351 210 123 456
              </li>
              <li className="text-moty-light-gray">
                <strong>Emergência:</strong> +351 210 123 789
              </li>
              <li className="mt-4">
                <Link href="/contactos" className="text-moty-red hover:text-white">
                  Formulário de Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de separação */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-moty-light-gray text-sm">
              &copy; {currentYear} MOTY - Todos os direitos reservados
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/termos-condicoes" className="text-moty-light-gray hover:text-moty-red text-sm">
                Termos e Condições
              </Link>
              <Link href="/politica-privacidade" className="text-moty-light-gray hover:text-moty-red text-sm">
                Política de Privacidade
              </Link>
              <Link href="/cookies" className="text-moty-light-gray hover:text-moty-red text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
