import db from '@@/database/db';
import { NextResponse } from 'next/server';

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
    const data = db
      .prepare(`
        SELECT 
          users.*,
          identity.id AS file_identity_id,
          identity.file_name AS file_identity_name,
          identity.file_path AS file_identity_path,
          identity.file_type AS file_identity_type,

          profile_ig.id AS file_profile_ig_id,
          profile_ig.file_name AS file_profile_ig_name,
          profile_ig.file_path AS file_profile_ig_path,
          profile_ig.file_type AS file_profile_ig_type,

          driver_license.id AS file_driver_license_id,
          driver_license.file_name AS file_driver_license_name,
          driver_license.file_path AS file_driver_license_path,
          driver_license.file_type AS file_driver_license_type
        FROM users
        INNER JOIN uploads AS identity ON users.file_identity = identity.id
        INNER JOIN uploads AS profile_ig ON users.file_profile_ig = profile_ig.id
        INNER JOIN uploads AS driver_license ON users.file_driver_license = driver_license.id
        WHERE users.id = ?
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

    // Kembalikan response jika ditemukan
    return NextResponse.json({
        success: true,
        message: '1 data found',
        data: data
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
    const data: any = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Data not found", data: null },
        { status: 404 }
      );
    }

    // Hapus menu
    const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
    const result = stmt.run(id);


    // Jika berhasil dihapus, responkan
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