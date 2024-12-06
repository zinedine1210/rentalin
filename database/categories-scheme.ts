export interface CategoryPayload {
  title: string
}
export const SQL_categories = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
`;

export const categoriesData: CategoryPayload[] = [
    {
        title: 'IPhone'
    },
    {
        title: 'Mobil'
    },
    {
        title: 'Motor'
    }
];