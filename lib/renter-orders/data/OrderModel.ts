import { Options } from "@@/src/types/types"

export interface OrderType {
    id: string
    name: string
    phone: string
    email: string
    address: string
    created_at: string
    updated_at: string
}

export class OrderModel {
    public id: string
    public name: string
    public phone: string
    public email: string
    public address: string
    public address_substring: string
    public created_at: string
    public updated_at: string

    constructor(props: OrderType) {
        this.id = props.id
        this.address = props.address
        this.email = props.email
        this.name = props.name
        this.phone = props.phone
        this.created_at = props.created_at
        this.updated_at = props.updated_at
        this.address_substring = props.address.length > 20 ? props.address.substring(0, 20) + "..." : props.address
    }

    // Convert array of OrderType to array of OrderModel
    static toDatatableResponse = (array: OrderType[]): OrderModel[] => {
        return array.map((item: OrderType) => {
            return new OrderModel(item)
        })
    }

    // Convert array of OrderType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: OrderType[]): Options[] => {
        return array.map((item: OrderType) => {
            return {
                label: `${item.name}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of OrderModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: OrderModel[]): Options[] => {
        return array.map((item: OrderModel) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

