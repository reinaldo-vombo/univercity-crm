// lib/groq.ts
import 'server-only';

type TGroqMessage = {
  content: string;
  sender: 'me' | 'contact';
};

const GROQ_MODEL = 'llama-3.3-70b-versatile'; // ver outros em console.groq.com/docs/models

const CHANNEL_TONE: Record<string, string> = {
  whatsapp: 'casual e direto, como uma conversa de WhatsApp',
  sms: 'curto e objetivo, cabe em um SMS',
  email: 'formal e bem estruturado, como um email profissional',
};

export async function generateReplySuggestion({
  history,
  instruction,
  channel,
  contactName,
}: {
  history: TGroqMessage[];
  instruction?: string;
  channel: 'whatsapp' | 'sms' | 'email';
  contactName: string;
}) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY não configurada');

  const conversationContext = history
    .slice(-10)
    .map((m) => `${m.sender === 'me' ? 'Eu' : contactName}: ${m.content}`)
    .join('\n');

  const systemPrompt = `Você ajuda a escrever mensagens de ${channel} num tom ${CHANNEL_TONE[channel]}.
Responda apenas com o texto da mensagem, sem aspas, sem explicações, sem assinatura.`;

  const userPrompt = instruction
    ? `Contexto da conversa:\n${conversationContext}\n\nInstrução: ${instruction}\n\nEscreva a mensagem seguindo a instrução.`
    : `Contexto da conversa:\n${conversationContext}\n\nSugira a próxima mensagem que eu (Eu) deveria enviar para ${contactName}.`;

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erro Groq (${response.status}): ${err}`);
  }

  const data = await response.json();
  const suggestion = data.choices?.[0]?.message?.content?.trim();

  if (!suggestion) throw new Error('Groq não retornou sugestão');

  return suggestion as string;
}
