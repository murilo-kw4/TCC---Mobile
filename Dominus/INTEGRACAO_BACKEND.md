# Integração Mobile React Native ↔ Backend Node

## O que já está conectado

- Login real em `POST /auth/login`.
- Cadastro de fiel em `POST /auth/register`.
- Persistência de sessão com `AsyncStorage`.
- Envio automático de `Authorization: Bearer <accessToken>`.
- Renovação automática do access token em `POST /auth/refresh`.
- Perfil real em `GET /users/me`.
- Logout com revogação do refresh token em `POST /auth/logout`.
- Bloqueio de conta `admin` no mobile; o perfil admin fica reservado para o web.

## Como iniciar o backend

Na pasta do backend:

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

Teste no navegador/comando HTTP:

```text
http://localhost:3000/health
```

Deve responder:

```json
{"ok":true}
```

## Como iniciar o mobile

Na pasta do mobile:

```bash
npm install
npm start
```

### Celular físico com Expo Go

O backend e o celular precisam estar na mesma rede. O app tenta descobrir automaticamente o IP do computador usado pelo Metro/Expo.

Se isso não funcionar, crie `.env` a partir de `.env.example` e informe manualmente:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
```

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.15:3000
```

Depois reinicie o Expo.

### Emulador Android

Sem `.env`, o fallback é:

```text
http://10.0.2.2:3000
```

### Simulador iOS

Sem `.env`, o fallback é:

```text
http://localhost:3000
```

## Usuário de teste criado pelo seed

```text
E-mail: fiel@demo.com
Senha: fiel123@
```

O usuário `admin@admin.com` não entra no mobile de propósito.
