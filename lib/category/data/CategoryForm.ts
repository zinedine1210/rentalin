import { CategoryType } from "./CategoryModel"

export class CategoryForm {
    public title: string

    constructor(props?: CategoryType) {
        if(props){
            this.title = props.title
        }else{
            this.title = ''
        }
    }

    requiredInput = (target: keyof CategoryForm, value: any) => {
        switch (target) {
            case 'title':
                if(value == '') return "Field title is required"
                break;
            default:
                break;
        }
        return ""
    }
}

