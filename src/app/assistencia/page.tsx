import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiTool, FiPhone, FiAlertTriangle } from 'react-icons/fi';
import { FaHospital } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Importação dinâmica do componente de mapa para evitar erros de SSR
const MapaAssistencia = dynamic(() => import('@/components/MapaAssistencia'), {
  ssr: false,
  loading: () => (
    <div className="relative h-[500px] w-full bg-moty-light-gray flex items-center justify-center">
      <p className="text-moty-gray">A carregar mapa...</p>
    </div>
  )
});

export default function AssistenciaPage() {
  return (
    <main>
      {/* Header da Assistência */}
      <section className="bg-moty-black text-white py-12">
        <div className="container-custom mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Assistência Inteligente</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Serviços de localização e assistência em tempo real para motociclistas, disponíveis 24 horas por dia, 7 dias por semana.
          </p>
        </div>
      </section>
      
      {/* Mapa Interativo */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Encontre Serviços Próximos</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Utilize o nosso mapa interativo para localizar oficinas, hospitais e serviços de emergência próximos da sua localização.
            </p>
          </div>
          
          <MapaAssistencia />
          
          <div className="mt-8 text-center">
            <p className="text-moty-gray">
              Para utilizar todas as funcionalidades do mapa, permita o acesso à sua localização.
            </p>
          </div>
        </div>
      </section>
      
      {/* Serviços de Assistência */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Os Nossos Serviços de Assistência</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Conheça todos os serviços de assistência disponíveis para os clientes MOTY.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Serviço 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiTool className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Assistência Técnica</h3>
                <p className="text-moty-gray">
                  Assistência técnica na estrada 24/7. Reparação no local ou reboque para a oficina mais próxima.
                </p>
              </div>
            </div>
            
            {/* Serviço 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FaHospital className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Assistência Médica</h3>
                <p className="text-moty-gray">
                  Em caso de acidente, providenciamos assistência médica no local e transporte para o hospital mais próximo.
                </p>
              </div>
            </div>
            
            {/* Serviço 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiAlertTriangle className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Emergência em Estrada</h3>
                <p className="text-moty-gray">
                  O nosso assistente inteligente ajuda-o em caso de acidente, chamando emergências e preenchendo formulários.
                </p>
              </div>
            </div>
            
            {/* Serviço 4 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiMapPin className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Localização de Serviços</h3>
                <p className="text-moty-gray">
                  Localize oficinas, hospitais, postos de combustível e outros serviços próximos da sua localização.
                </p>
              </div>
            </div>
            
            {/* Serviço 5 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <FiPhone className="h-8 w-8 text-moty-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Linha de Apoio 24/7</h3>
                <p className="text-moty-gray">
                  Linha de apoio disponível 24 horas por dia, 7 dias por semana, para qualquer emergência ou dúvida.
                </p>
              </div>
            </div>
            
            {/* Serviço 6 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red bg-opacity-10 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-moty-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Assistente Virtual</h3>
                <p className="text-moty-gray">
                  O nosso assistente virtual está disponível 24/7 para responder a dúvidas e ajudar em emergências.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Como Funciona</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Conheça o processo de assistência da MOTY, desde o pedido até à resolução.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="relative">
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-moty-red text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pedido de Assistência</h3>
                  <p className="text-moty-gray">
                    Utilize a aplicação móvel MOTY ou ligue para a nossa linha de emergência para solicitar assistência.
                  </p>
                </div>
              </div>
              {/* Seta para o próximo passo (apenas visível em desktop) */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-moty-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Passo 2 */}
            <div className="relative">
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-moty-red text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Localização e Diagnóstico</h3>
                  <p className="text-moty-gray">
                    A nossa equipa localiza-o e faz um diagnóstico remoto da situação para enviar a assistência adequada.
                  </p>
                </div>
              </div>
              {/* Seta para o próximo passo (apenas visível em desktop) */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-moty-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Passo 3 */}
            <div>
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-moty-red text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Resolução</h3>
                  <p className="text-moty-gray">
                    A nossa equipa de assistência chega ao local para resolver o problema ou transportá-lo para o local mais adequado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* App MOTY */}
      <section className="py-16 bg-moty-black text-white">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Descarregue a App MOTY</h2>
              <p className="text-lg mb-6">
                Tenha todos os serviços de assistência MOTY na palma da sua mão. Descarregue a nossa aplicação móvel e aceda a:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pedido de assistência com um clique</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Localização de serviços próximos</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Assistente virtual para emergências</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gestão do seu seguro e sinistros</span>
                </li>
              </ul>
              <div className="flex space-x-4">
                <a href="#" className="inline-block">
                  <Image
                    src="/images/app-store.png"
                    alt="Descarregar na App Store"
                    width={140}
                    height={42}
                  />
                </a>
                <a href="#" className="inline-block">
                  <Image
                    src="/images/google-play.png"
                    alt="Descarregar no Google Play"
                    width={140}
                    height={42}
                  />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-[500px]">
                <Image
                  src="/images/app-mockup.png"
                  alt="App MOTY"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contactos de Emergência */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Contactos de Emergência</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Em caso de emergência, contacte-nos através dos seguintes números:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4">
                  <FiPhone />
                </div>
                <h3 className="text-xl font-bold mb-2">Assistência Técnica</h3>
                <p className="text-moty-red text-2xl font-bold">+351 210 123 456</p>
                <p className="text-moty-gray mt-2">
                  Para avarias e problemas técnicos com a sua mota.
                </p>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4">
                  <FaHospital />
                </div>
                <h3 className="text-xl font-bold mb-2">Emergência/Acidentes</h3>
                <p className="text-moty-red text-2xl font-bold">+351 210 123 789</p>
                <p className="text-moty-gray mt-2">
                  Para situações de emergência e acidentes.
                </p>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-moty-red text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Chat de Emergência</h3>
                <p className="text-moty-red text-xl font-bold">App MOTY</p>
                <p className="text-moty-gray mt-2">
                  Aceda ao chat de emergência através da nossa aplicação móvel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
