import React from "react"
export interface InitTopUpType {
    trans_id: string
    id: string
    total_amount: number
    currency: "IDR" | string
    org_id: string
    status: 'INITIALIZE' | 'PENDING' | 'SETTLE' | 'CANCEL'
}

export interface FilterKey {
    value: string
    label: string
    type: 'input_text' | 'select' | 'input_date'
    options?: Options[]
}

export interface StateType<T> {
    isLoading: boolean,
    headers: TableHeader[],
    select?: number[],
    filter: FilterOptions[],
    filterKey?: FilterKey[]
    page: number,
    display: number,
    range: {[key: string]: any},
    columns: {[key: string]: any},
    data: T[] | null,
    allData: T[],
    totalCount: number,
    payload: FilterOptions[],
    groupBy?: string
    onGet: (newObj: StateType<T>) => void,
    bulk?: DropdownOptions[]
    bulkButton?: DropdownOptions[]
    componentMobile: (item: any, index: number) => React.ReactNode
}

export interface TableHeader {
    label: string
    property: string
    sort?: string
    cssRow?: string
    copy?: string
    cssHead?: string
    status?: any | {[key: string]: string},
    images?: boolean
}

export interface DialList {
    code: string
    dial_code: string
    name: string
}


export interface DropdownOptions {
    name: string
    icon?: string
    customCss?: string
    action: (id: number | string, index: number) => void
}

export interface Options {
    label: string,
    value: any,
    disabled?: boolean
}

export interface FilterOptions {
    key: string,
    value: any
}

export interface SimulationChat {
    answer: string
    question: string    
}

export type UrlEnum = "/unanswered_model/UnansweredStatus" | "/service_model/ServiceType" | "/service_model/ServiceStatus" | "/ab_test_model/ABTestStatus"