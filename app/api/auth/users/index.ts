// Path ke database Anda

import db from "@@/database/db";
import { UsersPayload } from "@@/database/user-scheme";
import { PagesType} from "@@/lib/pages/data/PagesModel";

export const createUsers = (page: UsersPayload) => {
  const { username, email, password, phone, file_identity, file_driver_license, file_profile_ig, full_name, danger_phone, address, role, status } = page;

    // Insert menu baru
    const stmt = db.prepare(`
      INSERT INTO pages (username, email, password, phone, file_identity, file_driver_license, file_profile_ig, full_name, danger_phone, address, role, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      username,
      email,
      password,
      phone,
      file_identity,
      file_driver_license,
      file_profile_ig,
      full_name,
      danger_phone,
      address,
      role,
      status
    );

    // Ambil menu yang baru dibuat
    return db.prepare(`SELECT * FROM users WHERE id = ?`).get(result.lastInsertRowid);
};
