// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import db from '@@/database/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Cek apakah username sudah ada
  const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (existingUser) {
    return NextResponse.json({
      message: 'Username already taken',
      success: false,
      data: null,
      status: 400
    }, { status: 400 });
  }

  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan pengguna baru
  const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);

  return NextResponse.json({ 
    message: 'User registered successfully',
    success: true,
    status: 200,
    data: {}
  });
}
