import { PartnerType } from "./PartnerModel"


export class PartnerForm {
    public name: string
    public phone: string
    public email: string
    public address: string

    constructor(props?: PartnerType) {
        if(props){
            this.name = props.name
            this.phone = props.phone
            this.email = props.email
            this.address = props.address
        }else{
            this.name = ''
            this.address = ''
            this.email = ''
            this.phone = ''
        }
    }

    requiredInput = (target: keyof PartnerForm, value: any) => {
        switch (target) {
            case 'name':
                if(value == '') return "Field title is required"
                break;
            case 'phone':
                if(value == '') return "Field title is required"
                break;
            case 'address':
                if(value == '') return "Field title is required"
                break;
            case 'email':
                if(value == '') return "Field title is required"
                break;
            default:
                break;
        }
        return ""
    }
}

