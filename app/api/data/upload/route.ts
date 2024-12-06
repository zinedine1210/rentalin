import { verifyToken } from "@@/middleware";
import { writeFile } from "fs/promises";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { createHash } from "crypto";
import db from "@@/database/db";

export async function POST(request: NextRequest) {
    const tokenHeaders = request.headers.get('Authorization');
    const token = tokenHeaders ? tokenHeaders.split(" ")[1] : null;
    const decodedUserVerify: JwtPayload | null = token ? await verifyToken(token) : null;

    if (!token || !decodedUserVerify) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized Access",
            data: null
        }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({
            success: false,
            message: "No file uploaded",
            data: null
        }, { status: 400 });
    }

    // Validate file MIME type (e.g., only allow images)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(file.type)) {
        return NextResponse.json({
            success: false,
            message: "Invalid file type",
            data: null
        }, { status: 400 });
    }

    // Validate file size (e.g., max 5 MB)
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxFileSize) {
        return NextResponse.json({
            success: false,
            message: "File size exceeds the limit of 5 MB",
            data: null
        }, { status: 400 });
    }

    // Generate a safe filename using hash
    const extension = file.name.split('.').pop(); // Extract file extension
    const uniqueName = createHash('sha256')
        .update(file.name + Date.now().toString())
        .digest('hex');

    const safeFileName = `${uniqueName}.${extension}`;
    const uploadPath = join(process.cwd(), "public/uploads", safeFileName);

    // Save the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(uploadPath, buffer);
    
    // Save metadata to the database
    const stmt = db.prepare(`
        INSERT INTO uploads (file_name, file_path, file_type, created_by)
        VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(safeFileName, `/uploads/${safeFileName}`, file.type, decodedUserVerify.userId);

    return NextResponse.json({
        success: true,
        message: 'File successfully uploaded',
        data: {
            id: result.lastInsertRowid,
            fileName: safeFileName,
            filePath: `/uploads/${safeFileName}`,
            fileType: file.type,
        }
    }, { status: 200 });
}
