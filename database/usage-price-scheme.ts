export interface UsagePricePayload {
  name: string
  description: string
  min_order: number
  price_multiplier: number
  operator_type: '-' | '*' | '+' | '/' | '%'
  status: 'active' | 'stop'
}
export const SQL_usage_prices = `
  CREATE TABLE IF NOT EXISTS usage_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    min_order REAL DEFAULT 1,
    price_multiplier REAL NOT NULL CHECK(price_multiplier >= 1),
    operator_type TEXT NOT NULL CHECK(operator_type IN ('-', '*', '+', '/', '%')),
    status TEXT NOT NULL CHECK(status IN ('active', 'stop')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const usage_pricesData: any[] = [
  {
    name: 'Standard Rental Rate',
    description: 'Base rate for standard rentals.',
    min_order: 100,
    price_multiplier: 20,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Weekend Surcharge',
    description: 'Additional fee for weekend rentals.',
    min_order: 50,
    price_multiplier: 30,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Holiday Premium',
    description: 'Holiday premium rate.',
    min_order: 1,
    price_multiplier: 20,
    operator_type: '%',
    status: 'active'
  },
  {
    name: 'Late Fee',
    description: 'Charge for late returns.',
    min_order: 20,
    price_multiplier: 20,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Damage Fee',
    description: 'Charge for damage to rental items.',
    min_order: 100,
    price_multiplier: 1.3,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Discount for Members',
    description: 'Special discount for registered members.',
    min_order: 50,
    price_multiplier: 0.9,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Pickup Fee',
    description: 'Charge for item pickup service.',
    min_order: 10,
    price_multiplier: 1.0,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Delivery Fee',
    description: 'Charge for delivery service.',
    min_order: 15,
    price_multiplier: 1.1,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Late Pickup Fee',
    description: 'Charge for late pickup requests.',
    min_order: 30,
    price_multiplier: 1.2,
    operator_type: '*',
    status: 'stop'
  },
  {
    name: 'Insurance Fee',
    description: 'Fee for rental insurance coverage.',
    min_order: 50,
    price_multiplier: 1.0,
    operator_type: '*',
    status: 'stop'
  },
];
