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
    SELECT * FROM users
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
      birth_date: body.birth_date,
      danger_phone: body.danger_phone,
      full_name: body.full_name,
      gender: body.gender,
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