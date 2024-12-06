import db from '@@/database/db';
import { NextResponse } from 'next/server';
import { updatePage } from '../index';
import { PagesType} from '@@/lib/pages/data/PagesModel';

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
    const pages = db
      .prepare('SELECT * FROM pages WHERE id = ?')
      .get(Number(id));

    if (!pages) {
      return NextResponse.json(
        {
            success: false,
            message: 'Pages not found',
            data: null
        },
        { status: 404 }
      );
    }

    // Kembalikan response jika ditemukan
    return NextResponse.json({
        success: true,
        message: '1 data found',
        data: pages
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pages:', error);
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
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID", data: null }, { status: 400 });
  }

  try {
    // Parse body JSON
    const body = await request.json();

    const { title, slug, content, featured_image, meta_title, meta_description, meta_keywords, seo_heading, canonical_url, is_published, page_order, created_by } = body;

    // Validasi input (opsional, sesuai kebutuhan)
    if (page_order !== undefined && (page_order < 1 || isNaN(page_order))) {
      return NextResponse.json({ success: false, message: "Invalid page_order", data: null }, { status: 400 });
    }

    // Update menu menggunakan fungsi `updateMenu`
    const updatedPage = updatePage(id, {
      title,
      slug,
      content,
      featured_image,
      meta_title,
      meta_description,
      meta_keywords,
      seo_heading,
      canonical_url,
      is_published,
      page_order,
      created_by,
    });

    // Kembalikan hasil
    return NextResponse.json({ success: true, data: updatedPage, message: "Updated pages successfully" });
  } catch (error: any) {
    console.error("Error updating page:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID", data: null }, { status: 400 });
  }

  try {
    // Cek apakah menu ada
    const page: PagesType | any = db.prepare(`SELECT * FROM pages WHERE id = ?`).get(id);
    if (!page) {
      return NextResponse.json(
        { success: false, message: "Menu not found", data: null },
        { status: 404 }
      );
    }

    db.prepare(`
      UPDATE pages
      SET page_order = page_order - 1
      WHERE page_order > ?;
    `).run(page.page_order);

    // Hapus menu
    const stmt = db.prepare(`DELETE FROM pages WHERE id = ?`);
    const result = stmt.run(id);


    // Jika berhasil dihapus, responkan
    if (result.changes > 0) {
      return NextResponse.json({
        success: true,
        message: "Page deleted successfully",
        data: { id },
      }, { status: 200 });
    }

    // Jika tidak ada perubahan, kembalikan error
    return NextResponse.json(
      { success: false, message: "Failed to delete page", data: null },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error deleting page:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}