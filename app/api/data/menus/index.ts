// Path ke database Anda

import db from "@@/database/db";
import { MenusList } from "@@/lib/menus/data/MenusModel";

export const createMenu = (menu: {
  title: string;
  url: string | null;
  icon: string | null;
  flag: string | null;
  parent_id: number | null;
  pages_id: number | null;
  order_position: number | null;
}) => {
  const { title, url, icon, flag, parent_id, pages_id, order_position } = menu;

  const tx = db.transaction(() => {
    if (order_position !== null) {
      db.prepare(`
        UPDATE menus
        SET order_position = order_position + 1
        WHERE order_position >= ?
      `).run(order_position);
    }

    // Insert menu baru
    const stmt = db.prepare(`
      INSERT INTO menus (title, url, icon, flag, parent_id, pages_id, order_position)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      title,
      url,
      icon,
      flag,
      parent_id,
      pages_id,
      order_position
    );

    // Ambil menu yang baru dibuat
    return db.prepare(`SELECT * FROM menus WHERE id = ?`).get(result.lastInsertRowid);
  });

  return tx();
};



export const updateMenu = (id: number, updates: {
  title?: string;
  url?: string | null;
  icon?: string | null;
  flag?: string | null;
  parent_id?: number | null;
  pages_id?: number | null;
  order_position?: number | null;
}) => {
  const {
    title,
    url,
    icon,
    flag,
    parent_id,
    pages_id,
    order_position,
  } = updates;

  // Validasi bahwa menu dengan ID tersebut ada
  const existingMenu: MenusList | any = db.prepare(`SELECT * FROM menus WHERE id = ?`).get(id);
  if (!existingMenu) {
    throw new Error(`Menu with ID ${id} not found.`);
  }

  const tx = db.transaction(() => {
    // Jika `order_position` berubah, sesuaikan urutan data lain
    if (order_position !== undefined && order_position !== existingMenu.order_position) {
      // Geser data yang sebelumnya di posisi baru
      db.prepare(`
        UPDATE menus
        SET order_position = order_position + 1
        WHERE order_position >= ? AND id != ?;
      `).run(order_position, id);

      // Geser data di posisi lama untuk mengisi celah
      db.prepare(`
        UPDATE menus
        SET order_position = order_position - 1
        WHERE order_position > ?;
      `).run(existingMenu.order_position);
    }

    // Update data menu
    const stmt = db.prepare(`
      UPDATE menus
      SET
        title = COALESCE(?, title),
        url = COALESCE(?, url),
        icon = COALESCE(?, icon),
        flag = COALESCE(?, flag),
        parent_id = COALESCE(?, parent_id),
        pages_id = COALESCE(?, pages_id),
        order_position = COALESCE(?, order_position),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title,
      url,
      icon,
      flag,
      parent_id,
      pages_id,
      order_position,
      id
    );

    // Ambil data yang telah diperbarui
    return db.prepare(`SELECT * FROM menus WHERE id = ?`).get(id);
  });

  return tx();
};
