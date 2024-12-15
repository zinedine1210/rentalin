import { CategoryType } from "./CategoryModel"

export class CategoryForm {
    public title: string
    public icon: string

    constructor(props?: CategoryType) {
        if(props){
            this.title = props.title
            this.icon = props.icon

        }else{
            this.title = ''
            this.icon = ''
        }
    }

    requiredInput = (target: keyof CategoryForm, value: any) => {
        switch (target) {
            case 'title':
                if(value == '') return "Field title is required"
                break;
            case 'icon':
                if(value == '') return "Field icon is required"
                break;
            default:
                break;
        }
        return ""
    }
}

