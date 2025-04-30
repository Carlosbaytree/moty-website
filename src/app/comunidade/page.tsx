import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiUsers, FiMessageCircle, FiMap } from 'react-icons/fi';

export default function ComunidadePage() {
  return (
    <main>
      {/* Header da Comunidade */}
      <section className="bg-moty-black text-white py-12">
        <div className="container-custom mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comunidade MOTY</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Faça parte da maior comunidade de motociclistas de Portugal. Partilhe rotas, participe em eventos e conecte-se com outros motociclistas.
          </p>
        </div>
      </section>
      
      {/* Rotas Recomendadas */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Rotas Recomendadas</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Descubra as melhores rotas para motociclistas em Portugal, recomendadas pela nossa comunidade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Rota 1 */}
            <div className="card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/rota-serra-arrabida.jpg"
                  alt="Serra da Arrábida"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Serra da Arrábida</h3>
                <div className="flex items-center text-moty-gray mb-3">
                  <FiMapPin className="mr-1" />
                  <span>Setúbal, Portugal</span>
                </div>
                <p className="text-moty-gray mb-4">
                  Uma das mais belas estradas de Portugal, com vistas deslumbrantes para o oceano e curvas desafiantes.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md">120 km</span>
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md ml-2">Intermédio</span>
                  </div>
                  <Link href="/comunidade/rotas/serra-arrabida" className="text-moty-red hover:underline">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Rota 2 */}
            <div className="card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/rota-n2.jpg"
                  alt="Estrada Nacional 2"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Estrada Nacional 2</h3>
                <div className="flex items-center text-moty-gray mb-3">
                  <FiMapPin className="mr-1" />
                  <span>Chaves a Faro, Portugal</span>
                </div>
                <p className="text-moty-gray mb-4">
                  A mítica N2, a estrada que atravessa Portugal de norte a sul, com 738 km de história e paisagens diversas.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md">738 km</span>
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md ml-2">Avançado</span>
                  </div>
                  <Link href="/comunidade/rotas/n2" className="text-moty-red hover:underline">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Rota 3 */}
            <div className="card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/rota-serra-estrela.jpg"
                  alt="Serra da Estrela"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Serra da Estrela</h3>
                <div className="flex items-center text-moty-gray mb-3">
                  <FiMapPin className="mr-1" />
                  <span>Guarda, Portugal</span>
                </div>
                <p className="text-moty-gray mb-4">
                  Descubra o ponto mais alto de Portugal Continental com estradas sinuosas e paisagens de montanha deslumbrantes.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md">180 km</span>
                    <span className="text-sm bg-moty-light-gray px-2 py-1 rounded-md ml-2">Intermédio</span>
                  </div>
                  <Link href="/comunidade/rotas/serra-estrela" className="text-moty-red hover:underline">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/comunidade/rotas" className="btn-primary">
              Ver Todas as Rotas
            </Link>
          </div>
        </div>
      </section>
      
      {/* Eventos */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Próximos Eventos</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Participe nos eventos organizados pela MOTY e pelos nossos parceiros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Evento 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-moty-red text-white px-3 py-2 rounded-md text-sm font-medium">
                    28 Mai 2025
                  </div>
                  <div className="text-moty-gray text-sm">
                    Lisboa, Portugal
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">MOTY Riders Day</h3>
                <p className="text-moty-gray mb-4">
                  Um dia dedicado aos motociclistas MOTY, com passeios, workshops e convívio.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-moty-gray text-sm">
                    <FiUsers className="mr-1" />
                    <span>120 participantes</span>
                  </div>
                  <Link href="/eventos/moty-riders-day" className="text-moty-red hover:underline">
                    Saber Mais
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Evento 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-moty-red text-white px-3 py-2 rounded-md text-sm font-medium">
                    15 Jun 2025
                  </div>
                  <div className="text-moty-gray text-sm">
                    Porto, Portugal
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Workshop de Segurança</h3>
                <p className="text-moty-gray mb-4">
                  Workshop prático sobre técnicas de condução segura e primeiros socorros para motociclistas.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-moty-gray text-sm">
                    <FiUsers className="mr-1" />
                    <span>50 participantes</span>
                  </div>
                  <Link href="/eventos/workshop-seguranca" className="text-moty-red hover:underline">
                    Saber Mais
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Evento 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-moty-red text-white px-3 py-2 rounded-md text-sm font-medium">
                    10 Jul 2025
                  </div>
                  <div className="text-moty-gray text-sm">
                    Algarve, Portugal
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">MOTY Summer Ride</h3>
                <p className="text-moty-gray mb-4">
                  Passeio de verão pelo Algarve, com paragens em praias e locais turísticos.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-moty-gray text-sm">
                    <FiUsers className="mr-1" />
                    <span>80 participantes</span>
                  </div>
                  <Link href="/eventos/moty-summer-ride" className="text-moty-red hover:underline">
                    Saber Mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/eventos" className="btn-primary">
              Ver Todos os Eventos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Moto Clubes */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Moto Clubes Parceiros</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Conheça os moto clubes parceiros da MOTY em todo o país.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Moto Clube 1 */}
            <div className="card hover:shadow-lg transition-shadow text-center">
              <div className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-moty-light-gray rounded-full flex items-center justify-center">
                  <span className="text-moty-black font-bold">MC1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Riders Lisboa</h3>
                <p className="text-moty-gray mb-4">
                  Lisboa, Portugal
                </p>
                <Link href="/comunidade/moto-clubes/riders-lisboa" className="text-moty-red hover:underline">
                  Ver Perfil
                </Link>
              </div>
            </div>
            
            {/* Moto Clube 2 */}
            <div className="card hover:shadow-lg transition-shadow text-center">
              <div className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-moty-light-gray rounded-full flex items-center justify-center">
                  <span className="text-moty-black font-bold">MC2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Porto Bikers</h3>
                <p className="text-moty-gray mb-4">
                  Porto, Portugal
                </p>
                <Link href="/comunidade/moto-clubes/porto-bikers" className="text-moty-red hover:underline">
                  Ver Perfil
                </Link>
              </div>
            </div>
            
            {/* Moto Clube 3 */}
            <div className="card hover:shadow-lg transition-shadow text-center">
              <div className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-moty-light-gray rounded-full flex items-center justify-center">
                  <span className="text-moty-black font-bold">MC3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Algarve Riders</h3>
                <p className="text-moty-gray mb-4">
                  Faro, Portugal
                </p>
                <Link href="/comunidade/moto-clubes/algarve-riders" className="text-moty-red hover:underline">
                  Ver Perfil
                </Link>
              </div>
            </div>
            
            {/* Moto Clube 4 */}
            <div className="card hover:shadow-lg transition-shadow text-center">
              <div className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-moty-light-gray rounded-full flex items-center justify-center">
                  <span className="text-moty-black font-bold">MC4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Coimbra MC</h3>
                <p className="text-moty-gray mb-4">
                  Coimbra, Portugal
                </p>
                <Link href="/comunidade/moto-clubes/coimbra-mc" className="text-moty-red hover:underline">
                  Ver Perfil
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/comunidade/moto-clubes" className="btn-primary">
              Ver Todos os Moto Clubes
            </Link>
          </div>
        </div>
      </section>
      
      {/* Fórum */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Fórum MOTY</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Participe nas discussões do fórum MOTY e partilhe as suas experiências com outros motociclistas.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Tópicos Recentes</h3>
              
              <div className="space-y-4">
                {/* Tópico 1 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg hover:text-moty-red">
                        <Link href="/comunidade/forum/manutencao-mota">
                          Dicas de manutenção para a sua mota
                        </Link>
                      </h4>
                      <p className="text-moty-gray text-sm mt-1">
                        Iniciado por <span className="text-moty-black">João Silva</span> • 15 respostas
                      </p>
                    </div>
                    <div className="text-sm text-moty-gray">
                      Há 2 dias
                    </div>
                  </div>
                </div>
                
                {/* Tópico 2 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg hover:text-moty-red">
                        <Link href="/comunidade/forum/rotas-verao">
                          Melhores rotas para o verão 2025
                        </Link>
                      </h4>
                      <p className="text-moty-gray text-sm mt-1">
                        Iniciado por <span className="text-moty-black">Ana Martins</span> • 23 respostas
                      </p>
                    </div>
                    <div className="text-sm text-moty-gray">
                      Há 3 dias
                    </div>
                  </div>
                </div>
                
                {/* Tópico 3 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg hover:text-moty-red">
                        <Link href="/comunidade/forum/equipamento-seguranca">
                          Equipamento de segurança: o que não pode faltar?
                        </Link>
                      </h4>
                      <p className="text-moty-gray text-sm mt-1">
                        Iniciado por <span className="text-moty-black">Pedro Costa</span> • 31 respostas
                      </p>
                    </div>
                    <div className="text-sm text-moty-gray">
                      Há 5 dias
                    </div>
                  </div>
                </div>
                
                {/* Tópico 4 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg hover:text-moty-red">
                        <Link href="/comunidade/forum/seguros-comparacao">
                          Comparação de seguros: o que procurar?
                        </Link>
                      </h4>
                      <p className="text-moty-gray text-sm mt-1">
                        Iniciado por <span className="text-moty-black">Sofia Almeida</span> • 18 respostas
                      </p>
                    </div>
                    <div className="text-sm text-moty-gray">
                      Há 1 semana
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/comunidade/forum" className="btn-primary">
                  Aceder ao Fórum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partilha de Rotas */}
      <section className="py-16 bg-moty-black text-white">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Partilhe as Suas Rotas</h2>
              <p className="text-lg mb-6">
                Conhece uma rota espetacular que gostaria de partilhar com outros motociclistas? Utilize a nossa plataforma para partilhar as suas rotas favoritas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Partilhe rotas com a comunidade</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adicione pontos de interesse</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Classifique e comente rotas de outros utilizadores</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-moty-red mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Descarregue rotas para o seu GPS</span>
                </li>
              </ul>
              <Link href="/comunidade/partilhar-rota" className="btn-primary">
                Partilhar Rota
              </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/map-share.jpg"
                  alt="Partilha de Rotas"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
