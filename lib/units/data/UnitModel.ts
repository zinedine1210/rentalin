import { Options } from "@@/src/types/types"

export interface UnitType {
    id: number
    category_id: number
    file_picture_id: number
    partner_id: number
    name: string
    description: string
    price: number
    condition: string
    isAvailable: boolean | number
    created_at: Date
    updated_at: Date
    file: {
        file_name: string
        file_path: string
        file_type: string
        public_id: string
    }
    partner: {
        partner_name: string
        partner_phone: string
        partner_email: string
        partner_address: string
    }
    category_title: string
}

export class UnitModel {
    public id: number
    public category_id: number
    public file_picture_id: number
    public partner_id: number
    public name: string
    public description: string
    public price: number
    public condition: string
    public isAvailable: boolean | number
    public created_at: Date
    public updated_at: Date
    public file_name: string
    public file_path: string
    public file_type: string
    public partner_name: string
    public partner_phone: string
    public partner_email: string
    public partner_address: string
    public category_title: string

    constructor(props: UnitType) {
        this.id = props.id
        this.category_id = props.category_id
        this.file_picture_id = props.file_picture_id
        this.partner_id = props.partner_id
        this.name = props.name
        this.description = props.description
        this.price = props.price
        this.condition = props.condition
        this.isAvailable = props.isAvailable
        this.created_at = props.created_at
        this.updated_at = props.updated_at
        this.file_name = props.file.file_name
        this.file_path = props.file.file_path
        this.file_type = props.file.file_type
        this.partner_name = props.partner.partner_name
        this.partner_phone = props.partner.partner_phone
        this.partner_email = props.partner.partner_email
        this.partner_address = props.partner.partner_address
        this.category_title = props.category_title
    }

    // Convert array of UnitType to array of UnitModel
    static toDatatableResponse = (array: UnitType[]): UnitModel[] => {
        return array.map((item: UnitType) => {
            return new UnitModel(item)
        })
    }

    // Convert array of UnitType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: UnitType[]): Options[] => {
        return array.map((item: UnitType) => {
            return {
                label: `${item.name}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of UnitModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: UnitModel[]): Options[] => {
        return array.map((item: UnitModel) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

