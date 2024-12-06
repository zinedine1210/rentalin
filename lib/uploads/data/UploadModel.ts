import { Options } from "@@/src/types/types"

export interface UploadType {
    id: string
    file_name: string
    file_path: string
    file_type: string
    created_by: string
    uploaded_at: Date
}

export class UploadModel {
    public id: string
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

