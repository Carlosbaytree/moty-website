# MOTY - Seguradora Digital para Motociclistas

## Sobre o Projeto

MOTY é uma seguradora digital dedicada exclusivamente a motociclistas em Portugal. A plataforma oferece:

- **Seguro Digital**: Contratação simples de seguros para motas
- **Assistência Inteligente**: Localização de oficinas, hospitais e serviços de emergência em tempo real
- **Comunidade e Interatividade**: Partilha de rotas e locais recomendados por motociclistas
- **Emergência em Estrada**: Agente inteligente para situações de emergência

## Tecnologias Utilizadas

- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js (a ser implementado)
- **Banco de Dados**: Firebase, MongoDB (a ser implementado)
- **APIs**: Google Maps, OpenStreetMap (a ser implementado)

## Estrutura do Projeto

```
moty-website/
├── public/             # Recursos estáticos
│   └── images/         # Imagens do site
├── src/
│   ├── app/            # Páginas da aplicação (Next.js App Router)
│   ├── components/     # Componentes reutilizáveis
│   ├── lib/            # Funções e utilitários
│   └── styles/         # Estilos globais
├── package.json        # Dependências do projeto
├── next.config.js      # Configuração do Next.js
├── tailwind.config.js  # Configuração do Tailwind CSS
└── README.md           # Documentação
```

## Páginas Principais

- **Página Inicial**: Apresentação da MOTY e seus serviços
- **Simulador**: Simulação e contratação de seguros
- **Assistência**: Localização de serviços e assistência em tempo real
- **Comunidade**: Rotas, eventos, moto clubes e fórum
- **Contactos**: Informações de contacto e formulário

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd moty-website
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Aceda a [http://localhost:3000](http://localhost:3000) no seu navegador.

## Construção para Produção

```bash
npm run build
# ou
yarn build
```

## Iniciar em Produção

```bash
npm run start
# ou
yarn start
```

## Funcionalidades a Implementar

- [ ] Integração com APIs de mapas
- [ ] Autenticação de utilizadores
- [ ] Sistema de cálculo de seguros
- [ ] Base de dados para rotas e eventos
- [ ] Chat de assistência com IA
- [ ] Aplicação móvel

## Licença

Este projeto está licenciado sob a licença MIT.
