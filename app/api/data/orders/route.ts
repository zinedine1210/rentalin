// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { OrderPayload } from '@@/database/orders-scheme';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';

const nameTable: string = 'orders'

export async function GET(request: Request) {
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
  let params: (string | number)[] = [];

  if (decodedUserVerify.role !== 'admin') {
    whereClause = 'WHERE o.renter_id = ?';
    params.push(decodedUserVerify.userId);
  }

  if (Object.keys(filters).length > 0) {
    const filterConditions = Object.entries(filters).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `o.${key} IN (${value.map(() => '?').join(', ')})`;
      } else {
        return `o.${key} LIKE ?`;
      }
    });

    whereClause += (whereClause ? ' AND ' : 'WHERE ') + filterConditions.join(' AND ');
    params = params.concat(Object.values(filters).flatMap(value => 
      Array.isArray(value) ? value : [`%${value}%`]
    ));
  }

  const totalTableQuery = `SELECT COUNT(*) as count FROM ${nameTable} AS o ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePages = Math.ceil(count / limit);
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
    const body: OrderPayload = await request.json();

    const stmt = db.prepare(`
      INSERT INTO ${nameTable} (unit_id, renter_id, usage_id, armada_id, usage_location, delivery_method, delivery_address, delivery_price, start_date, duration, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.unit_id,
      body.renter_id,
      body.usage_id,
      body.armada_id,
      body.usage_location,
      body.delivery_method,
      body.delivery_address,
      body.delivery_price,
      body.start_date,
      body.duration,
      body.total_price,
      body.status
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