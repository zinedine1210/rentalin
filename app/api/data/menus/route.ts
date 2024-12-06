// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { MenusForm } from '@@/lib/menus/data/MenusForm';
import { createMenu, updateMenu } from '.';
import { cookies } from 'next/headers';
import { verifyToken } from '@@/middleware';
import { JwtPayload } from 'jsonwebtoken';

export interface MenusPayload {
  title: string
  url: string | null
  parent_id: string | null
  order_position: number | null
  pages_id: number | null
  icon: string | null
  flag: string | null
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

  const totalTableQuery = `SELECT COUNT(*) as count FROM menus ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePages = Math.ceil(count / limit);
  const stmt = db.prepare(`
    SELECT * FROM menus
    ${whereClause}
    ORDER BY order_position ASC
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
    const body: MenusForm = await request.json();

    const newMenu = createMenu({
      title: body.title,
      url: body.url || null,
      icon: body.icon || null,
      flag: body.flag || null,
      parent_id: body.parent_id || null,
      pages_id: body.pages_id || null,
      order_position: body.order_position || null,
    });

    return NextResponse.json({
      success: true,
      message: "Menu created successfully",
      data: newMenu
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