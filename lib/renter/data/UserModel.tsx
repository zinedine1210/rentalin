export interface UserType {
    id: number;
    username: string | null
    email: string
    password: string
    phone: string
    file_identity_id: number
    file_identity_name: string
    file_identity_path: string
    file_identity_type: string
    file_profile_ig_id: number
    file_profile_ig_name: string
    file_profile_ig_path: string
    file_profile_ig_type: string
    file_driver_license_id: number
    file_driver_license_name: string
    file_driver_license_path: string
    file_driver_license_type: string
    full_name: string
    danger_phone: string
    address: string
    role: 'admin' | 'renter'
    status: 'active' | 'inactive'
    created_at: string;
    updated_at: string;
}