// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { verifyToken } from '@@/middleware';
import { JwtPayload } from 'jsonwebtoken';
import { UploadPayload } from '@@/database/uploads-scheme';

const nameTable: string = 'uploads'

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

  const totalTableQuery = `SELECT COUNT(*) as count FROM ${nameTable} ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePages = Math.ceil(count / limit);
  const stmt = db.prepare(`
    SELECT *
    FROM ${nameTable}
    ${whereClause}
    LIMIT ? OFFSET ?
  `);
  const data: any = stmt.all(...params, limit, offset);

  return NextResponse.json({
    success: true,
    message: 'Success get data',
    data: {
      data: data,
      pagination: {
        count,
        totalPage: totalTablePages,
        currentPage: page,
        pageSize: limit,
      },
    }
  });
}

export async function POST(request: Request) {
  try {
    const body: UploadPayload = await request.json();
    const { file_name, file_path, file_type, public_id } = body

    const stmt = db.prepare(`
      INSERT INTO ${nameTable} (file_name, file_path, file_type, public_id)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      file_name,
      file_path,
      file_type,
      public_id
    );
    
    const datanew = db.prepare(`SELECT * FROM ${nameTable} WHERE id = ?`).get(result.lastInsertRowid);

    return NextResponse.json({
      success: true,
      message: "Data created successfully",
      data: datanew
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error creating data",
      data: null
    }, { status: 500 });
  }
}