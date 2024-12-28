import { TableHeader } from "@@/src/types/types"
import { statusOrders, usagePriceStatus } from "./status"

export const tableDial: TableHeader[] = [
    { label: "CODE", property: "code", sort: "code", copy:"code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "DIAL", property: "dial_code", sort: "dial_code", copy:"dial_code", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "NAME", property: "name", sort: "name", copy:"name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]


export const tableClient: TableHeader[] = [
    { label: "Title", property: "title", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "File", property: "file_path", images: true, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]

export const tableCategories: TableHeader[] = [
    { label: "Title", property: "title", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]
export const tableUsagePrice: TableHeader[] = [
    { label: "Name", property: "name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Description", property: "description", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Price Multiplier", property: "price_multiplier", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Operator", property: "operator_type", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Status", property: "status", status: usagePriceStatus, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]
export const tablePartner: TableHeader[] = [
    { label: "Name", property: "name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Phone", property: "phone", copy: 'phone', cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Email", property: "email", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Address", property: "address_substring", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]
export const tableOrder: TableHeader[] = [
    { label: "Unit Name", property: "unit_name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Delivery Method", property: "phone", copy: 'phone', cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Status", property: "status", status: statusOrders, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Usage Location", property: "usage_location", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Created At", property: "createdAtFormat", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },

]
export const tableUnit: TableHeader[] = [
    { label: "Name", property: "name_unit", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Description", property: "description", copy: 'phone', cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Price", property: "price", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Condition", property: "condition", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Image", property: "file_path", images: true, cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]
export const tableArmada: TableHeader[] = [
    { label: "Name", property: "name", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Location", property: "location", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Location Summary", property: "location_summary", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
]
export const tableMenus: TableHeader[] = [
    { label: "Order", property: "order_position", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "URL", property: "url", copy: 'url', cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Title", property: "title", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Flag", property: "flag", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Parent", property: "parent_id", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]
export const tablePages: TableHeader[] = [
    { label: "Title", property: "title", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Slug", property: "slug", copy: 'slug', cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Title", property: "title", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" },
    { label: "Content", property: "content", cssRow: "font-medium text-gray-900 whitespace-nowrap dark:text-white" }
]



export const displayListNumber = [
    { value :5, label:5 },
    { value :10, label:10 },
    { value :20, label:20 },
    { value :30, label:30 },
    { value :40, label:40 },
    { value :50, label:50 },
    { value :60, label:60 },
    { value :70, label:70 }
  ]