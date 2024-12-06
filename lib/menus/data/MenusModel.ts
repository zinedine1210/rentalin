import { Options } from "@@/src/types/types"

export interface MenusList {
    id: string
    title: string
    url: string | null
    icon: string | null
    flag: string | null
    parent_id: number | null
    pages_id: number | null
    order_position: number | null
    created_at: Date
    updated_at: Date
}

export class MenusModel {
    public id: string
    public title: string
    public url: string | null
    public icon: string | null
    public flag: string | null
    public parent_id: number | null
    public pages_id: number | null
    public order_position: number | null
    public created_at: Date
    public updated_at: Date

    constructor(props: MenusList) {
        this.id = props.id
        this.title = props.title
        this.url = props.url
        this.icon = props.icon
        this.flag = props.flag
        this.parent_id = props.parent_id
        this.pages_id = props.pages_id
        this.order_position = props.order_position
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }

    // Convert array of MenusList to array of MenusModel
    static toDatatableResponse = (array: MenusList[]): MenusModel[] => {
        return array.map((item: MenusList) => {
            return new MenusModel(item)
        })
    }

    // Convert array of MenusList to options format [{ label: '...', value: '...' }]
    static toOptions = (array: MenusList[]): Options[] => {
        return array.map((item: MenusList) => {
            return {
                label: `${item.title}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    static toOptionsFlag = (array: MenusList[]): Options[] => {
        return array.map((item: MenusList) => {
            return {
                label: `${item.flag}`, // You can customize the label as needed
                value: item.flag
            }
        })
    }

    // Convert array of MenusModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: MenusModel[]): Options[] => {
        return array.map((item: MenusModel) => {
            return {
                label: item.title,
                value: item.id
            }
        })
    }
}

