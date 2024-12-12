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
      armadas.name AS armada_name,
      armadas.location AS armada_location,
      armadas.location_summary AS armada_location_summary,
      cat.title AS category_title
    FROM ${nameTable}
      INNER JOIN partners ON ${nameTable}.partner_id = partners.id
      INNER JOIN categories AS cat ON ${nameTable}.category_id = cat.id
      INNER JOIN uploads ON ${nameTable}.file_picture = uploads.id
      INNER JOIN armadas ON ${nameTable}.armada_id = armadas.id
    ${whereClause}
    LIMIT ? OFFSET ?
  `);
  const data: any = stmt.all(...params, limit, offset);

  const transformData = data.map((item) => ({
    id: item.id,
    category_id: item.category_id,
    file_picture_id: item.file_picture,
    partner_id: item.partner_id,
    name_unit: item.name_unit,
    description: item.description,
    price: item.price,
    condition: item.condition,
    isAvailable: item.isAvailable,
    created_at: item.created_at,
    updated_at: item.updated_at,
    file: {
      file_name: item.file_name,
      file_path: item.file_path,
      file_type: item.file_type
    },
    partner: {
      partner_name: item.partner_name,
      partner_phone: item.partner_phone,
      partner_email: item.partner_email,
      partner_address: item.partner_address
    },
    armada: {
      armada_name: item.armada_name,
      armada_location: item.armada_location,
      armada_location_summary: item.armada_location_summary
    },
    category_title: item.category_title
  }))

  return NextResponse.json({
    success: true,
    message: 'Success get data',
    data: {
      data: transformData,
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
      INSERT INTO ${nameTable} (category_id, file_picture, armada_id, partner_id, name_unit, description, price, condition, isAvailable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.category_id,
      body.file_picture,
      body.armada_id,
      body.partner_id,
      body.name_unit,
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