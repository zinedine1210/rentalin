import { verifyToken } from "@@/middleware";
import { unlink } from "fs/promises";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import db from "@@/database/db";
import { join } from "path";
import { UploadType } from "@@/lib/uploads/data/UploadModel";

export async function DELETE(request: NextRequest, 
  { params }: { params: { id: string } }
) {
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
    const fileId = params.id

    if (!fileId) {
        return NextResponse.json({
            success: false,
            message: "File ID is required",
            data: null
        }, { status: 400 });
    }

    // Retrieve file metadata from database
    const stmt = db.prepare(`SELECT * FROM uploads WHERE id = ? AND created_by = ?`);
    const fileData = stmt.get(fileId, decodedUserVerify.userId) as UploadType

    if (!fileData) {
        return NextResponse.json({
            success: false,
            message: "File not found or you do not have permission to delete this file",
            data: null
        }, { status: 404 });
    }

    const filePath = join(process.cwd(), "public", fileData.file_path);

    try {
        // Delete file from the file system
        await unlink(filePath);

        // Remove file metadata from database
        const deleteStmt = db.prepare(`DELETE FROM uploads WHERE id = ?`);
        deleteStmt.run(fileId);

        return NextResponse.json({
            success: true,
            message: "File successfully deleted",
            data: null
        }, { status: 200 });
    } catch (error) {
        console.error("Error deleting file:", error);

        return NextResponse.json({
            success: false,
            message: "Error occurred while deleting file",
            data: null
        }, { status: 500 });
    }
}
