# Inov Letreiros - Plataforma de Orçamentos

Este é o projeto da plataforma premium da **Inov Letreiros**, focado em facilitar a solicitação de orçamentos para comunicação visual com integração direta ao WhatsApp e processamento de imagens em nuvem.

## 👩‍💻 Autora
**Thaísa Raquel** 📧 [thaisaraquel.dev@gmail.com](mailto:thaisaraquel.dev@gmail.com)

## 🛠 Tecnologias & Bibliotecas
O projeto utiliza o que há de mais moderno no ecossistema Frontend para garantir performance e escalabilidade:

### Core
- **Vite** & **React 18** (SWC)
- **TypeScript** (Tipagem rigorosa para maior segurança)
- **Tailwind CSS** & **Tailwind-animate** (Estilização e animações fluidas)

### UI/UX (Shadcn/UI & Radix)
- **Radix UI Primitives**: Componentes acessíveis (Dialog, Select, Toast, Tooltip, Accordion).
- **Lucide React**: Biblioteca de ícones vetoriais.
- **Embla Carousel**: Sistema de carrossel de alta performance.
- **Framer Motion / Tailwind Animate**: Transições de estados visuais.

### Gestão de Dados & Formulários
- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono.
- **React Hook Form**: Manipulação de formulários.
- **Zod**: Validação de esquemas e dados de entrada.

## 🔌 Integrações de API
- **ImgBB API**: Sistema de upload assíncrono que gera links temporários/permanentes para imagens enviadas pelos clientes, evitando sobrecarga de dados no envio direto.
- **WhatsApp Web API**: Integração dinâmica para pré-preenchimento de mensagens estruturadas com os dados coletados no formulário.

## 🚀 Como rodar o projeto localmente

1. **Instalar as dependências:**
   ```sh
   npm install

2. **Iniciar o servidor de desenvolvimento:**

Bash
npm run dev

3. **Acessar o projeto:**

Abra o navegador em: http://localhost:5173

📦 Build para Produção
Para gerar a versão final otimizada:

Bash
npm run build

© 2026 Thaísa Raquel - Todos os direitos reservados.

