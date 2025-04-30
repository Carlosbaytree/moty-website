"use client";

import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { FiShield, FiMapPin, FiUsers, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Secção de Serviços */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Os Nossos Serviços</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              A MOTY oferece um ecossistema completo de serviços para motociclistas, combinando proteção, assistência e comunidade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Serviço 1 - Seguro Digital (Destaque) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0 }}
              className="card hover:shadow-2xl border-2 border-moty-red bg-moty-red/5 transition-shadow scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-moty-red bg-opacity-20 p-4 rounded-full mb-4">
                  <FiShield className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seguro Digital</h3>
                <p className="text-moty-gray">
                  Contrate o seu seguro de mota 100% online, de forma simples e rápida, com coberturas personalizadas.
                </p>
                <Link href="/simulador" className="btn-primary mt-4 w-full">
                  Simular Seguro
                </Link>
                <span className="block text-xs text-moty-gray mt-1">Rápido, grátis e sem compromisso.</span>
              </div>
            </motion.div>
            
            {/* Serviço 2 - Assistência Inteligente */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiMapPin className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Assistência Inteligente</h3>
                <p className="text-moty-gray">
                  Localize oficinas, hospitais e serviços de emergência em tempo real, onde quer que esteja.
                </p>
                <Link href="/assistencia" className="btn-outline mt-4 w-full">
                  Saber mais
                </Link>
                <span className="block text-xs text-moty-gray mt-1">Encontre ajuda em segundos, onde estiver.</span>
              </div>
            </motion.div>
            
            {/* Serviço 3 - Comunidade Ativa */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiUsers className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comunidade Ativa</h3>
                <p className="text-moty-gray">
                  Partilhe rotas, participe em eventos e conecte-se com outros motociclistas da comunidade MOTY.
                </p>
                <Link href="/comunidade" className="btn-outline mt-4 w-full">
                  Explorar Comunidade
                </Link>
                <span className="block text-xs text-moty-gray mt-1">Partilhe rotas, participe em eventos e faça amigos.</span>
              </div>
            </motion.div>
            
            {/* Serviço 4 - Emergência em Estrada */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiPhone className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Emergência em Estrada</h3>
                <p className="text-moty-gray">
                  Assistente inteligente que o ajuda em caso de acidente, chamando emergências e preenchendo formulários.
                </p>
                <Link href="/emergencia" className="btn-outline mt-4 w-full">
                  Como funciona
                </Link>
                <span className="block text-xs text-moty-gray mt-1">Assistência digital imediata em caso de acidente.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Bloco CTA Simulador - layout anterior restaurado com foto */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Simule o Seu Seguro</h2>
                <p className="text-moty-gray mb-6">
                  Obtenha uma cotação personalizada para o seu seguro de mota em menos de 2 minutos. Sem compromisso e com as melhores coberturas do mercado.
                </p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                    Processo 100% digital
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                    Coberturas personalizáveis
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                    Assistência 24/7 incluída
                  </li>
                </ul>
                <Link href="/simulador" className="btn-primary text-center py-3 w-full md:w-auto">
                  Simular Agora
                </Link>
              </div>
              <div className="w-full md:w-1/2 relative min-h-[300px]">
                <Image
                  src="/simulador-bg.jpg"
                  alt="Motociclista atravessando rio"
                  fill
                  style={{ objectFit: 'cover', filter: 'grayscale(0.8)', opacity: 0.45 }}
                  className=""
                  priority
                />
                {/* Overlay cinza avermelhado */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(225,29,72,0.15) 0%, rgba(17,24,39,0.25) 100%)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Depoimentos / O que dizem os nossos clientes */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">O Que Dizem os Nossos Clientes</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-2xl mx-auto">
              A confiança dos nossos clientes é o nosso maior orgulho. Veja o que dizem sobre a MOTY!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0 }}
              className="bg-moty-light-gray rounded-lg shadow-md p-8 flex flex-col items-center"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.9 1.4,7.6 6,11.9 4.7,18 9.9,14.8 15.1,18 13.8,11.9 18.4,7.6 12.2,6.9 "/></svg>
                ))}
              </div>
              <p className="text-moty-gray italic mb-4 text-center">“O processo foi super rápido e transparente. Recomendo a todos os motociclistas!”</p>
              <div className="font-bold text-moty-black">João M.</div>
              <div className="text-xs text-moty-gray">Cliente desde 2023</div>
            </motion.div>
            {/* Depoimento 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-moty-light-gray rounded-lg shadow-md p-8 flex flex-col items-center"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.9 1.4,7.6 6,11.9 4.7,18 9.9,14.8 15.1,18 13.8,11.9 18.4,7.6 12.2,6.9 "/></svg>
                ))}
              </div>
              <p className="text-moty-gray italic mb-4 text-center">“Excelente atendimento e coberturas personalizadas. Senti-me sempre acompanhada!”</p>
              <div className="font-bold text-moty-black">Maria S.</div>
              <div className="text-xs text-moty-gray">Cliente desde 2024</div>
            </motion.div>
            {/* Depoimento 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-moty-light-gray rounded-lg shadow-md p-8 flex flex-col items-center"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.9 1.4,7.6 6,11.9 4.7,18 9.9,14.8 15.1,18 13.8,11.9 18.4,7.6 12.2,6.9 "/></svg>
                ))}
              </div>
              <p className="text-moty-gray italic mb-4 text-center">“A plataforma é intuitiva e a assistência 24/7 faz toda a diferença!”</p>
              <div className="font-bold text-moty-black">Ricardo P.</div>
              <div className="text-xs text-moty-gray">Cliente desde 2023</div>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <Link href="/simulador" className="btn-primary text-lg px-8 py-3 inline-block">
              Quero ser o próximo cliente satisfeito
            </Link>
            <div className="text-xs text-moty-gray mt-2">Junta-te à comunidade MOTY e experimenta tu mesmo!</div>
          </div>
        </div>
      </section>
      
      {/* Secção de CTA */}
      <section className="py-16 bg-moty-black text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Juntar-se à Comunidade MOTY?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Faça parte da maior comunidade de motociclistas de Portugal e desfrute de proteção, assistência e benefícios exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/simulador" className="btn-primary text-center py-3 px-6">
              Simular Seguro
            </Link>
            <Link href="/contactos" className="btn-outline text-center py-3 px-6">
              Fale Connosco
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
