import { Options } from "@@/src/types/types"

export interface UnitType {
    id: number
    category_id: number
    file_picture_id: number
    armada_id: number
    partner_id: number
    name_unit: string
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
    armada: {
        armada_name: string,
        armada_location: string,
        armada_embed_link: string,
        armada_location_summary: string
    }
    category_title: string
    category_icon: string
}

export class UnitModel {
    public id: number
    public category_id: number
    public file_picture_id: number
    public partner_id: number
    public armada_id: number
    public name_unit: string
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
    public armada_name: string
    public armada_location: string
    public armada_embed_link: string
    public armada_location_summary: string
    public category_title: string
    public category_icon: string
    public descriptionSubstring: string
    public nameUnitSubstring: string

    constructor(props: UnitType) {
        this.id = props.id
        this.category_id = props.category_id
        this.file_picture_id = props.file_picture_id
        this.partner_id = props.partner_id
        this.armada_id = props.armada_id
        this.name_unit = props.name_unit
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
        this.armada_name = props.armada.armada_name
        this.armada_location = props.armada.armada_location
        this.armada_embed_link = props.armada.armada_embed_link
        this.armada_location_summary = props.armada.armada_location_summary
        this.category_title = props.category_title
        this.category_icon = props.category_icon
        this.nameUnitSubstring = props.name_unit.length > 20 ? props.name_unit.substring(0, 20) + "..." : props.name_unit
        this.descriptionSubstring = props.description.length > 100 ? props.description.substring(0, 100) + "..." : props.description
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
                label: `${item.name_unit}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of UnitModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: UnitModel[]): Options[] => {
        return array.map((item: UnitModel) => {
            return {
                label: item.name_unit,
                value: item.id
            }
        })
    }
}

