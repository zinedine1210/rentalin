import { Options } from "@@/src/types/types"

export interface PartnerType {
    id: string
    name: string
    phone: string
    email: string
    address: string
    created_at: string
    updated_at: string
}

export class PartnerModel {
    public id: string
    public name: string
    public phone: string
    public email: string
    public address: string
    public address_substring: string
    public created_at: string
    public updated_at: string

    constructor(props: PartnerType) {
        this.id = props.id
        this.address = props.address
        this.email = props.email
        this.name = props.name
        this.phone = props.phone
        this.created_at = props.created_at
        this.updated_at = props.updated_at
        this.address_substring = props.address.length > 20 ? props.address.substring(0, 20) + "..." : props.address
    }

    // Convert array of PartnerType to array of PartnerModel
    static toDatatableResponse = (array: PartnerType[]): PartnerModel[] => {
        return array.map((item: PartnerType) => {
            return new PartnerModel(item)
        })
    }

    // Convert array of PartnerType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: PartnerType[]): Options[] => {
        return array.map((item: PartnerType) => {
            return {
                label: `${item.name}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of PartnerModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: PartnerModel[]): Options[] => {
        return array.map((item: PartnerModel) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

