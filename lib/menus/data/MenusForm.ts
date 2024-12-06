import { MenusList } from "./MenusModel"

export class MenusForm {
    public id: string
    public title: string
    public url: string | null
    public icon: string | null
    public flag: string | null
    public parent_id: number | null
    public pages_id: number | null
    public order_position: number | null

    constructor(props?: MenusList) {
        if(props){
            this.id = props.id
            this.title = props.title
            this.url = props.url
            this.icon = props.icon
            this.flag = props.flag
            this.parent_id = props.parent_id
            this.pages_id = props.pages_id
            this.order_position = props.order_position
        }else{
            this.id = ''
            this.title = ''
            this.url = ''
            this.icon = ''
            this.flag = ''
            this.parent_id = 0
            this.pages_id = 0
            this.order_position = 0
        }
    }

    requiredInput = (target: keyof MenusForm, value: any) => {
        switch (target) {
            case 'title':
                if(value == '') return "Field title is required"
                break;
            case 'flag':
                if(value == '') return  'Field title is required'
                break
            case 'url':
                if(value == '') return  'Field url / route page is required'
                break
            case 'order_position':
                if(!value) return  'Field title is required'
                if(value < 0) return 'Field must up from 0'
                break
            case 'pages_id':
                if(value == 0) return 'Field Pages ID is required'
                break;
            default:
                break;
        }
        return ""
    }
}

