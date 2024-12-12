import { Options } from "@@/src/types/types"

export interface ArmadaType {
    id: string
    name: string
    location: string
    location_summary: string
    created_at: string
    updated_at: string
}

export class ArmadaModel {
    public id: string
    public name: string
    public location: string
    public location_summary: string
    public created_at: string
    public updated_at: string

    constructor(props: ArmadaType) {
        this.id = props.id
        this.name = props.name
        this.location = props.location
        this.location_summary = props.location_summary
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }

    // Convert array of ArmadaType to array of ArmadaModel
    static toDatatableResponse = (array: ArmadaType[]): ArmadaModel[] => {
        return array.map((item: ArmadaType) => {
            return new ArmadaModel(item)
        })
    }

    // Convert array of ArmadaType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: ArmadaType[]): Options[] => {
        return array.map((item: ArmadaType) => {
            return {
                label: `${item.location_summary}`, // You can customize the label as needed
                value: item.id
            }
        })
    }
    // Convert array of ArmadaModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: ArmadaModel[]): Options[] => {
        return array.map((item: ArmadaModel) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
}

