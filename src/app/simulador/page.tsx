'use client';

import { motion } from 'framer-motion';
import SimuladorForm from '@/components/simulador/SimuladorForm';
import FaqItem from '@/components/FaqItem';

export default function SimuladorPage() {
  return (
    <main>
      {/* Header do Simulador */}
      <section className="bg-moty-black text-white py-12">
        <div className="container-custom mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simulador de Seguro</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Simule o seu seguro de mota em poucos minutos. Preencha o formulário abaixo para obter uma cotação personalizada.
          </p>
        </div>
      </section>
      
      {/* Formulário do Simulador */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <SimuladorForm />
          </div>
        </div>
      </section>
      
      {/* Secção de Vantagens */}
      <section className="py-16 bg-moty-light-gray">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Vantagens do Seguro MOTY</h2>
            <p className="text-moty-gray text-lg mt-4 max-w-3xl mx-auto">
              Descubra por que o seguro MOTY é a escolha ideal para motociclistas exigentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vantagem 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="text-5xl font-bold text-moty-red mb-4">01</div>
                <h3 className="text-xl font-bold mb-2">Processo 100% Digital</h3>
                <p className="text-moty-gray">
                  Contrate o seu seguro totalmente online, sem papelada e sem burocracias. Simples e rápido.
                </p>
              </div>
            </div>
            
            {/* Vantagem 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="text-5xl font-bold text-moty-red mb-4">02</div>
                <h3 className="text-xl font-bold mb-2">Assistência 24/7</h3>
                <p className="text-moty-gray">
                  Conte com assistência em viagem 24 horas por dia, 7 dias por semana, em qualquer lugar de Portugal e Europa.
                </p>
              </div>
            </div>
            
            {/* Vantagem 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center p-6">
                <div className="text-5xl font-bold text-moty-red mb-4">03</div>
                <h3 className="text-xl font-bold mb-2">Comunidade Exclusiva</h3>
                <p className="text-moty-gray">
                  Acesso a eventos exclusivos, descontos em parceiros e partilha de rotas com outros motociclistas.
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
              Encontre respostas para as dúvidas mais comuns sobre o seguro MOTY.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FaqItem 
                question="Que tipos de seguro a MOTY oferece?" 
                answer="A MOTY oferece seguros de Responsabilidade Civil (obrigatório por lei) e seguros de Danos Próprios (todos os riscos), adaptados às necessidades específicas de motociclistas."
              />
              <FaqItem 
                question="Como funciona o processo de contratação?" 
                answer="Todo o processo é 100% digital. Basta preencher o simulador, escolher a opção que mais lhe convém, e finalizar a contratação online. Não é necessário enviar documentos físicos."
              />
              <FaqItem 
                question="Quanto tempo demora para o seguro ficar ativo?" 
                answer="Após a confirmação do pagamento, o seu seguro fica ativo em até 24 horas. Você receberá toda a documentação por email."
              />
              <FaqItem 
                question="Como posso reportar um sinistro?" 
                answer="Sinistros podem ser reportados diretamente através da aplicação MOTY, por telefone na nossa linha de apoio 24/7, ou através do formulário disponível no site."
              />
              <FaqItem 
                question="O que acontece se eu vender a minha mota?" 
                answer="Em caso de venda, você pode transferir o seguro para a nova mota ou cancelar a apólice. Entre em contacto com o nosso serviço de apoio ao cliente para avaliar a melhor opção."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
