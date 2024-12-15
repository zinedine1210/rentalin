import { Options } from "@@/src/types/types"

export interface CategoryType {
    id: string
    title: string
    icon: string
    created_at: string
    updated_at: string
}

export class CategoryModel {
    public id: string
    public title: string
    public icon: string
    public created_at: string
    public updated_at: string

    constructor(props: CategoryType) {
        this.id = props.id
        this.title = props.title
        this.icon = props.icon
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }

    // Convert array of CategoryType to array of CategoryModel
    static toDatatableResponse = (array: CategoryType[]): CategoryModel[] => {
        return array.map((item: CategoryType) => {
            return new CategoryModel(item)
        })
    }

    // Convert array of CategoryType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: CategoryType[]): Options[] => {
        return array.map((item: CategoryType) => {
            return {
                label: `${item.title}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of CategoryModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: CategoryModel[]): Options[] => {
        return array.map((item: CategoryModel) => {
            return {
                label: item.title,
                value: item.id
            }
        })
    }
}

