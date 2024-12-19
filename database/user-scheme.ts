export interface UsersPayload {
  username: string | null
  email: string
  password: string
  phone: string
  file_identity: number
  file_profile_ig: number
  file_driver_license: number
  full_name: string
  danger_phone: string
  address: string
  role: 'admin' | 'renter'
  status: 'active' | 'inactive'
}

export const sqlUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    phone TEXT NOT NULL,
    file_identity INTEGER NOT NULL,
    file_profile_ig INTEGER NOT NULL,
    file_driver_license INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    danger_phone TEXT NOT NULL,
    address TEXT NULL,
    role TEXT CHECK(role IN ('admin', 'renter')) DEFAULT 'admin',
    status TEXT CHECK(status IN ('active', 'inactive')) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (file_identity) REFERENCES uploads(id),
    FOREIGN KEY (file_driver_license) REFERENCES uploads(id),
    FOREIGN KEY (file_profile_ig) REFERENCES uploads(id)
  );
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_name ON users(full_name);
  CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
  
`;

export const usersData: UsersPayload[] = [
  {
    username: "admin",
    email: "admin@mycompany.com",
    phone: '089508781380',
    password: "$2b$10$AqWluutcAOhyDuADHoMkhuRTVLPAN8LgLJFJ332jbNwC4V9v1b1LC",
    full_name: "Admin User",
    role: "admin",
    status: "active",
    address: 'Kp Gempol Cakung timur',
    danger_phone: '0818291829128',
    file_driver_license: 1,
    file_identity: 1,
    file_profile_ig: 1
  },
  {
    username: 'renter',
    email: 'renter@gmail.com',
    phone: '089508781380',
    password: '$2b$10$AqWluutcAOhyDuADHoMkhuRTVLPAN8LgLJFJ332jbNwC4V9v1b1LC',
    full_name: 'Renter Bosss',
    role: 'renter',
    status: 'active',
    address: 'Gatau',
    danger_phone: '0829178291728',
    file_driver_license: 1,
    file_identity: 1,
    file_profile_ig: 1
  }
];