// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { verifyToken } from '@@/middleware';
import { JwtPayload } from 'jsonwebtoken';
import { OrderPayload } from '@@/database/orders-scheme';

const nameTable: string = 'orders'

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