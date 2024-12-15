import { MenusPayload } from "@@/app/api/data/menus/route";

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs'
import { menuItemsData, sqlMenuItems } from "./menus-scheme";
import { pagesData, sqlPages } from "./pages-scheme";
import { sqlUsers, usersData, UsersPayload } from "./user-scheme";
import { SQLuploads, uploadsData } from "./uploads-scheme";
import { ArmadaPayload, armadasData, SQL_armadas } from "./armadas-scheme";
import { categoriesData, CategoryPayload, SQL_categories } from "./categories-scheme";
import { OrderPayload, ordersData, SQL_orders } from "./orders-scheme";
import { PartnerPayload, partnersData, SQL_partners } from "./partners-scheme";
import { SQL_units } from "./unit-scheme";
import { SQL_usage_prices, usage_pricesData, UsagePricePayload } from "./usage-price-scheme";

export interface CountResult {
  count: number;
}
// const dbFilePath = path.join(process.cwd(), 'data.db');
const dbFilePath = path.join("/tmp", 'data.db');
// Check if the database file already exists
const dbExists = fs.existsSync(dbFilePath);
const db = new Database(dbFilePath, { verbose: console.log });
function seedTable<T>(
  tableName: string,
  data: T[],
  insertQuery: string
): void {

  const checkstmt = db.prepare(`SELECT COUNT(*) AS count FROM ${tableName}`);
  const { count } = checkstmt.get() as CountResult;

  if (count === 0) {
    const insertStmt = db.prepare(insertQuery);
    data.forEach((item) => {
      insertStmt.run(...Object.values(item));
    });
  } else {
    console.log(`Table ${tableName} already seeded.`);
  }
}

if(!dbExists){
  db.exec(
    SQLuploads +
    sqlMenuItems +
    sqlPages + 
    sqlUsers +
    SQL_armadas + 
    SQL_categories +
    SQL_orders + 
    SQL_partners + 
    SQL_units +
    SQL_usage_prices
  );
  
  seedTable<any>(
    'uploads',
    uploadsData,
    `INSERT OR IGNORE INTO uploads 
     (file_name, file_path, file_type, public_id) 
     VALUES (?, ?, ?, ?)`
  );
  seedTable<any>(
    'pages',
    pagesData,
    `INSERT OR IGNORE INTO pages 
     (title, slug, content, featured_image, meta_title, meta_description, meta_keywords, seo_heading, canonical_url, is_published, page_order, created_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  // seedTable<OrderPayload>(
  //   'orders',
  //   ordersData,
  //   `INSERT OR IGNORE INTO orders 
  //    (unit_id, renter_id, usage_id, armada_id, usage_location, delivery_address, delivery_method, delivery_price, start_date, duration, total_price, status) 
  //    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  // );
  seedTable<UsersPayload>(
    'users',
    usersData,
    `INSERT OR IGNORE INTO users (username, email, phone, password, full_name, role, status, address, birth_date, danger_phone, file_driver_license, file_identity, file_profile_ig, gender) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  seedTable<MenusPayload>(
    'menus',
    menuItemsData,
    `INSERT OR IGNORE INTO menus (title, url, parent_id, order_position, pages_id, icon, flag) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  seedTable<CategoryPayload>(
    'categories',
    categoriesData,
    `INSERT OR IGNORE INTO categories (title, icon) 
     VALUES (?, ?)`
  );
  seedTable<ArmadaPayload>(
    'armadas',
    armadasData,
    `INSERT OR IGNORE INTO armadas (name, location, location_summary) 
     VALUES (?, ?, ?)`
  );
  seedTable<PartnerPayload>(
    'partners',
    partnersData,
    `INSERT OR IGNORE INTO partners (name, address, email, phone) 
     VALUES (?, ?, ?, ?)`
  );
  seedTable<UsagePricePayload>(
    'usage_prices',
    usage_pricesData,
    `INSERT OR IGNORE INTO usage_prices (name, description, min_order, price_multiplier, operator_type, status) 
     VALUES (?, ?, ?, ?, ?, ?)`
  );
}
export default db
