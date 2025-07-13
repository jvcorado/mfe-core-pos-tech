# Guia Rápido de Configuração - Micro Frontend

## 🎯 Passo a Passo

### 1. Criar arquivo `.env.local`

Na raiz do projeto, crie o arquivo `.env.local`:

```env
# URLs dos Micro Frontends
NEXT_PUBLIC_MF_URL_POS=http://localhost:3001
NEXT_PUBLIC_MF_URL_ADMIN=http://localhost:3002
```

### 2. Executar o projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

### 3. Testar a integração

1. **Acesse**: `http://localhost:3000`
2. **Clique em**: "Acessar Dashboard"
3. **Verifique**: Se os micro frontends estão sendo carregados

### 4. Navegar para o POS

- **URL direta**: `http://localhost:3000/pos`
- **Ou pelo Dashboard**: Clique em "Acessar POS"

## 🔧 Configuração da Aplicação POS (porta 3001)

Para que sua aplicação na porta 3001 funcione corretamente:

### 1. Configurar CORS (se necessário)

```javascript
// No seu servidor da porta 3001
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

### 2. Configurar para iframe (se aplicável)

```javascript
// Permitir que a aplicação seja carregada em iframe
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
```

## 🚀 Pronto!

Agora sua aplicação da porta 3001 está integrada e acessível via:
- `http://localhost:3000/pos` (URL direta)
- `http://localhost:3000/dashboard` (Dashboard)

## 📝 Próximos Passos

1. Adicionar mais micro frontends
2. Implementar comunicação entre aplicações
3. Configurar autenticação compartilhada
4. Otimizar para produção 