import { validatedActionWithUser } from '@/lib/action-helper';
import { addCurse } from '@/lib/helper/db/querys';
import { curseSchema } from '@/lib/validation/curse';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const handler = validatedActionWithUser(curseSchema, async (data) => {
    try {
      // Forward the request to your external Node.js API
      await addCurse(data);

      return { success: true };
    } catch (error: any) {
      return {
        error: error?.response?.data?.message || 'Failed to register curse',
      };
    }
  });

  const result = await handler(formData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
