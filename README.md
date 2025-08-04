# Micro Frontend Core - Next.js

Este é um projeto de micro frontend usando Next.js como shell para integrar múltiplas aplicações.

## 🚀 Funcionalidades

- 🔄 Integração de múltiplos micro frontends
- 📱 Interface responsiva com Tailwind CSS
- 🛡️ Tratamento de erros robusto
- 🔧 Configuração flexível por variáveis de ambiente
- 📊 Dashboard para visualização de todos os micro frontends

## 📦 Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Module Federation (opcional)

## 🔧 Configuração

### 1. Instalação

```bash
npm install
```

### 2. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URLs dos Micro Frontends
NEXT_PUBLIC_MF_URL_DASHBOARD = "http://localhost:3001"
NEXT_PUBLIC_MF_URL_LP = "http://localhost:3003"
NEXT_PUBLIC_MF_URL_LOGIN = "http://localhost:3002/login"
NEXT_PUBLIC_MF_URL_REGISTER = "http://localhost:3002/register"
```

### 3. Executar o Projeto

```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── dashboard/          # Dashboard principal
│   ├── pos/               # Página do micro frontend POS
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   └── MicroFrontend.tsx  # Componente para carregar micro frontends
```

## 🔗 Rotas Disponíveis

- `/` - Página inicial
- `/dashboard` - Dashboard com todos os micro frontends
- `/pos` - Acesso direto ao sistema POS (localhost:3001)
- `/admin` - Acesso direto ao sistema Admin (localhost:3002)

## 📝 Como Funciona

### Proxy Reverso

O Next.js está configurado para fazer proxy das requisições:

```javascript
// next.config.mjs
async rewrites() {
  return [
    {
      source: '/pos/:path*',
      destination: `${process.env.NEXT_PUBLIC_MF_URL_POS || 'http://localhost:3001'}/:path*`,
    },
    {
      source: '/admin/:path*',
      destination: `${process.env.NEXT_PUBLIC_MF_URL_ADMIN || 'http://localhost:3002'}/:path*`,
    },
  ];
}
```

### Componente MicroFrontend

O componente suporta dois modos de carregamento:

1. **Iframe** (padrão): Carrega a aplicação em um iframe
2. **Module Federation**: Carrega usando webpack Module Federation

```tsx
<MicroFrontend
  name="pos"
  host="http://localhost:3001"
  path="/pos"
  useIframe={true}
/>
```

## 🛠️ Desenvolvimento

### Adicionando Novos Micro Frontends

1. Adicione a URL no arquivo `.env.local`
2. Configure o rewrite no `next.config.mjs`
3. Crie uma nova página em `src/app/[nome]/page.tsx`
4. Adicione o componente no dashboard

### Exemplo de Novo Micro Frontend

```tsx
// src/app/inventory/page.tsx
import MicroFrontend from "@/components/MicroFrontend";

export default function InventoryPage() {
  return (
    <div>
      <h1>Sistema de Inventário</h1>
      <MicroFrontend
        name="inventory"
        host={process.env.NEXT_PUBLIC_MF_URL_INVENTORY || "http://localhost:3003"}
        path="/inventory"
      />
    </div>
  );
}
```

## 🔍 Troubleshooting

### Problemas Comuns

1. **Micro frontend não carrega**: Verifique se a aplicação está rodando na porta correta
2. **Erro de CORS**: Configure o CORS na aplicação de origem
3. **Proxy não funciona**: Verifique as configurações no `next.config.mjs`

### Logs de Debug

O componente MicroFrontend registra logs no console para debug:

```javascript
console.log(`Micro frontend ${name} carregado com sucesso`);
```

## 🚀 Deploy

Para fazer deploy, certifique-se de:

1. Configurar as variáveis de ambiente no serviço de hosting
2. Atualizar as URLs dos micro frontends para produção
3. Verificar configurações de CORS das aplicações

## 📄 Licença

Este projeto está sob a licença MIT.
