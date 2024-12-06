export interface PartnerPayload {
  name: string
  phone: string
  email: string
  address: string
}

export const SQL_partners = `
  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const partnersData: PartnerPayload[] = [
  {
    name: 'Zinedine',
    address: 'Kp Gempol Cakung Timur, Jakarta Timur',
    email: 'zinedine.office2023@gmail.com',
    phone: '089508781380'
  },
  {
    name: 'Martha Agung',
    address: 'Jl. Raya Jakarta Barat, No. 12',
    email: 'martha.agung@mail.com',
    phone: '085212345678'
  },
  {
    name: 'Indra Pratama',
    address: 'Jl. Merdeka, No. 55',
    email: 'indra.pratama@outlook.com',
    phone: '087654321234'
  },
  {
    name: 'Siti Nurhaliza',
    address: 'Jl. Sukarno-Hatta, No. 33',
    email: 'siti.nurhaliza@yahoo.com',
    phone: '081234567890'
  },
  {
    name: 'Rudi Setiawan',
    address: 'Jl. Raya Bandung, No. 44',
    email: 'rudi.setiawan@gmail.com',
    phone: '089876543210'
  },
  {
    name: 'Ahmad Rizky',
    address: 'Jl. Raya Bogor, No. 77',
    email: 'ahmad.rizky@aol.com',
    phone: '085612345678'
  },
  {
    name: 'Jessica Alvera',
    address: 'Jl. Raya Depok, No. 56',
    email: 'jessica.alvera@gmail.com',
    phone: '081298765432'
  },
  {
    name: 'Budi Santoso',
    address: 'Jl. Raya Surabaya, No. 15',
    email: 'budi.santoso@mail.com',
    phone: '082345678901'
  },
  {
    name: 'Wayan Arjuna',
    address: 'Jl. Raya Bali, No. 100',
    email: 'wayan.arjuna@outlook.com',
    phone: '085312345678'
  },
  {
    name: 'Lina Oktaviani',
    address: 'Jl. Raya Yogyakarta, No. 5',
    email: 'lina.oktaviani@gmail.com',
    phone: '089876543210'
  },
];
