export interface ArmadaPayload {
  name: string
  location: string
  location_summary: string,
  embed_link: string
}
export const SQL_armadas = `
  CREATE TABLE IF NOT EXISTS armadas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    location_summary TEXT NOT NULL,
    embed_link TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const armadasData: ArmadaPayload[] = [
  {
    name: 'PT Anjas',
    location: 'KP Gempol Cakung Timur',
    location_summary: 'Jakarta Timur',
    embed_link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.612379940436!2d106.95018648062475!3d-6.18260327783122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b2a1452e219%3A0xc99bfba518d141ab!2sFathir%20Cell!5e0!3m2!1sid!2sid!4v1735022289315!5m2!1sid!2sid'
  },
  {
    name: 'PT Sinar Jaya',
    location: 'Jl. Raya Taman Palm, No. 45',
    location_summary: 'Bekasi',
    embed_link: ''
  },
  {
    name: 'CV Maju Jaya',
    location: 'Jl. Raya Cikarang, Blok A-2',
    location_summary: 'Cikarang',
    embed_link: ''
  },
  {
    name: 'PT Adi Putra',
    location: 'Jl. Soekarno-Hatta, No. 90',
    location_summary: 'Tangerang',
    embed_link: ''
  },
  {
    name: 'PT Karya Indah',
    location: 'Jl. Merdeka, No. 25',
    location_summary: 'Bandung',
    embed_link: ''
  },
  {
    name: 'CV Bahagia',
    location: 'Jl. Raya Cikupa, No. 88',
    location_summary: 'Tangerang Selatan',
    embed_link: ''
  },
  {
    name: 'PT Delta Express',
    location: 'Jl. Raya Bintaro, No. 10',
    location_summary: 'Tangerang',
    embed_link: ''
  },
  {
    name: 'PT Prima Trans',
    location: 'Jl. Gatot Subroto, No. 75',
    location_summary: 'Jakarta Selatan',
    embed_link: ''
  },
  {
    name: 'PT Sumber Alam',
    location: 'Jl. Pahlawan, No. 60',
    location_summary: 'Depok',
    embed_link: ''
  },
  {
    name: 'CV Sejahtera Abadi',
    location: 'Jl. Raya Surabaya, No. 100',
    location_summary: 'Surabaya',
    embed_link: ''
  },
];
