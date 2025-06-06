import db from '@@/database/db';
import { NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';
import { UnitType } from '@@/lib/units/data/UnitModel';

const nameTable: string = 'units'

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
        SELECT ${nameTable}.*,
          uploads.id AS file_id,
          uploads.file_name,
          uploads.file_path,
          uploads.file_type, 
          uploads.created_by AS file_created_by,
          uploads.uploaded_at AS file_uploaded_at,
          partners.name AS partner_name,
          partners.phone AS partner_phone,
          partners.email AS partner_email,
          partners.address AS partner_address,
          armadas.name AS armada_name,
          armadas.location AS armada_location,
          armadas.location_summary AS armada_location_summary,
          armadas.embed_link AS armada_embed_link,
          cat.title AS category_title,
          cat.icon AS category_icon
        FROM ${nameTable}
          INNER JOIN uploads ON ${nameTable}.file_picture = uploads.id
          INNER JOIN partners ON ${nameTable}.partner_id = partners.id
          INNER JOIN categories AS cat ON ${nameTable}.category_id = cat.id
          INNER JOIN armadas ON ${nameTable}.armada_id = armadas.id
        WHERE
          ${nameTable}.id = ?
      `)
      .get(Number(id));

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

    const transformData = {
      id: data.id,
      category_id: data.category_id,
      file_picture_id: data.file_picture,
      partner_id: data.partner_id,
      armada_id: data.armada_id,
      name_unit: data.name_unit,
      description: data.description,
      price: data.price,
      condition: data.condition,
      isAvailable: data.isAvailable,
      created_at: data.created_at,
      updated_at: data.updated_at,
      file: {
        file_name: data.file_name,
        file_path: data.file_path,
        file_type: data.file_type
      },
      partner: {
        partner_name: data.partner_name,
        partner_phone: data.partner_phone,
        partner_email: data.partner_email,
        partner_address: data.partner_address
      },
      armada: {
        armada_name: data.armada_name,
        armada_embed_link: data.armada_embed_link,
        armada_location: data.armada_location,
        armada_location_summary: data.armada_location_summary
      },
      category_title: data.category_title,
      category_icon: data.category_icon
    }

    // Kembalikan response jika ditemukan
    return NextResponse.json({
      success: true,
      message: '1 data found',
      data: transformData
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

  if (!token || !decodedUserVerify) {
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