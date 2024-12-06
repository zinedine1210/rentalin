import { PagesType } from "./PagesModel"

export class PagesForm {
    public id: number
    public title: string
    public slug: string
    public content: string | null
    public featured_image: string | null
    public meta_title: string | null
    public meta_description: string | null
    public meta_keywords: string | null
    public seo_heading: string | null
    public canonical_url: string | null
    public is_published: boolean
    public page_order: number | null
    public created_by: number | null

    constructor(props?: PagesType) {
        if(props){
            this.id = props.id
            this.title = props.title
            this.slug = props.slug
            this.content = props.content
            this.featured_image = props.featured_image
            this.meta_title = props.meta_title
            this.meta_description = props.meta_description
            this.meta_keywords = props.meta_keywords
            this.seo_heading = props.seo_heading
            this.canonical_url = props.canonical_url
            this.is_published = props.is_published
            this.page_order = props.page_order
            this.created_by = props.created_by

        }else{
            this.id = null
            this.title = ''
            this.slug = ''
            this.content = ''
            this.featured_image = ''
            this.meta_title = ''
            this.meta_description = ''
            this.meta_keywords = ''
            this.seo_heading = ''
            this.canonical_url = ''
            this.is_published = false
            this.page_order = null
            this.created_by = null
        }
    }

    requiredInput = (target: keyof PagesForm, value: any) => {
        switch (target) {
            case 'title':
                if(value == '') return "Field title is required"
                break;
            case 'slug':
                if(value == '') return  'Field slug is required'
                break
            case 'content':
                if(value == '') return  'Field content is required'
                break
            case 'featured_image':
                if(value == '') return  'Field featured_image is required'
                break
            case 'meta_title':
                if(value == '') return  'Field meta_title is required'
                break
            case 'meta_description':
                if(value == '') return  'Field meta_description is required'
                break
            case 'meta_keywords':
                if(value == '') return  'Field meta_keyword is required'
                break
            case 'seo_heading':
                if(value == '') return  'Field seo_heading is required'
                break
            case 'canonical_url':
                if(value == '') return  'Field canonical_url is required'
                break
            default:
                break;
        }
        return ""
    }
}

