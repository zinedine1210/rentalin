export interface CategoryPayload {
  title: string
  icon: string
}
export const SQL_categories = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const categoriesData: CategoryPayload[] = [
    {
      title: 'Iphone',
      icon: 'wpf:iphone'
    },
    {
      title: 'Mobil',
      icon: 'humbleicons:car'
    },
    {
      title: 'Motor',
      icon: 'fa6-solid:motorcycle'
    },
    {
      title: 'Macbook',
      icon: 'ri:macbook-line'
    },
    {
      title: 'Laptop',
      icon: 'icon-park-twotone:laptop'
    }
];