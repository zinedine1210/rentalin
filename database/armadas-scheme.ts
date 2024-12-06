export interface ArmadaPayload {
  name: string
  location: string
  location_summary: string
}
export const SQL_armadas = `
  CREATE TABLE IF NOT EXISTS armadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    location_summary TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const armadasData: ArmadaPayload[] = [
  {
    name: 'PT Anjas',
    location: 'KP Gempol Cakung Timur',
    location_summary: 'Jakarta Timur'
  },
  {
    name: 'PT Sinar Jaya',
    location: 'Jl. Raya Taman Palm, No. 45',
    location_summary: 'Bekasi'
  },
  {
    name: 'CV Maju Jaya',
    location: 'Jl. Raya Cikarang, Blok A-2',
    location_summary: 'Cikarang'
  },
  {
    name: 'PT Adi Putra',
    location: 'Jl. Soekarno-Hatta, No. 90',
    location_summary: 'Tangerang'
  },
  {
    name: 'PT Karya Indah',
    location: 'Jl. Merdeka, No. 25',
    location_summary: 'Bandung'
  },
  {
    name: 'CV Bahagia',
    location: 'Jl. Raya Cikupa, No. 88',
    location_summary: 'Tangerang Selatan'
  },
  {
    name: 'PT Delta Express',
    location: 'Jl. Raya Bintaro, No. 10',
    location_summary: 'Tangerang'
  },
  {
    name: 'PT Prima Trans',
    location: 'Jl. Gatot Subroto, No. 75',
    location_summary: 'Jakarta Selatan'
  },
  {
    name: 'PT Sumber Alam',
    location: 'Jl. Pahlawan, No. 60',
    location_summary: 'Depok'
  },
  {
    name: 'CV Sejahtera Abadi',
    location: 'Jl. Raya Surabaya, No. 100',
    location_summary: 'Surabaya'
  },
];
