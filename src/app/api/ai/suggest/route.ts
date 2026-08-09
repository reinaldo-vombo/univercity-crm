// app/api/ai/suggest/route.ts
import { NextResponse } from 'next/server';
import { generateReplySuggestion } from '@/lib/ai/groq';
import { RouteHandlerError } from '@/lib/errors/router-handler-error';

export async function POST(req: Request) {
  try {
    const { history, instruction, channel, contactName } = await req.json();

    if (!Array.isArray(history) || !channel || !contactName) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }

    const suggestion = await generateReplySuggestion({
      history,
      instruction,
      channel,
      contactName,
    });

    return NextResponse.json({ suggestion });
  } catch (error) {
    RouteHandlerError(error, 'ai/suggest');
  }
}
