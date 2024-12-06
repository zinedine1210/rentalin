import db from '@@/database/db';
import { NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';
import { ClientModel, ClientType } from '@@/lib/client/data/ClientModel';

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
    const data: any = db
      .prepare(`
        SELECT 
          client.id AS client_id,
          client.title,
          client.created_at,
          client.file_id,
          uploads.id AS file_id,
          uploads.file_name,
          uploads.file_path,
          uploads.file_type,
          uploads.created_by,
          uploads.uploaded_at
        FROM 
          client
        LEFT JOIN 
          uploads 
        ON 
          client.file_id = uploads.id
        WHERE 
          client.id = ?
      `)
    .get(Number(id));

    const transformedData: ClientType = {
      id: data.client_id,
      title: data.title,
      created_at: data.created_at,
      file_id: data.file_id,
      file: data.file_id
        ? {
            id: data.file_id,
            file_name: data.file_name,
            file_path: data.file_path,
            file_type: data.file_type,
            created_by: data.created_by,
            uploaded_at: data.uploaded_at,
          }
        : null, // Handle case when file_id is null
    }

    if (!transformedData) {
      return NextResponse.json(
        {
            success: false,
            message: 'Data not found',
            data: null
        },
        { status: 404 }
      );
    }

    // Kembalikan response jika ditemukan
    return NextResponse.json({
        success: true,
        message: '1 data found',
        data: transformedData
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
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

    const { title, file_id } = body;

    const stmt = db.prepare(`
      UPDATE client
      SET
        title = COALESCE(?, title),
        file_id = COALESCE(?, file_id)
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title,
      file_id
    );

    // Ambil data yang telah diperbarui
    const updateData = db.prepare(`SELECT * FROM client WHERE id = ?`).get(id);

    // Kembalikan hasil
    return NextResponse.json({ success: true, data: updateData, message: "Updated data successfully" });
  } catch (error: any) {
    console.error("Error updating data:", error.message);
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
    // Cek apakah data ada
    const data: any = db.prepare(`SELECT * FROM client WHERE id = ?`).get(id);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Data not found", data: null },
        { status: 404 }
      );
    }

    // Hapus menu
    const stmt = db.prepare(`DELETE FROM client WHERE id = ?`);
    const result = stmt.run(id);


    // Jika berhasil dihapus, responkan
    if (result.changes > 0) {
      return NextResponse.json({
        success: true,
        message: "Data deleted successfully",
        data: { id },
      }, { status: 200 });
    }

    // Jika tidak ada perubahan, kembalikan error
    return NextResponse.json(
      { success: false, message: "Failed to delete data", data: null },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error deleting data:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}