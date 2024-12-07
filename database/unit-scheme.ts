export interface UnitPayload {
  category_id: number
  file_picture: number
  partner_id: number
  name: string
  description: string
  price: number
  condition: string
  isAvailable: boolean
}

export const SQL_units = `
  CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    file_picture INTEGER NOT NULL,
    partner_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL CHECK(price >= 0),
    condition TEXT,
    isAvailable BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (file_picture) REFERENCES uploads(id) ON DELETE SET NULL
  );
  
`;

export const unitsData: any[] = [
];