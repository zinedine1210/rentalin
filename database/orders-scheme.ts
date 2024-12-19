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
  status: 'pending' | 'accepted' | 'completed' | 'rejected' | 'onrent'
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
    status TEXT CHECK(status IN ('pending', 'accepted', 'completed', 'rejected' | 'onrent')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (usage_id) REFERENCES usage_prices(id),
    FOREIGN KEY (armada_id) REFERENCES armadas(id),
    FOREIGN KEY (renter_id) REFERENCES users(id)
  );
  
`;

export const ordersData: OrderPayload[] = [
  {
    unit_id: 1,
    renter_id: 1,
    usage_id: 1,
    armada_id: 1,
    usage_location: 'dalam kota',
    delivery_address: 'ajkjaksa',
    delivery_method: 'ambil sendiri',
    delivery_price: 20000,
    start_date: '12-10-2020',
    duration: 1,
    total_price: 20000000,
    status: 'pending'
  }
];