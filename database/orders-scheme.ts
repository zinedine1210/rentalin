export interface OrderPayload {
  unit_id: number
  renter_id: number
  usage_id: number
  armada_id: number
  usage_location: string
  delivery_method: string
  delivery_address: string
  delivery_price: number
  start_date: string
  duration: number
  total_price: number
  status: 'active' | 'completed' | 'cancelled'
}
export const SQL_orders = `
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER NOT NULL,
    renter_id INTEGER NOT NULL,
    usage_id INTEGER,
    armada_id INTEGER NOT NULL,
    usage_location TEXT CHECK(usage_location IN ('dalam kota', 'luar kota')),
    delivery_method TEXT CHECK(delivery_method IN ('ambil sendiri', 'diantar')),
    delivery_address TEXT NOT NULL,
    delivery_price REAL NOT NULL CHECK(delivery_price >= 0),
    start_date DATETIME NOT NULL,
    duration INTEGER NOT NULL,
    total_price REAL NOT NULL CHECK(total_price >= 0),
    status TEXT CHECK(status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (usage_id) REFERENCES usage_prices(id),
    FOREIGN KEY (armada_id) REFERENCES armadas(id),
    FOREIGN KEY (renter_id) REFERENCES users(id)
  );
  
`;

export const ordersData: any[] = [
];