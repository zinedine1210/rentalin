import { UploadType } from "@@/lib/uploads/data/UploadModel"
import { Options } from "@@/src/types/types"

export interface ClientType {
    id: string
    title: string
    file_id: string
    file: UploadType
    created_at: Date
}

export class ClientModel {
    public id: string
    public title: string
    public file_id: string
    public created_at: Date
    public file_name: string
    public file_path: string
    public file_type: string
    public file_created_by: string
    public file_uploaded_at: Date

    constructor(props: ClientType) {
        this.id = props.id
        this.title = props.title
        this.file_id = props.file_id
        this.created_at = props.created_at
        this.file_name = props.file.file_name
        this.file_path = props.file.file_path
        this.file_type = props.file.file_type
        this.file_created_by = props.file.created_by
        this.file_uploaded_at = props.file.uploaded_at
    }

    // Convert array of ClientType to array of ClientModel
    static toDatatableResponse = (array: ClientType[]): ClientModel[] => {
        return array.map((item: ClientType) => {
            return new ClientModel(item)
        })
    }

    // Convert array of ClientType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: ClientType[]): Options[] => {
        return array.map((item: ClientType) => {
            return {
                label: `${item.title}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of ClientModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: ClientModel[]): Options[] => {
        return array.map((item: ClientModel) => {
            return {
                label: item.title,
                value: item.id
            }
        })
    }
}

