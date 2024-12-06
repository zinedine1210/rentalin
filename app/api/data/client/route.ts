// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { verifyToken } from '@@/middleware';
import { JwtPayload } from 'jsonwebtoken';
import { ClientModel, ClientType } from '@@/lib/client/data/ClientModel';

export interface OurClientPayload {
  title: string
  file_id: string
}

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

  const totalTableQuery = `SELECT COUNT(*) as count FROM client ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePages = Math.ceil(count / limit);
  const stmt = db.prepare(`
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
    ${whereClause}
    LIMIT ? OFFSET ?
  `);
  const data: any = stmt.all(...params, limit, offset);

  const transformedData: ClientType = data.map(item => ({
    id: item.client_id,
    title: item.title,
    created_at: item.created_at,
    file_id: item.file_id,
    file: item.file_id
      ? {
          id: item.file_id,
          file_name: item.file_name,
          file_path: item.file_path,
          file_type: item.file_type,
          created_by: item.created_by,
          uploaded_at: item.uploaded_at,
        }
      : null, // Handle case when file_id is null
  }));

  return NextResponse.json({
    success: true,
    message: 'Success get data',
    data: {
      data: transformedData,
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

  try {
    const body: any = await request.json();

    const stmt = db.prepare(`
      INSERT INTO client (title, file_id)
      VALUES (?, ?)
    `);
    const result = stmt.run(
      body.title,
      body.file_id
    );

    // Ambil menu yang baru dibuat
    const datanew = db.prepare(`SELECT * FROM client WHERE id = ?`).get(result.lastInsertRowid);

    return NextResponse.json({
      success: true,
      message: "Menu created successfully",
      data: datanew
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error creating menu",
      data: null
    }, { status: 500 });
  }
}