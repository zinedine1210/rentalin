import { FilterOptions, Options } from "../types/types"

export const trainingTypeStatus = {
    '1': 'Upload',
    '2': 'Website',
    '3': 'Scratch'
}

export const trainingColorStatus = {
    'Upload': '#fcba03',
    'Website': '#ff1900',
    'Scratch': '#ff00bf'
}

export const trainingStatus = {
    'IN_QUEUE': '#fcba03',
    'ACTIVE': '#32a852',
    'INACTIVE': '#ff1900'
}

export const channelType = {
    'WHATSAPP': '#22c55e',
    'WHATAPPS': '#22c55e'
}

export const topUpStatus = {
    'INITIALIZE': '#3b82f6',
    'PENDING': '#f97316',
    'SETTLE': '#10b981',
    'CANCEL': '#ef4444'
}

export const serviceTemplateType = {
    'QNA': '#ff00bf',
    'EVENT': '#fcba03',
}

export const usagePriceStatus = {
    'active': '#32a852',
    'stop': '#ff1900'
}

export const statusOrders = {
    'pending': '#f97316',
    'accepted': '#32a852',
    'completed': '#10b981',
    'rejected': '#ef4444',
    'onrent': '#3b82f6',
    'payment': '#ff00bf'
}

export const statusDeliveryMethod = {
    'diantar': '#f97316',
    'ambil sendiri': '#32a852'
}
export const statusUsageLocation = {
    'dalam kota': '#f97316',
    'luar kota': '#32a852'
}


export const getFromOptions = (type: {[key: string]: string}): Options[]  => {
    let arrayOptions: Options[] = []
    Object.entries(type).map((item, index) => {
        arrayOptions.push({
            value: item[0],
            label: item[0]
        })
    })
    return arrayOptions
}
export const channelTypeOptions = getFromOptions(channelType)
export const statusOptions = getFromOptions(trainingStatus)
export const serviceOptions = getFromOptions(serviceTemplateType)
export const trainingstatusOptions = statusOptions