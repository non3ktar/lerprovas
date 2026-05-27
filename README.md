# Avaliador de Provas LPT (IA + PWA)

## Objetivo do Projeto
Aplicativo Progressive Web App (PWA) voltado para professores que desejam automatizar e agilizar a leitura e avaliação de provas e redações manuscritas. Utiliza Inteligência Artificial (Google Gemini Vision) para transcrição da caligrafia e avaliação pedagógica detalhada baseada em critérios pré-definidos (inferência nas "entrelinhas").

## Tech Stack
- **Frontend:** Vite, React, TailwindCSS v4, Framer Motion
- **Ícones:** Lucide React
- **Armazenamento:** Dexie.js (IndexedDB - offline no dispositivo)
- **Inteligência Artificial:** Google Gemini 1.5 Flash API (Multimodal)
- **PWA:** vite-plugin-pwa

## Como Instalar e Rodar
1. Certifique-se de ter o Node.js instalado.
2. Clone ou extraia este diretório.
3. No terminal, acesse a pasta do projeto e rode:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
4. Acesse \`http://localhost:5173\` pelo navegador.
5. Para usar o app no celular, você pode fazer o deploy ou rodar através da sua rede local informando o IP do servidor na porta 5173. O app pedirá para ser instalado na tela inicial (PWA).

## Deployment URL
Pode ser publicado em **Cloudflare Pages**, **Vercel** ou **Netlify**. Como usa LocalStorage/IndexedDB e requisições no client-side para o Gemini, não necessita de um backend.

## Changelog
- **v1.0.0**: 
  - Estrutura inicial do PWA (Vite + React).
  - Estilização Premium Vibe Coding (Glassmorphism e Dark Mode).
  - Integração do IndexedDB via Dexie para armazenar provas localmente.
  - Integração com Gemini 1.5 Flash para ler imagens (câmera) e analisar o texto de apoio da prova de Literatura.
