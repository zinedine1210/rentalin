import { ArmadaType } from "./ArmadaModel"
export class ArmadaForm {
    public name: string
    public location: string
    public location_summary: string

    constructor(props?: ArmadaType) {
        if(props){
            this.name = props.name
            this.location = props.location
            this.location_summary = props.location_summary
        }else{
            this.name = ''
            this.location = ''
            this.location_summary = ''
        }
    }

    requiredInput = (target: keyof ArmadaForm, value: any) => {
        switch (target) {
            case 'name':
                if(value == '') return "Field title is required"
                break;
            case 'location':
                if(value == '') return "Field title is required"
                break;
            case 'location_summary':
                if(value == '') return "Field title is required"
                break;
            default:
                break;
        }
        return ""
    }
}

