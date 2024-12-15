import { Options } from "@@/src/types/types"

export interface UsagePriceType {
    id: string
    description: string
    name: string
    min_order: number
    price_multiplier: number
    operator_type:  '-' | '*' | '+' | '/' | '%'
    status: 'active' | 'inactive'
    created_at: string
    updated_at: string
}

export class UsagePriceModel {
    public id: string
    public description: string
    public name: string
    public min_order: number
    public price_multiplier: number
    public operator_type:  '-' | '*' | '+' | '/' | '%'
    public status: 'active' | 'inactive'
    public created_at: string
    public updated_at: string

    constructor(props: UsagePriceType) {
        this.id = props.id
        this.name = props.name
        this.description = props.description.length > 40 ? props.description.substring(0, 40) + "..." : props.description
        this.min_order = props.min_order
        this.price_multiplier = props.price_multiplier
        this.operator_type = props.operator_type
        this.status = props.status
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }

    // Convert array of UsagePriceType to array of UsagePriceModel
    static toDatatableResponse = (array: UsagePriceType[]): UsagePriceModel[] => {
        return array.map((item: UsagePriceType) => {
            return new UsagePriceModel(item)
        })
    }

    // Convert array of UsagePriceType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: UsagePriceType[]): Options[] => {
        return array.map((item: UsagePriceType) => {
            return {
                label: `${item.name}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of UsagePriceModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: UsagePriceModel[]): Options[] => {
        return array.map((item: UsagePriceModel) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

