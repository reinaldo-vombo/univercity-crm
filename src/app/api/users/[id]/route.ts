// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { deleteUser } from '@/lib/helper/db/querys';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params.id);
    await deleteUser(params.id);
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data?.message || 'Failed to delete user' },
      { status: 400 }
    );
  }
}
