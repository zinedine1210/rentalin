export interface UploadPayload {
    file_name: string
    file_path: string
    file_type: string
    public_id: string
}

export const SQLuploads = `
    CREATE TABLE IF NOT EXISTS uploads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_type TEXT,
        public_id TEXT NOT NULL,
        created_by INTEGER,
        uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
`

export const uploadsData: UploadPayload[] = [
    {
        file_name: 'Profile Admin',
        file_path: '/images/profile.png',
        file_type: 'image/png',
        public_id: 'aasasasasasasas'
    },
]