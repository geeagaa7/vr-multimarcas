# VR Multimarcas — Vercel

Site comercial React, TypeScript e Tailwind para a VR Multimarcas em Conceição dos Ouros/MG.

## Hospedagem e administração

A vitrine e as funções de acesso aos dados são hospedadas no projeto Vercel `vr-multimarcas`. O banco D1, as imagens R2 e a autenticação administrativa continuam no backend Sites existente. O acesso `/admin` abre esse painel protegido; nenhuma operação administrativa é liberada pelo proxy público. O proprietário continua cadastrando motos, fotos, configurações e avaliações no mesmo painel, sem republicar conteúdo.

As funções Vercel usam `SITE_BACKEND_ORIGIN` e `SITE_BACKEND_TOKEN`, configurados somente no servidor. O token nunca é enviado ao navegador, não deve receber prefixo `VITE_` e não deve entrar no Git. A comunicação permite apenas leitura do catálogo, imagens e registro de cliques de interesse. As URLs de mídia são validadas; cabeçalhos de identidade enviados pelo visitante não são encaminhados. Os metadados de cada página são gerados com o conteúdo atual do banco e a URL da Vercel.

O backend deve permanecer ativo. Uma migração completa para outro banco/autenticação requer provisionar esses serviços e transferir os dados; não é necessária para administrar esta versão.

## Desenvolvimento e publicação

Node.js 24. Execute `npm ci` e `npm run build`. Configure as variáveis de `.env.example` no projeto Vercel. O build gera os arquivos estáticos em `dist/client` e o HTML base em `server/app-shell.html`, incluído na função `api/gateway.ts`. `vercel.json` define as rotas e os cabeçalhos. O repositório GitHub pode ser conectado ao projeto para publicar alterações de código automaticamente.

`npm test` verifica o gateway Vercel: comunicação segura com o backend, bloqueio de administração e origens externas, metadados, sitemap, redirecionamento do painel e mídia. O código original do backend está em `worker`, com migrações em `drizzle`; `npm run build:sites` e `npm run test:sites` preservam sua cadeia original de build/testes.

As fotografias provisórias são imagens reais do Unsplash; não são fotos da VR. Contatos e estoque real ainda devem ser cadastrados pelo administrador. Os exemplos permanecem identificados como demonstração e não há avaliações inventadas.
