
// O texto de apoio fornecido pelo professor
const SUPPORT_TEXT = `
O Pescador do Rio das Almas

Na margem esquerda do Rio das Almas, entre canoas velhas e redes estendidas ao sol, vivia Mateus, um jovem pescador de vinte anos. Sua vida era simples e repetida: acordar antes do sol nascer, lançar as redes, voltar com o barco quase vazio. A aldeia estava sofrendo. A seca tinha espantado os peixes para o fundo do rio, e os mais velhos diziam em voz baixa que a água estava amaldiçoada.
Numa noite de lua cheia, Mateus foi até a beira do rio e encontrou o que parecia ser uma criança chorando. Quando se aproximou, viu que não era criança nenhuma: era um boto encalhado na areia, com olhos dourados que brilhavam feito estrelas debaixo d'água. O animal virou o rosto para ele e, de uma forma que Mateus nunca conseguiu explicar direito, falou — como se a voz viesse de dentro do próprio rio:
— A Pedra do Coração está presa no fundo do Poço sem Eco. Você precisa libertá-la. Só assim o Rio das Almas vai voltar a viver.
Mateus deu um passo para trás. Ele conhecia as histórias sobre o Poço sem Eco: quem tentava chegar lá nunca voltava igual. Passou três dias sem dormir, olhando para a água, repetindo para si mesmo que era só um pescador e não tinha nada de especial.
Na quarta manhã, a avó Donana — a pessoa mais velha da aldeia — chamou Mateus para dentro de sua cabana. Sem dizer muita coisa, ela pegou uma flauta feita de bambu das próprias margens do rio e colocou nas mãos dele.
— Quando o silêncio te engolir — ela disse, olhando bem nos olhos do menino —, você toca. O rio vai se lembrar de quem você é.
Na manhã seguinte, Mateus partiu. A entrada para o mundo desconhecido era a Cachoeira das Pedras Negras, onde a água corria ao contrário e sussurrava nomes que ninguém mais lembrava. Ele respirou fundo e mergulhou de olhos abertos. Quando saiu do outro lado, estava encharcado de silêncio.
O caminho foi cheio de surpresas. Primeiro veio a Anta Cega, uma criatura enorme que guardava a entrada do afluente e só deixava passar quem respondesse uma pergunta difícil. Ela perguntou a Mateus qual era o seu maior medo.
— Falar sobre o meu medo — ele respondeu — já é uma forma de encará-lo.
A anta recuou. Mais à frente, uma Garça Azul pousou no ombro de Mateus e passou a voar à sua frente toda vez que ele ficava em dúvida sobre qual caminho seguir.
O Poço sem Eco ficava no meio de uma floresta inundada, onde as árvores cresciam de cabeça para baixo e os pássaros cantavam só de noite. Quando Mateus chegou perto, sentiu um peso diferente no ar — os sons foram sumindo aos poucos, e por um momento ele teve dificuldade de lembrar até o próprio nome.
Dentro do Poço, havia um espelho feito de água parada — o Espelho das Águas Paradas. Mas ele não mostrava o rosto de quem olhava: mostrava as coisas que a pessoa mais se arrependia na vida. Mateus viu o rosto do pai, que havia morrido numa enchente anos atrás. A dor foi tão grande que ele não conseguia se mover.
Foi quando ele lembrou da flauta.
Com as mãos tremendo, ele começou a tocar. A melodia cortou o silêncio do Poço como um raio de luz. O Espelho estremeceu, rachou e se quebrou em mil pedaços.
No fundo do Poço brilhava a Pedra do Coração: um cristal cor-de-rosa que pulsava feito um coração de verdade. Quando Mateus a tocou, sentiu o rio inteiro passar por dentro de si — as histórias, as tristezas, as alegrias de cada pessoa que já tinha vivido às suas margens.
A volta foi diferente. O rio parecia reconhecer Mateus. A Anta Cega abriu passagem sem dizer nada; a Garça Azul fez círculos no ar como se estivesse comemorando. Mas ainda havia um perigo: o Feiticeiro da Névoa apareceu no cruzamento dos rios, trocando os caminhos para confundi-lo. Mateus fechou os olhos, tocou a flauta e deixou a memória da música guiar seus pés.
Na entrada da Cachoeira das Pedras Negras, o Feiticeiro fez uma última tentativa: assumiu o rosto do pai de Mateus e pediu que ele soltasse a Pedra.
— Meu pai me ensinou a não largar o leme na tormenta — disse Mateus em voz alta, mais para si mesmo do que para o Feiticeiro.
E atravessou. Quando saiu das águas do outro lado, seus olhos eram diferentes: tinham o peso de quem viu o fundo e escolheu subir.
Quando Mateus colocou a Pedra do Coração dentro das águas do Rio das Almas, o rio inteiro tremeu. Os peixes voltaram em cardumes que cobriam a superfície. Na madrugada seguinte, a chuva chegou, e a aldeia acordou com o cheiro de terra molhada — um cheiro que muita gente já tinha esquecido.
Mateus não virou rei, não ganhou nome de herói nos livros. Virou o guardião silencioso do rio. E toda vez que as crianças perguntavam por que o Rio das Almas cantava, os mais velhos respondiam:
— Porque alguém teve coragem de descer até o fundo e trazer de volta o coração do rio.
`;

