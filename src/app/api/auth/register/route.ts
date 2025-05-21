import { validatedActionWithUser } from '@/lib/action-helper';
import { addNewUser } from '@/lib/helper/db/querys';
import { userSchema } from '@/lib/validation/user';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const handler = validatedActionWithUser(userSchema, async (data) => {
    try {
      // Forward the request to your external Node.js API
      await addNewUser(data);

      // Optional: revalidate UI paths
      revalidatePath('/crm/admin/users');

      return { success: true };
    } catch (error: any) {
      return {
        error: error?.response?.data?.message || 'Failed to register user',
      };
    }
  });

  const result = await handler(formData);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
