export interface UsagePricePayload {
  name: string
  description: string
  min_order: number
  price_multiplier: number
  operator_type: '-' | '*' | '+' | '/' | '%'
  status: 'active' | 'inactive'
}
export const SQL_usage_prices = `
  CREATE TABLE IF NOT EXISTS usage_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    min_order REAL DEFAULT 0,
    price_multiplier REAL NOT NULL CHECK(price_multiplier >= 1),
    operator_type TEXT NOT NULL CHECK(operator_type IN ('-', '*', '+', '/', '%')),
    status TEXT NOT NULL CHECK(status IN ('active', 'inactive')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const usage_pricesData: any[] = [
  {
    name: 'Standard Rental Rate',
    description: 'Base rate for standard rentals.',
    min_order: 100,
    price_multiplier: 1.2,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Weekend Surcharge',
    description: 'Additional fee for weekend rentals.',
    min_order: 50,
    price_multiplier: 1.5,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Holiday Premium',
    description: 'Holiday premium rate.',
    min_order: 200,
    price_multiplier: 2.0,
    operator_type: '*',
    status: 'inactive'
  },
  {
    name: 'Late Fee',
    description: 'Charge for late returns.',
    min_order: 20,
    price_multiplier: 1.1,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Damage Fee',
    description: 'Charge for damage to rental items.',
    min_order: 100,
    price_multiplier: 1.3,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Discount for Members',
    description: 'Special discount for registered members.',
    min_order: 50,
    price_multiplier: 0.9,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Pickup Fee',
    description: 'Charge for item pickup service.',
    min_order: 10,
    price_multiplier: 1.0,
    operator_type: '*',
    status: 'inactive'
  },
  {
    name: 'Delivery Fee',
    description: 'Charge for delivery service.',
    min_order: 15,
    price_multiplier: 1.1,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Late Pickup Fee',
    description: 'Charge for late pickup requests.',
    min_order: 30,
    price_multiplier: 1.2,
    operator_type: '*',
    status: 'active'
  },
  {
    name: 'Insurance Fee',
    description: 'Fee for rental insurance coverage.',
    min_order: 50,
    price_multiplier: 1.0,
    operator_type: '*',
    status: 'active'
  },
];
