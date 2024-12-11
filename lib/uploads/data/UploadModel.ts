import { Options } from "@@/src/types/types"

export interface UploadType {
    id?: number
    file_name: string
    file_path: string
    file_type: string
    public_id: string
    created_by?: string
    uploaded_at?: Date
}

export interface CloudinaryType {
    api_key: string
    asset_folder: string
    asset_id: string
    batchId: string
    bytes: number
    created_at: Date
    display_name: string
    etag: string
    format: string
    height: number
    id: string
    path: string
    placeholder: boolean
    public_id: string
    resource_type: string
    secure_url: string
    signature: string
    tags: any[]
    thumbnail_url: string
    type: string
    url: string
    version: number
    version_id: string
    width: number
}

export class UploadModel {
    public id: number
    public file_name: string
    public file_path: string
    public file_type: string
    public created_by: string
    public uploaded_at: Date

    constructor(props: UploadType) {
        this.id = props.id
        this.created_by = props.created_by
        this.file_name = props.file_name
        this.file_path = props.file_path
        this.file_type = props.file_type
        this.uploaded_at = props.uploaded_at
    }

    // Convert array of UploadType to array of UploadModel
    static toDatatableResponse = (array: UploadType[]): UploadModel[] => {
        return array.map((item: UploadType) => {
            return new UploadModel(item)
        })
    }

    // Convert array of UploadType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: UploadType[]): Options[] => {
        return array.map((item: UploadType) => {
            return {
                label: `${item.file_name}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of UploadModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: UploadModel[]): Options[] => {
        return array.map((item: UploadModel) => {
            return {
                label: item.file_name,
                value: item.id
            }
        })
    }
}

