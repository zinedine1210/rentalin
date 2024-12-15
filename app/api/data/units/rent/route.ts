import db, { CountResult } from "@@/database/db";
import { NextResponse } from "next/server";

const nameTable: string = 'units'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const startDate = searchParams.get("start_date");
    const duration = parseInt(searchParams.get("duration") || "0", 10);

    if (!startDate || duration <= 0) {
        return NextResponse.json({
            success: false,
            message: "Pilih dulu durasi dan tanggal sewa Anda",
            data: null
        }, { status: 400 });
    }

    // start date tidak boleh kurang dari tanggal sekarang bosss
    const now = new Date();
    const startDateObj = new Date(startDate);

    if (startDateObj <= now) {
        return NextResponse.json({
            success: false,
            message: "Tanggal sewa gaboleh kemarin brooo",
            data: null
        }, { status: 400 });
    }

    // Hitung end_date berdasarkan duration
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    
    const filters: Record<string, string | string[]> = {};
  
    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'limit' && key !== 'start_date' && key !== 'duration') {
        filters[key] = value;
      }
    });
  
    const offset = (page - 1) * limit;
  
    let whereClause = '';
    let params: string[] = [];
  
    if (Object.keys(filters).length > 0) {
      const filterConditions = Object.entries(filters).map(([key, value]) => {
        if (Array.isArray(value)) {
          return `u.${key} IN (${value.map(() => '?').join(', ')})`;
        } else {
          return `u.${key} LIKE ?`;
        }
      });
  
      whereClause = 'WHERE ' + filterConditions.join(' AND ');
      params = Object.values(filters).flatMap(value => 
        Array.isArray(value) ? value : [`%${value}%`]
      );
    }
  
    const totalTableQuery = `SELECT COUNT(*) as count FROM ${nameTable} AS u ${whereClause}`;
    const totalTable = db.prepare(totalTableQuery);
    const { count } = totalTable.get(...params) as CountResult;

    console.log([startDate, endDate.toISOString(), ...params, limit, offset, whereClause]);
  
    const totalTablePages = Math.ceil(count / limit);
    const stmt = db.prepare(`
      SELECT 
        u.*,
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
      FROM units u
        INNER JOIN partners ON u.partner_id = partners.id
        INNER JOIN categories AS cat ON u.category_id = cat.id
        INNER JOIN uploads ON u.file_picture = uploads.id
        INNER JOIN armadas ON u.armada_id = armadas.id
        LEFT JOIN orders o
        ON u.id = o.unit_id
        AND (
            o.status = 'active' AND
            (
                (datetime(:start_date) < datetime(o.start_date, '+' || o.duration || ' days')) AND 
                (datetime(:end_date) > datetime(o.start_date))
            )
        )
      ${whereClause} AND o.id IS NULL
          AND u.isAvailable = 1
      LIMIT :limit OFFSET :offset
    `);
    
    const data: any = stmt.all({
      start_date: startDate,
      end_date: endDate.toISOString(),
      limit: limit,
      offset: offset
    }, 
    ...params);
    
  
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