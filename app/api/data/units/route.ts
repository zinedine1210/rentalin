// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { verifyToken } from '@@/middleware';
import { JwtPayload } from 'jsonwebtoken';
import { UnitPayload } from '@@/database/unit-scheme';

const nameTable: string = 'units'

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
    SELECT ${nameTable}.* ,
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
      cat.title AS category_title
    FROM ${nameTable}
      INNER JOIN partners ON ${nameTable}.partner_id = partners.id
      INNER JOIN categories AS cat ON ${nameTable}.category_id = cat.id
      INNER JOIN uploads ON ${nameTable}.file_picture = uploads.id
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
    const body: UnitPayload = await request.json();

    const stmt = db.prepare(`
      INSERT INTO ${nameTable} (category_id, file_picture, partner_id, name, description, price, condition, isAvailable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.category_id,
      body.file_picture,
      body.partner_id,
      body.name,
      body.description,
      body.price,
      body.condition,
      body.isAvailable
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