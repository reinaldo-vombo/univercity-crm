import { deleteCurse } from '@/lib/helper/db/querys';
import { NextResponse } from 'next/server';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await deleteCurse(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data?.message || 'Failed to delete curse' },
      { status: 400 }
    );
  }
}
