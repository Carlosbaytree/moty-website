import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { FiShield, FiMapPin, FiUsers, FiPhone } from 'react-icons/fi';

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
            <div className="card hover:shadow-2xl border-2 border-moty-red bg-moty-red/5 transition-shadow scale-105">
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
            </div>
            
            {/* Serviço 2 - Assistência Inteligente */}
            <div className="card hover:shadow-lg transition-shadow">
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
            </div>
            
            {/* Serviço 3 - Comunidade Ativa */}
            <div className="card hover:shadow-lg transition-shadow">
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
            </div>
            
            {/* Serviço 4 - Emergência em Estrada */}
            <div className="card hover:shadow-lg transition-shadow">
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
            </div>
          </div>
        </div>
      </section>
      
      {/* Secção de Simulador */}
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
              <div className="w-full md:w-1/2 bg-moty-black relative min-h-[300px]">
                <Image
                  src="/images/simulator-image.jpg"
                  alt="Simulador de Seguro MOTY"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Secção de Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">O Que Dizem os Nossos Clientes</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Descubra por que os motociclistas de todo o país confiam na MOTY para a sua proteção.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <p className="text-moty-gray mb-4 italic">
                  "A MOTY revolucionou a forma como vejo os seguros de mota. Processo simples, rápido e com um atendimento excelente. Recomendo a todos os motociclistas!"
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
                  <div className="w-10 h-10 bg-moty-gray rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">João Silva</p>
                    <p className="text-sm text-moty-gray">Cliente desde 2024</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Depoimento 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <p className="text-moty-gray mb-4 italic">
                  "Tive um pequeno acidente e a assistência da MOTY foi impecável. Em minutos tinha ajuda no local e todo o processo foi tratado sem complicações. Excelente serviço!"
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
                  <div className="w-10 h-10 bg-moty-gray rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Ana Martins</p>
                    <p className="text-sm text-moty-gray">Cliente desde 2023</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Depoimento 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <p className="text-moty-gray mb-4 italic">
                  "A comunidade MOTY é incrível! Já participei em vários eventos e conheci pessoas fantásticas. Além de um ótimo seguro, ganhei amigos e descobri novas rotas!"
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
                  <div className="w-10 h-10 bg-moty-gray rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Pedro Costa</p>
                    <p className="text-sm text-moty-gray">Cliente desde 2024</p>
                  </div>
                </div>
              </div>
            </div>
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
