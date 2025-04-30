'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-moty-black to-moty-gray overflow-hidden">
      {/* Overlay de imagem com efeito de opacidade */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-background.jpg"
          alt="Motociclista na estrada"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center py-16 md:py-24">
          {/* Conteúdo do Hero */}
          <motion.div 
            className="w-full lg:w-1/2 text-white mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Seguro para Motociclistas, <span className="text-moty-red">Feito por Motociclistas</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              A MOTY é a primeira seguradora digital em Portugal dedicada exclusivamente a motociclistas. Proteção completa, assistência inteligente e uma comunidade ativa.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/simulador" className="btn-primary text-center py-3 px-6 text-lg">
                Simular Seguro
              </Link>
              <Link href="/comunidade" className="btn-outline text-center py-3 px-6 text-lg">
                Explorar Comunidade
              </Link>
            </div>
          </motion.div>
          
          {/* Imagem/Ilustração */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md h-80 md:h-96">
              <Image
                src="/images/hero-motorcycle.png"
                alt="Mota MOTY"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
