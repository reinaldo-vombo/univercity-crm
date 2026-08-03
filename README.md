<div align="center">

<img src="/logo.svg" alt="SIUG" width="80" />

# SIGU

### Sistema de Gestão Académica · Painel Administrativo

Construído com **Next.js 16**, **shadcn/ui**, **NextAuth**, **Resend**, **React Email**, **Typescript** e **Tailwind CSS** — tudo o que uma instituição de ensino precisa numa única plataforma.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-black?style=flat-square)](https://ui.shadcn.com)

</div>

---

## 👀 Demo

<img src="/screenshot/screenshot-1773503516499.png" alt="Dashboard SIGU" width="100%" style="border-radius: 8px;" />

<br />

<img src="/screenshot/screenshot-1773501304955.png" alt="Painel de Alunos" width="100%" style="border-radius: 8px;" />

---

## 🚀 O que é o SIGU?

O **SIGU** é uma plataforma de gestão académica completa pensada para instituições de ensino superior. Gere alunos, docentes, cursos, propinas, pautas e muito mais — tudo num painel limpo e moderno.

Tem três painéis distintos:

| Painel              | Descrição                                        |
| ------------------- | ------------------------------------------------ |
| 🛠️ **SIGU Admin**   | Secretaria, gestão institucional e configurações |
| 🎓 **SIGU Campus**  | Portal do estudante                              |
| 👨‍🏫 **SIGU Faculty** | Portal do docente                                |

---

## ✨ Funcionalidades principais

- 🔐 Autenticação com **NextAuth** (Credentials + Google)
- 👥 Controlo de acesso por **roles** (admin, docente, aluno)
- 📊 Dashboard com métricas de alunos, receita e actividade
- 🧾 Gestão de **propinas** com recibos em PDF
- 📋 **Pautas académicas** com AC, testes, exame, recurso e especial
- 🔔 Sistema de **notificações** in-app
- 🌙 **Dark mode** + temas de cor personalizáveis
- 📁 Upload de ficheiros via **Cloudinary**
- 📤 Exportação de dados em **PDF / CSV**
- 🌐 Estado online/offline em tempo real
- 🏫 Configurações institucionais com regras académicas e financeiras
- 📝 Logs de auditoria e actividade recente

---

## 🗂 Estrutura do projecto

```
/app                  → páginas e rotas (Next.js App Router)
/components           → componentes reutilizáveis
/config               → configurações da app
/constants            → constantes globais
/env                  → variáveis de ambiente com validação Zod
/lib                  → utilitários, helpers e instâncias
/providers            → providers React (theme, session, etc.)
/services             → camada de serviços e chamadas à API
/types                → tipos e interfaces TypeScript
```

---

## ⚙️ Instalação

```bash
# 1. Clona o repositório
git clone https://github.com/teu-user/SIGU.git
cd SIGU

# 2. Instala as dependências
npm install

# 3. Copia o ficheiro de ambiente
cp .env.example .env.local


# 4. Arranca o servidor
npm run dev
```

---

## 🔑 Variáveis de ambiente

```bash
# Servidor
NODE_ENV=development
API_BASE_URL=http://localhost:3001
NEXTAUTH_SECRET=supersecret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Cliente
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="SIGU · Sistema de Gestão Académica"
NEXT_PUBLIC_ASSETS_URL=http://localhost:3000/assets
```

---

## ✅ Checklist do projecto

### ⚙️ Setup inicial

- [x] Projecto Next.js com TypeScript
- [x] Tailwind CSS
- [x] shadcn/ui
- [x] `.env` com validação Zod (server + client separados)
- [x] Setup Resend

### 🔐 Autenticação

- [x] NextAuth instalado e configurado
- [x] Providers (Credentials + Google)
- [x] Página de login personalizada
- [x] Login admin e utilizador
- [x] Página de recuperação de password
- [x] Protecção de rotas via middleware

### 🌐 Fetch & API

- [x] Fetch global com base URL
- [x] Interceptor de token
- [x] Tratamento global de erros

### 🧩 Páginas admin

- [x] Dashboard
- [x] Alunos (listagem + detalhe)
- [x] Docentes
- [x] Departamentos
- [x] Semestres
- [x] Cursos e disciplinas
- [x] Edifícios
- [x] Pagamentos
- [x] Utilizadores
- [x] Preçários
- [x] Páginas de erro, 404 e não autenticado

### ⚙️ Funcionalidades

- [x] Server actions
- [x] Revalidação de dados
- [x] Logs de auditoria
- [x] Notificações in-app
- [x] Configurações por utilizador (notificações, tema)
- [x] Dark mode + temas de cor
- [x] Estado online/offline
- [x] Envio de mensagens na app
- [x] Geração de recibos de pagamento
- [x] Atribuição de utilizadores a departamentos
- [x] DataTable reutilizável com filtros
- [x] Exportação de dados (PDF/CSV)
- [x] Actualização de conta
- [ ] Rate limit em server actions

### 🧾 Pautas e notas

- [ ] Modelo de notas com relação aluno/curso
- [ ] Formulário para lançar/actualizar notas
- [ ] Registo e relatório de presenças

### 💳 Pagamentos

- [x] Analytics de pagamentos
- [x] Lançamento de pagamentos com estado
- [x] Filtros e pesquisa
- [x] Exportação de relatórios

### ✉️ Email & Notificações

- [x] Receber, ler e eliminar notificações
- [ ] Setup Resend / Nodemailer
- [ ] Envio de email por actualização de nota ou propina em atraso
- [ ] Templates de email reutilizáveis

### 📁 Uploads

- [x] Upload de ficheiros (Dropzone)
- [x] Cloudinary configurado
- [x] Armazenamento seguro de ficheiros
- [ ] Associar documentos ao perfil do aluno

### 🧪 Testes

- [x] Validação de formulários com Zod
- [ ] Testes unitários para rotas e utilitários
- [ ] Testes de UI com Playwright ou Cypress

### 🚀 Deployment

- [ ] Preparação para produção
- [ ] Deploy (Vercel / Railway / Render)
- [ ] Seed da base de dados de produção

---

## 🛠 Stack tecnológica

| Tecnologia                               | Uso                              |
| ---------------------------------------- | -------------------------------- |
| [Next.js 14](https://nextjs.org)         | Framework principal (App Router) |
| [TypeScript](https://typescriptlang.org) | Tipagem estática                 |
| [Tailwind CSS](https://tailwindcss.com)  | Estilização                      |
| [shadcn/ui](https://ui.shadcn.com)       | Componentes de UI                |
| [NextAuth](https://next-auth.js.org)     | Autenticação                     |
| [Prisma](https://prisma.io)              | ORM e base de dados              |
| [Zod](https://zod.dev)                   | Validação de schemas             |
| [Cloudinary](https://cloudinary.com)     | Upload de ficheiros              |
| [React Email](https://react.email)       | Templates de email               |
| [Resend](https://resend.com)             | Envio de emails                  |

---

## 📄 Licença

MIT © SIGU — feito com ☕ e muito `console.log`
