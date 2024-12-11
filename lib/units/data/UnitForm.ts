import { CloudinaryType, UploadType } from "@@/lib/uploads/data/UploadModel"
import { UnitType } from "./UnitModel"


export class UnitForm {
    public id: number
    public category_id: number
    public partner_id: number
    public name: string
    public file_picture: number
    public file_form: UploadType | null
    public description: string
    public price: number
    public condition: string
    public isAvailable: boolean | null

    constructor(props?: UnitType) {
        if(props){
            this.name = props.name
            this.id = props.id
            this.category_id = props.category_id
            this.file_picture = 0
            this.file_form = {
                id: props.file_picture_id,
                file_name: props.file.file_name,
                file_path: props.file.file_path,
                file_type: props.file.file_type,
                public_id: props.file.public_id
            }
            this.description = props.description
            this.price = props.price
            this.condition = props.condition
            this.isAvailable = props.isAvailable == 0 ? false: true
            this.partner_id = props.partner_id
        }else{
            this.name = ''
            this.category_id = 0
            this.partner_id = 0
            this.file_picture = 0
            this.file_form = {
                id: 0,
                file_name: '',
                file_path: '',
                file_type: '',
                public_id: ''
            }
            this.description = ''
            this.price = 0
            this.condition = ''
            this.isAvailable = null
            this.id = 0
        }
    }

    requiredInput = (target: keyof UnitForm, value: any) => {
        switch (target) {
            case 'name':
                if(value == '') return "Field name is required"
                break;
            case 'description':
                if(value == '') return "Field description is required"
                break;
            case 'condition':
                if(value == '') return "Field condition is required"
                break;
            case 'category_id':
                if(value == 0) return "Field category is required"
                break;
            case 'partner_id':
                if(value == 0) return "Field partner is required"
                break;
            case 'file_form':
                if(value == null) return "Field file is required"
                break;
            case 'price':
                if(value == 0) return "Field price is required"
                break;
            case 'isAvailable':
                if(value == null) return "Field is required"
                break;
            default:
                break;
        }
        return ""
    }
}

