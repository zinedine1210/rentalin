import { NextResponse } from 'next/server';
import db from '@@/database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request: Request) {
  const reqPayload = await request.json();
  const user: undefined | any = db.prepare('SELECT * FROM users WHERE username = ?').get(reqPayload.username);

  if(!user){
    return NextResponse.json({
      message: 'Username not found',
      success: false,
      data: null
    }, { status: 401 })
  }

  const { password, id, username } = user
  
  if(!(await bcrypt.compare(reqPayload.password, password))){
    return NextResponse.json({
      success: false,
      message: 'Invalid username or password',
      data: null
    }, { status: 401 })
  }
  // Buat token JWT
  const token = jwt.sign({ userId: id, username, role: user.role }, SECRET_KEY, { expiresIn: '5h' });

  return NextResponse.json({
    success: true,
    message: `Hallo, ${username}`,
    data: {
      auth_token: token
    }
  }, { status: 200 });
}
