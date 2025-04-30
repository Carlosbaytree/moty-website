"use client";

import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
import { FiShield, FiMapPin, FiUsers, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import FaqItem from '@/components/FaqItem';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Secção de Serviços */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Os Nossos Serviços</h2>
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
      
      {/* FAQ / O que fazer em caso de acidente */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">O que fazer em caso de acidente</h2>
            <p className="text-moty-gray text-lg">Segue os passos essenciais para garantir a tua segurança e uma participação correta.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <FaqItem
              question="O que fazer em caso de acidente?"
              answer={<>
                <p>Mantém a calma e recolhe os seguintes dados:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Dados dos intervenientes no acidente (nome, morada, contacto, n.º do documento de identificação e da carta de condução);</li>
                  <li>Dados de eventuais testemunhas;</li>
                  <li>Dados referentes às viaturas envolvidas e respetivas seguradoras (marca, matrícula, seguradora, n.º de apólice);</li>
                  <li>Local, dia e hora do acidente, esboço do mesmo e registo fotográfico (sempre que possível), com indicação dos danos;</li>
                  <li>Certifica-te que os outros intervenientes têm seguro válido (verifica na Carta Verde ou Certificado Provisório). Se não houver seguro válido, chama de imediato as autoridades.</li>
                </ul>
              </>}
            />
            <FaqItem
              question="Como preencher a declaração amigável (DAAA)?"
              answer={<>
                <p>Preenche sempre a Declaração Amigável, exceto se for impossível. Garante que está completa e correta. Segue estas recomendações:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Preenche toda a frente da declaração, incluindo data, hora e local do acidente.</li>
                  <li>Faz o desenho do acidente na frente (mesmo que as autoridades digam que não é necessário, é sempre aconselhável).</li>
                  <li>Assinala as circunstâncias do acidente para os veículos A e B.</li>
                  <li>Indica os danos visíveis em cada veículo.</li>
                  <li>Identifica as seguradoras e as matrículas de todos os veículos envolvidos.</li>
                  <li>Garante que ambos os condutores assinam a declaração.</li>
                  <li>Só deves incluir testemunhas se estas tiverem prestado declarações à polícia no local.</li>
                  <li>Descreve o acidente detalhadamente no verso, sem omitir detalhes relevantes.</li>
                  <li>Indica no verso se houve intervenção das autoridades.</li>
                  <li>Identifica a oficina (nome, morada, telefone, NIF, etc.).</li>
                  <li>Cada interveniente deve ficar com uma cópia da DAAA.</li>
                </ul>
                <p className="mt-2">Seguindo estes passos, o processo será mais rápido e eficiente.</p>
              </>}
            />
            <FaqItem
              question="Como participar um acidente?"
              answer={<>
                <p>Podes participar um acidente junto da seguradora enviando a Declaração Amigável, devidamente preenchida e assinada, através da tua área de cliente MOTY.</p>
                <p className="mt-2">Em alternativa, podes fazer a participação diretamente na aplicação da Associação Portuguesa de Seguradores (APS), disponível em <a href="https://www.moty.pt" target="_blank" rel="noopener noreferrer" className="text-moty-red underline">MOTY.pt</a>.</p>
              </>}
            />
            <FaqItem
              question="Qual o prazo da participação?"
              answer={<>
                <p>A Declaração Amigável deve ser enviada ou entregue à seguradora o mais rapidamente possível, nunca ultrapassando oito dias após o acidente ou do dia em que teve conhecimento do mesmo.</p>
              </>}
            />
            <FaqItem
              question="E se o acidente for no estrangeiro?"
              answer={<>
                <p>Se o acidente acontecer no estrangeiro ou envolver um veículo com matrícula estrangeira, deves contactar o Gabinete Português de Carta Verde (junto da APS) para apoio:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Telefone: 21 384 81 01 / 38 / 32</li>
                  <li>Morada: Rua Rodrigo da Fonseca n.º 41, 1070-157 Lisboa</li>
                </ul>
              </>}
            />
            <FaqItem
              question="Como reclamar como terceiro?"
              answer={<>
                <p>Se o condutor considerado responsável pelo acidente não participar o sinistro à seguradora, ou se não existir Convenção IDS entre as seguradoras envolvidas, a reclamação do acidente e dos danos deve ser feita diretamente à seguradora do condutor responsável.</p>
              </>}
            />
            <FaqItem
              question="Como deve ser feita essa reclamação?"
              answer={<>
                <p>Deves reclamar o acidente à seguradora do presumível responsável, podendo usar para isso a Declaração Amigável (DAAA). Para que a participação seja aceite, junta pelo menos um dos seguintes elementos de prova:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Declaração Amigável (DAAA), se tiver sido preenchida e assinada pelos intervenientes;</li>
                  <li>Auto de ocorrência, levantado na esquadra da PSP ou GNR que tomou conta da ocorrência;</li>
                  <li>Dados das testemunhas (nome, morada e telefone);</li>
                  <li>Se a viatura ficou danificada, podes indicar o nome, morada, telefone e NIF da oficina onde pretendes fazer a avaliação/reparação para efeitos de peritagem.</li>
                </ul>
              </>}
            />
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
      
      {/* CTA Final: Quero ser contactado */}
      <section className="py-16 bg-gradient-to-br from-moty-gray via-white to-moty-light-gray text-moty-black">
        <div className="container-custom mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Queres saber mais ou ter uma proposta personalizada?</h2>
          <p className="mb-6 text-lg text-moty-gray">Deixa o teu contacto e um agente MOTY entrará em contacto contigo para esclarecer dúvidas ou apresentar a melhor solução para ti. Sem compromisso!</p>
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-moty-red text-white rounded-full font-semibold text-lg shadow-lg hover:bg-red-700 transition-colors"
          >
            Quero ser contactado
          </a>
          <div className="mt-4 text-moty-gray text-sm flex justify-center items-center gap-2">
            <svg className="w-5 h-5 inline-block text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.9 1.4,7.6 6,11.9 4.7,18 9.9,14.8 15.1,18 13.8,11.9 18.4,7.6 12.2,6.9 "/></svg>
            Resposta rápida e personalizada. Sem compromisso.
          </div>
        </div>
      </section>
      
      {/* Bloco Comunidade / Redes Sociais */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moty-black">Junta-te à Comunidade MOTY</h2>
          <p className="text-moty-gray text-lg mb-8">Partilha experiências, descobre rotas, participa em eventos e fica a par das novidades do mundo das motas. Segue-nos e faz parte da maior comunidade de motociclistas digitais em Portugal!</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full shadow p-4 flex flex-col items-center w-32 hover:bg-moty-red/10 transition">
              {/* Facebook SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 mb-2 text-[#1877F3]" aria-hidden="true">
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/>
              </svg>
              <span className="font-semibold text-moty-black">Facebook</span>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full shadow p-4 flex flex-col items-center w-32 hover:bg-moty-red/10 transition">
              {/* Instagram SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 mb-2 text-[#E4405F]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.346.446-.519.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.356.709.243 1.262.388 1.694.497.712.181 1.36.155 1.872.094.571-.067 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12 2.163c-5.468 0-9.837 4.369-9.837 9.837 0 1.737.453 3.44 1.312 4.938L2 22l5.154-1.352a9.816 9.816 0 0 0 4.846 1.235h.004c5.467 0 9.836-4.369 9.836-9.837 0-2.625-1.023-5.093-2.877-6.948C17.093 3.186 14.625 2.163 12 2.163z"/>
              </svg>
              <span className="font-semibold text-moty-black">Instagram</span>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full shadow p-4 flex flex-col items-center w-32 hover:bg-moty-red/10 transition">
              {/* YouTube SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 mb-2 text-[#FF0000]" aria-hidden="true">
                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.391.569A2.994 2.994 0 0 0 .502 6.186c-.569 1.951-.569 6.014-.569 6.014s0 4.063.569 6.014a2.994 2.994 0 0 0 2.107 2.117C4.56 20.5 12 20.5 12 20.5s7.44 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117c.569-1.951.569-6.014.569-6.014s0-4.063-.569-6.014zM9.75 15.02V8.98l6.5 3.02-6.5 3.02z"/>
              </svg>
              <span className="font-semibold text-moty-black">YouTube</span>
            </a>
            <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full shadow p-4 flex flex-col items-center w-32 hover:bg-moty-red/10 transition">
              {/* WhatsApp SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 mb-2 text-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.346.446-.519.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.356.709.243 1.262.388 1.694.497.712.181 1.36.155 1.872.094.571-.067 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12 2.163c-5.468 0-9.837 4.369-9.837 9.837 0 1.737.453 3.44 1.312 4.938L2 22l5.154-1.352a9.816 9.816 0 0 0 4.846 1.235h.004c5.467 0 9.836-4.369 9.836-9.837 0-2.625-1.023-5.093-2.877-6.948C17.093 3.186 14.625 2.163 12 2.163z"/>
              </svg>
              <span className="font-semibold text-moty-black">WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Bloco de Parceiros / Confiança */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-moty-black">Parceiros &amp; Confiança</h2>
            <p className="text-moty-gray text-lg">A MOTY trabalha com entidades de referência para garantir a máxima proteção e confiança aos motociclistas.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Exemplos de logos de parceiros (usar imagens reais quando disponíveis) */}
            <div className="bg-moty-light-gray rounded-xl shadow p-4 flex items-center justify-center w-40 h-20">
              <img src="/partners/logo1.svg" alt="Parceiro 1" className="max-h-12 mx-auto" />
            </div>
            <div className="bg-moty-light-gray rounded-xl shadow p-4 flex items-center justify-center w-40 h-20">
              <img src="/partners/logo2.svg" alt="Parceiro 2" className="max-h-12 mx-auto" />
            </div>
            <div className="bg-moty-light-gray rounded-xl shadow p-4 flex items-center justify-center w-40 h-20">
              <img src="/partners/logo3.svg" alt="Parceiro 3" className="max-h-12 mx-auto" />
            </div>
            <div className="bg-moty-light-gray rounded-xl shadow p-4 flex items-center justify-center w-40 h-20">
              <img src="/partners/logo4.svg" alt="Parceiro 4" className="max-h-12 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
