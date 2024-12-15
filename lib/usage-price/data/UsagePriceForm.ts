import { REPL_MODE_SLOPPY } from "repl"
import { UsagePriceType } from "./UsagePriceModel"

export class UsagePriceForm {
    public name: string
    public description: string
    public min_order: number
    public operator_type: '-' | '*' | '+' | '/' | '%' | ''
    public status: 'active' | 'inactive'
    public price_multiplier: number


    constructor(props?: UsagePriceType) {
        if(props){
            this.name = props.name
            this.description = props.description
            this.min_order = props.min_order
            this.operator_type = props.operator_type
            this.status = props.status
            this.price_multiplier = props.price_multiplier
        }else{
            this.name = ''
            this.description = ''
            this.min_order = 0
            this.operator_type = ''
            this.status = 'active'
            this.price_multiplier = 0
        }
    }

    requiredInput = (target: keyof UsagePriceForm, value: any) => {
        switch (target) {
            case 'name':
                if(value == '') return "Field name is required"
                break;
            case 'description':
                if(value == '') return "Field description is required"
                break;
            case 'min_order':
                if(value == 0) return "Field minimal order is required"
                break;
            case 'operator_type':
                if(value == '') return "Field operator type is required"
                break;
            case 'status':
                if(value == '') return "Field status is required"
                break;
            case 'price_multiplier':
                if(value == 0) return "Field status is required"
                break;
            default:
                break;
        }
        return ""
    }
}

