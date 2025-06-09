# Aplicação Web de Produtores Rurais

## 📋 Visão Geral

Esta é uma aplicação web moderna construída para gerenciar e apoiar produtores rurais. A aplicação é desenvolvida usando React com TypeScript, seguindo as melhores práticas e padrões modernos de desenvolvimento.

## 🎯 Objetivos

- Fornecer uma interface amigável para gerenciamento de dados de produtores rurais

## 🏗️ Arquitetura

### Stack Tecnológica

- **Framework Frontend**: React 19
- **Linguagem**: TypeScript
- **Ferramenta de Build**: Vite
- **Gerenciamento de Estado**: Redux Toolkit
- **Manipulação de Formulários**: React Hook Form com validação Zod
- **Estilização**: Styled Components
- **Roteamento**: React Router DOM
- **Visualização de Dados**: Recharts
- **Testes**: Jest com React Testing Library

### Estrutura do Projeto

```
src/
├── api/          # Integração e serviços de API
├── app/          # Configuração da store Redux
├── assets/       # Recursos estáticos (imagens, fontes, etc.)
├── components/   # Componentes UI reutilizáveis
├── features/     # Componentes e lógica específicos de funcionalidades
├── layouts/      # Componentes de layout de página
├── routes/       # Configuração de rotas da aplicação
├── styles/       # Estilos globais e tema
├── utils/        # Funções utilitárias e auxiliares
├── __tests__/    # Arquivos de teste
└── __mocks__/    # Dados mock para testes
```

### Principais Características

- **Segurança de Tipos**: Implementação completa em TypeScript
- **Gerenciamento de Estado**: Gerenciamento centralizado de estado com Redux Toolkit
- **Validação de Formulários**: Manipulação robusta de formulários com React Hook Form e Zod
- **Arquitetura de Componentes**: Estrutura modular e reutilizável de componentes
- **Testes**: Suíte abrangente de testes com Jest
- **Qualidade de Código**: Configuração ESLint para padrões de código
- **Desenvolvimento Moderno**: Hot module replacement com Vite

## 🚀 Começando

### Pré-requisitos

- Node.js (Versão LTS mais recente recomendada)
- Gerenciador de pacotes npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositório]
cd rural_producers_web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm run preview` - Visualiza build de produção
- `npm run test` - Executa os testes
- `npm run lint` - Executa o ESLint

## 🧪 Testes

O projeto utiliza Jest e React Testing Library para testes. Execute os testes com:

```bash
npm run test
```

## 📦 Build

Para criar uma build de produção:

```bash
npm run build
```

Os artefatos da build serão armazenados no diretório `dist/`.
