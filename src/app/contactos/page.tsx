import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function ContactosPage() {
  return (
    <main>
      {/* Header de Contactos */}
      <section className="bg-moty-black text-white py-12">
        <div className="container-custom mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacte-nos</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Estamos disponíveis para responder a todas as suas questões. Entre em contacto connosco através dos seguintes meios.
          </p>
        </div>
      </section>
      
      {/* Informações de Contacto */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulário de Contacto */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Envie-nos uma Mensagem</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                    placeholder="Introduza o seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                    placeholder="Introduza o seu email"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                    placeholder="Introduza o seu telefone"
                  />
                </div>
                
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="seguros">Seguros</option>
                    <option value="assistencia">Assistência</option>
                    <option value="sinistros">Sinistros</option>
                    <option value="comunidade">Comunidade</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-moty-red focus:border-moty-red"
                    placeholder="Escreva a sua mensagem"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary py-2 px-6"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
            
            {/* Informações de Contacto */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Informações de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-moty-red bg-opacity-10 p-3 rounded-full mr-4">
                    <FiMapPin className="h-6 w-6 text-moty-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Morada</h3>
                    <p className="text-moty-gray">
                      Avenida da Liberdade, 245<br />
                      1250-143 Lisboa<br />
                      Portugal
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-moty-red bg-opacity-10 p-3 rounded-full mr-4">
                    <FiPhone className="h-6 w-6 text-moty-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Telefone</h3>
                    <p className="text-moty-gray">
                      Geral: +351 210 123 456<br />
                      Assistência: +351 210 123 789<br />
                      Sinistros: +351 210 123 987
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-moty-red bg-opacity-10 p-3 rounded-full mr-4">
                    <FiMail className="h-6 w-6 text-moty-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-moty-gray">
                      Geral: info@moty.pt<br />
                      Assistência: assistencia@moty.pt<br />
                      Sinistros: sinistros@moty.pt
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-moty-red bg-opacity-10 p-3 rounded-full mr-4">
                    <FiClock className="h-6 w-6 text-moty-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Horário de Atendimento</h3>
                    <p className="text-moty-gray">
                      Segunda a Sexta: 9h00 - 18h00<br />
                      Sábado: 9h00 - 13h00<br />
                      Assistência: 24/7
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Siga-nos nas Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-moty-gray hover:text-moty-red">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-moty-gray hover:text-moty-red">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-moty-gray hover:text-moty-red">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-moty-gray hover:text-moty-red">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mapa */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">A Nossa Localização</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Visite-nos na nossa sede em Lisboa.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-[500px] w-full bg-moty-light-gray">
              {/* Aqui seria integrado o mapa com Leaflet/Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-moty-gray">
                  Mapa será carregado aqui. Integração com Leaflet/Google Maps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Perguntas Frequentes</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre os nossos contactos e atendimento.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-2">Qual é o horário de atendimento?</h3>
                <p className="text-moty-gray">
                  O nosso horário de atendimento é de segunda a sexta-feira, das 9h00 às 18h00, e aos sábados das 9h00 às 13h00. A nossa assistência está disponível 24 horas por dia, 7 dias por semana.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-2">Quanto tempo demora a resposta a um email?</h3>
                <p className="text-moty-gray">
                  Procuramos responder a todos os emails no prazo máximo de 24 horas úteis. Em caso de urgência, recomendamos o contacto telefónico.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-2">Como posso reportar um sinistro?</h3>
                <p className="text-moty-gray">
                  Pode reportar um sinistro através da nossa aplicação móvel, do nosso website na área de cliente, ou contactando a nossa linha de sinistros: +351 210 123 987.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-2">Têm atendimento presencial?</h3>
                <p className="text-moty-gray">
                  Sim, temos atendimento presencial na nossa sede em Lisboa. Recomendamos o agendamento prévio através do nosso website ou por telefone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
