import { Options } from "@@/src/types/types";

export interface PagesType {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    seo_heading: string | null;
    canonical_url: string | null;
    is_published: boolean;
    page_order: number | null;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export class PagesModel {
    public id: number;
    public title: string;
    public slug: string;
    public content: string | null;
    public featured_image: string | null;
    public meta_title: string | null;
    public meta_description: string | null;
    public meta_keywords: string | null;
    public seo_heading: string | null;
    public canonical_url: string | null;
    public is_published: boolean;
    public page_order: number | null;
    public keywords: string[]
    public created_by: number;
    public created_at: Date;
    public updated_at: Date;

    constructor(props: PagesType) {
        this.id = props.id;
        this.title = props.title;
        this.slug = props.slug;
        this.content = props.content;
        this.featured_image = props.featured_image;
        this.meta_title = props.meta_title;
        this.meta_description = props.meta_description;
        this.meta_keywords = props.meta_keywords;
        this.keywords = props.meta_keywords.split(',')
        this.seo_heading = props.seo_heading;
        this.canonical_url = props.canonical_url;
        this.is_published = props.is_published;
        this.page_order = props.page_order;
        this.created_by = props.created_by;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
    }

    // Convert array of PagesType to array of PagesModel
    static toDatatableResponse = (array: PagesType[]): PagesModel[] => {
        return array.map((item: PagesType) => new PagesModel(item));
    };

    // Convert array of PagesType to options format [{ label: '...', value: '...' }]
    static toOptions = (array: PagesType[]): Options[] => {
        return array.map((item: PagesType) => ({
            label: item.title,
            value: item.id
        }));
    };

    // Convert array of PagesModel to options format [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: PagesModel[]): Options[] => {
        return array.map((item: PagesModel) => ({
            label: item.title,
            value: item.title,
        }));
    };

    // Filter published pages
    static filterPublished = (array: PagesType[]): PagesType[] => {
        return array.filter((item: PagesType) => item.is_published);
    };
}
