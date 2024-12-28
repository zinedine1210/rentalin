import db from '@@/database/db';
import { NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';

const nameTable: string = 'orders'

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
    const stmt = db.prepare(`
      SELECT 
        o.*,
        file.id AS file_id,
        file.file_name,
        file.file_path,
        file.file_type, 
        file.created_by AS file_created_by,
        file.uploaded_at AS file_uploaded_at,
        u.name_unit AS unit_name,
        ar.location AS armada_location,
        ar.embed_link AS armada_embed_link,
        usage.name AS usage_name,
        usage.price_multiplier AS usage_price_multiplier,
        usage.operator_type AS usage_operator_type
      FROM ${nameTable} o
        INNER JOIN units AS u ON o.unit_id = u.id
        INNER JOIN users AS renter ON o.renter_id = renter.id
        INNER JOIN armadas AS ar ON o.armada_id = ar.id
        INNER JOIN uploads AS file ON u.file_picture = file.id
        INNER JOIN usage_prices AS usage ON o.usage_id = usage.id
      WHERE o.id = ?
    `);
    const data: any = stmt.get(Number(id));

    if (!data) {
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
        data: data
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
    const data: any = db.prepare(`SELECT * FROM ${nameTable} WHERE id = ?`).get(id);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Data not found", data: null },
        { status: 404 }
      );
    }

    const stmt = db.prepare(`DELETE FROM ${nameTable} WHERE id = ?`);
    const result = stmt.run(id);

    if (result.changes > 0) {
      return NextResponse.json({
        success: true,
        message: "Data deleted successfully",
        data: { id },
      }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, message: "Failed to delete data", data: null },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error deleting data:", error.message);
    return NextResponse.json({ success: false, message: error.message, data: null }, { status: 500 });
  }
}