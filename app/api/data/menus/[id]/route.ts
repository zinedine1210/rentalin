import db from '@@/database/db';
import { NextResponse } from 'next/server';
import { updateMenu } from '..';
import { MenusList } from '@@/lib/menus/data/MenusModel';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Validasi ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid ID provided.',
          data: null
        },
        { status: 400 }
      );
    }

    // Query database
    const post = db
      .prepare('SELECT * FROM menus WHERE id = ?')
      .get(Number(id));

    if (!post) {
      return NextResponse.json(
        {
            success: false,
            message: 'Post not found',
            data: null
        },
        { status: 404 }
      );
    }

    // Kembalikan response jika ditemukan
    return NextResponse.json({
        success: true,
        message: '1 data found',
        data: post
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tokenHeaders = request.headers.get('Authorization')
  const token = tokenHeaders ? tokenHeaders?.split(" ")[1] : null
  const decodedUserVerify: JwtPayload | null = token ? await verifyToken(token) : null;

  if(!token || !decodedUserVerify){
    return NextResponse.json({
      success: false,
      message: "Unauthorize Access",
      data: null
    }, { status: 401 })
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID", data: null }, { status: 400 });
  }

  try {
    // Parse body JSON
    const body = await request.json();

    const { title, url, icon, flag, parent_id, pages_id, order_position } = body;

    // Validasi input (opsional, sesuai kebutuhan)
    if (order_position !== undefined && (order_position < 1 || isNaN(order_position))) {
      return NextResponse.json({ success: false, message: "Invalid order_position", data: null }, { status: 400 });
    }

    // Update menu menggunakan fungsi `updateMenu`
    const updatedMenu = updateMenu(id, {
      title,
      url,
      icon,
      flag,
      parent_id,
      pages_id,
      order_position,
    });

    // Kembalikan hasil
    return NextResponse.json({ success: true, data: updatedMenu, message: "Updated menus successfully" });
  } catch (error: any) {
    console.error("Error updating menu:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tokenHeaders = request.headers.get('Authorization')
  const token = tokenHeaders ? tokenHeaders?.split(" ")[1] : null
  const decodedUserVerify: JwtPayload | null = token ? await verifyToken(token) : null;

  if(!token || !decodedUserVerify){
    return NextResponse.json({
      success: false,
      message: "Unauthorize Access",
      data: null
    }, { status: 401 })
  }

  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID", data: null }, { status: 400 });
  }

  try {
    // Cek apakah menu ada
    const menu: MenusList | any = db.prepare(`SELECT * FROM menus WHERE id = ?`).get(id);
    if (!menu) {
      return NextResponse.json(
        { success: false, message: "Menu not found", data: null },
        { status: 404 }
      );
    }

    db.prepare(`
      UPDATE menus
      SET order_position = order_position - 1
      WHERE order_position > ?;
    `).run(menu.order_position);

    // Hapus menu
    const stmt = db.prepare(`DELETE FROM menus WHERE id = ?`);
    const result = stmt.run(id);


    // Jika berhasil dihapus, responkan
    if (result.changes > 0) {
      return NextResponse.json({
        success: true,
        message: "Menu deleted successfully",
        data: { id },
      }, { status: 200 });
    }

    // Jika tidak ada perubahan, kembalikan error
    return NextResponse.json(
      { success: false, message: "Failed to delete menu", data: null },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error deleting menu:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}