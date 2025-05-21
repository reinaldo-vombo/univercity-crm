import { NextResponse } from 'next/server';
import { Parser } from 'json2csv';

export function generateCSVResponse(
  data: object[],
  fields: string[],
  fileName: string = 'export.csv'
): NextResponse {
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('[CSV_GENERATION_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to generate CSV.' },
      { status: 500 }
    );
  }
}