const SYSTEM_PROMPT = `
Você é um professor avaliador e especialista em letramento e leitura literária.
Seu objetivo é avaliar uma resposta ESCRITA À MÃO por um aluno. A resposta do aluno é baseada no texto base fornecido abaixo.
A tarefa do aluno foi: Formular até 3 questões (ou uma reflexão profunda) que busquem aprofundar o texto, refletindo sobre as questões psicológicas e de vivência que o texto sugere (as "entrelinhas"), comprovando uma leitura com destaque para a inferência.

**Texto Base:**
${SUPPORT_TEXT}

**Critérios de Avaliação (Nota de 1,0 a 4,0):**
- **4,0**: Excelente. O aluno transcende o texto literal. Faz perguntas/reflexões que envolvem os aspectos psicológicos dos personagens (ex: o luto de Mateus, o significado do espelho das águas paradas, a coragem vs medo), comprovando alta capacidade de inferência nas "entrelinhas".
- **3,0 a 3,5**: Bom. Traz reflexões válidas e demonstra compreensão além do literal, mas ainda se apoia um pouco demais na narrativa em si, sem aprofundar tanto os dilemas psicológicos.
- **2,0 a 2,5**: Regular. Perguntas ou reflexões muito literais (ex: "O que o boto falou?", "Como era o rio?"). Demonstra leitura, mas falta inferência e leitura das entrelinhas.
- **1,0 a 1,5**: Insuficiente. Respostas desconexas, cópia do texto sem reflexão ou que não atingem a proposta mínima.

**Sua Tarefa ao receber a imagem:**
1. Leia a imagem e transcreva o texto manuscrito com a maior precisão possível.
2. Analise o que o aluno escreveu com base nos critérios acima.
3. Retorne EXCLUSIVAMENTE um objeto JSON válido, sem formatação markdown em volta, com a seguinte estrutura:
{
  "transcricao": "O texto que você conseguiu ler da imagem...",
  "nota": 3.5,
  "feedback": "Justificativa da nota, elogiando o que foi bem feito e apontando o que faltou em relação à inferência psicológica.",
  "pontos_fortes": "O que teve de bom",
  "pontos_melhoria": "O que pode melhorar"
}
`;

import { GoogleGenAI } from '@google/genai';

export async function evaluateExam(apiKey, imageFile) {
  try {
    const ai = new GoogleGenAI({ apiKey });

    // Converter o File para base64
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{
        role: 'user',
        parts: [
          { text: SYSTEM_PROMPT },
          { inlineData: { data: base64Image, mimeType: imageFile.type } }
        ]
      }]
    });

    const responseText = response.text;
    
    // Limpar o texto caso venha com markdown (```json ... ```)
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Erro ao avaliar prova com Gemini:", error);
    throw error;
  }
}
