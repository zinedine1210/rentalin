// app/api/posts/list/route.ts
import { NextResponse } from 'next/server';
import db, { CountResult } from '@@/database/db';
import { PagesForm } from '@@/lib/pages/data/PageForm';
import { createPage } from '.';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '@@/middleware';

export interface PagesPayload {
  title: string
  slug: string
  content: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  seo_heading: string | null
  canonical_url: string | null
  is_published: boolean
  page_order: number | null
  created_by: number | null
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

  const totalTableQuery = `SELECT COUNT(*) as count FROM pages ${whereClause}`;
  const totalTable = db.prepare(totalTableQuery);
  const { count } = totalTable.get(...params) as CountResult;

  const totalTablePages = Math.ceil(count / limit);
  const stmt = db.prepare(`
    SELECT * FROM pages
    ${whereClause}
    ORDER BY page_order ASC
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
    const body: PagesForm = await request.json();

    // Menyimpan data menu ke database
    const newPage = createPage({
      title: body.title,
      slug: body.slug,
      content: body.content || null,
      featured_image: body.featured_image || null,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      meta_keywords: body.meta_keywords || null,
      seo_heading: body.seo_heading || null,
      canonical_url: body.canonical_url || null,
      is_published: body.is_published || false, 
      page_order: body.page_order || null,
      created_by: decodedUserVerify.userId || null
    });

    return NextResponse.json({
      success: true,
      message: "Page created successfully",
      data: newPage
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error creating Page",
      data: error
    }, { status: 500 });
  }
}