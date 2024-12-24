// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { createUsers } from '.';
import { UsersPayload } from '@@/database/user-scheme';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
  const filters: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (key !== 'page' && key !== 'limit') {
      filters[key] = value;
    }
  });

  const offset = (page - 1) * limit;

  let whereClause = '';
  let params: string[] = [];

  if (Object.keys(filters).length > 0) {
    const filterConditions = Object.entries(filters).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key} IN (${value.map(() => '?').join(', ')})`;
      } else {
        return `${key} LIKE ?`;
      }
    });

    whereClause = 'WHERE ' + filterConditions.join(' AND ');
    params = Object.values(filters).flatMap(value => 
      Array.isArray(value) ? value : [`%${value}%`]
    );
  }

  const totalTableQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePage = Math.ceil(count / limit);
  const stmt = db.prepare(`
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
    ${whereClause}
    LIMIT ? OFFSET ?
  `);
  const data = stmt.all(...params, limit, offset);

  return NextResponse.json({
    success: true,
    message: 'Success get data',
    data: {
      data,
      pagination: {
        count,
        totalPage: totalTablePage,
        currentPage: page,
        pageSize: limit,
      },
    }
  });
}

export async function POST(request: Request) {
  
  try {
    const body: UsersPayload = await request.json();

    // Menyimpan data menu ke database
    const newData = createUsers({
      username: body.username,
      email: body.email,
      password: body.password,
      phone: body.phone,
      file_identity: body.file_identity,
      file_driver_license: body.file_driver_license,
      file_profile_ig: body.file_profile_ig,
      address: body.address,
      danger_phone: body.danger_phone,
      full_name: body.full_name,
      role: body.role,
      status: body.status,
    });

    return NextResponse.json({
      success: true,
      message: "Data created successfully",
      data: newData
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error creating Data",
      data: error
    }, { status: 500 });
  }
}