import { OrderType } from "./OrderModel"

export class OrderForm {
    public unit_id: number
    public renter_id: number
    public usage_id: number
    public armada_id: number
    public usage_location: "dalam kota" | "luar kota"
    public delivery_method: "ambil sendiri" | "diantar"
    public delivery_address: string
    public start_date: Date
    public duration: number
    public total_price: number
    public request: string
    public status:'' | 'pending' | 'accepted' | 'completed' | 'rejected' | 'onrent'
    public usage_price: number
    public delivery_price: number

    constructor(props?: OrderType) {
        if(props){
            this.delivery_price = props.delivery_price
            this.usage_price = props.usage_price
            this.status = props.status
            this.unit_id = props.unit_id
            this.renter_id = props.renter_id
            this.armada_id = props.armada_id
            this.usage_location = props.usage_location
            this.delivery_address = props.delivery_address
            this.delivery_method = props.delivery_method
            this.start_date = props.start_date
            this.duration = props.duration
            this.total_price = props.total_price
            this.usage_id = props.usage_id
            this.request = props.request
        }else{
            this.delivery_price = 0
            this.usage_price = 0
            this.status = 'pending'
            this.unit_id = 0
            this.renter_id = 0
            this.armada_id = 0
            this.usage_location = 'dalam kota'
            this.delivery_address = ''
            this.delivery_method = 'ambil sendiri'
            this.start_date = new Date()
            this.duration = 0
            this.total_price = 0
            this.usage_id = 0
            this.request = ''
        }
    }

    requiredInput = (target: keyof OrderForm, value: any) => {
        switch (target) {
            case 'delivery_price':
                if(value == 0) return "Field delivery price is required"
                break;
            case 'usage_price':
                if(value == 0) return "Field usage price is required"
                break;
            case 'status':
                if(value == '') return "Field status is required"
                break;
            default:
                break;
        }
        return ""
    }
}

