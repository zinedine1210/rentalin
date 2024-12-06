import db from '@@/database/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { url: string } }
) {
  const { url } = params;
  const urlJoin = "/"+url.split(',').join('/')

  try {
    const menus = db
      .prepare('SELECT * FROM menus WHERE url = ?')
      .get(urlJoin);

    if (!menus) {
      return NextResponse.json(
        {
            success: false,
            message: 'Menus not found',
            data: null
        },
        { status: 404 }
      );
    }

    // Kembalikan response jika ditemukan
    return NextResponse.json({
        success: true,
        message: '1 data found',
        data: menus
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error.',
        data: null
      },
      { status: 500 }
    );
  }
}
