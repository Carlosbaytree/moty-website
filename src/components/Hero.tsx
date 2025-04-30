'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden">
      {/* Background image full width */}
      <Image
        src="/hero-moto.jpg"
        alt="Motociclista em estrada de montanha"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="z-0"
      />
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <div className="relative z-20 container-custom mx-auto px-6 flex flex-col items-start justify-center h-full">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Seguro Digital<br />para Motociclistas
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl text-white mb-8 max-w-xl drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Proteção, assistência e comunidade. Tudo o que precisas, numa só plataforma.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link href="/simulador" className="btn-primary text-lg px-8 py-4">
            Simular Seguro
          </Link>
        </motion.div>
      </div>
      {/* Wave divider no fundo para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
