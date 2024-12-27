import { Options } from "@@/src/types/types";
import { formatDateData } from "@@/src/utils/script";

// Interface untuk tipe Order
export interface OrderType {
    id: number;
    unit_id: number;
    renter_id: number;
    usage_id: number;
    armada_id: number;
    usage_location: "dalam kota" | "luar kota";
    usage_price: number;
    delivery_method: "ambil sendiri" | "diantar";
    delivery_address: string;
    delivery_price: number;
    start_date: Date;
    duration: number;
    total_price: number;
    request: string;
    status: "pending" | "accepted" | "completed" | "rejected" | "onrent";
    created_at: Date;
    file_id: number;
    file_name: string;
    file_path: string;
    file_type: string;
    file_created_by: null | number;
    file_uploaded_at: Date;
    unit_name: string;
    armada_location: string;
    armada_embed_link: string;
    usage_name: string
    usage_price_multiplier: string
    usage_operator_type: string
}

// Model untuk Order
export class OrderModel {
    public id: number;
    public unit_id: number;
    public renter_id: number;
    public usage_id: number;
    public armada_id: number;
    public usage_location: string;
    public usage_price: number;
    public delivery_method: string;
    public delivery_address: string;
    public delivery_price: number;
    public start_date: Date;
    public duration: number;
    public total_price: number;
    public request: string;
    public status: string;
    public created_at: Date;
    public file_id: number;
    public file_name: string;
    public file_path: string;
    public file_type: string;
    public file_created_by: null | number;
    public file_uploaded_at: Date;
    public unit_name: string;
    public armada_location: string;
    public armada_embed_link: string;
    public delivery_address_substring: string;
    public usage_name: string
    public usage_price_multiplier: string
    public usage_operator_type: string

    public startDateFormat: string
    public endDateFormat: string

    constructor(props: OrderType) {
        this.id = props.id;
        this.unit_id = props.unit_id;
        this.renter_id = props.renter_id;
        this.usage_id = props.usage_id;
        this.armada_id = props.armada_id;
        this.usage_location = props.usage_location;
        this.usage_price = props.usage_price;
        this.delivery_method = props.delivery_method;
        this.delivery_address = props.delivery_address;
        this.delivery_price = props.delivery_price;
        this.start_date = props.start_date;
        this.duration = props.duration;
        this.total_price = props.total_price;
        this.request = props.request;
        this.status = props.status;
        this.created_at = props.created_at;
        this.file_id = props.file_id;
        this.file_name = props.file_name;
        this.file_path = props.file_path;
        this.file_type = props.file_type;
        this.file_created_by = props.file_created_by;
        this.file_uploaded_at = props.file_uploaded_at;
        this.unit_name = props.unit_name;
        this.armada_location = props.armada_location;
        this.armada_embed_link = props.armada_embed_link;
        this.startDateFormat = formatDateData(props.start_date.toString())
        const endDate = new Date(new Date(props.start_date).setDate(new Date(props.start_date).getDate() + Number(props.duration))) 
        this.endDateFormat = formatDateData(endDate.toString())
        this.usage_name = props.usage_name
        this.usage_location = props.usage_location
        this.usage_operator_type = props.usage_operator_type

        // Membatasi panjang alamat untuk tampilan
        this.delivery_address_substring =
            props.delivery_address.length > 20
                ? props.delivery_address.substring(0, 20) + "..."
                : props.delivery_address;
    }

    // Convert array of OrderType ke array of OrderModel
    static toDatatableResponse = (array: OrderType[]): OrderModel[] => {
        return array.map((item: OrderType) => new OrderModel(item));
    };

    // Convert array of OrderType ke format options [{ label: '...', value: '...' }]
    static toOptions = (array: OrderType[]): Options[] => {
        return array.map((item: OrderType) => ({
            label: `${item.unit_name} - ${item.status}`, // Label bisa dikustomisasi
            value: item.id,
        }));
    };

    // Convert array of OrderModel ke format options [{ label: '...', value: '...' }]
    static toOptionsFromModel = (array: OrderModel[]): Options[] => {
        return array.map((item: OrderModel) => ({
            label: `${item.unit_name} - ${item.status}`,
            value: item.id,
        }));
    };

    // Mengambil file terkait
    getFileDetails = (): { name: string; path: string; type: string } => {
        return {
            name: this.file_name,
            path: this.file_path,
            type: this.file_type,
        };
    };
}
