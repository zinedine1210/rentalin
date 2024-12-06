import { ClientType } from "./ClientModel"

export class ClientForm {
    public title: string
    public file_id: string
    public file: File[] = []
    public filesUpdate: string[]

    constructor(props?: ClientType) {
        if(props){
            this.title = props.title
            this.file_id = props.file_id
            this.filesUpdate = [props.file.file_path]
        }else{
            this.title = ''
            this.file_id = ''
            this.filesUpdate = []
        }
    }

    requiredInput = (target: keyof ClientForm, value: any) => {
        switch (target) {
            case 'title':
                if(value == '') return "Field title is required"
                break;
            case 'file':
                if(value == null) return  'Field File is required'
                break
            default:
                break;
        }
        return ""
    }
}

