export interface OptionsClient {
    body ?: string | any,
    method?: string,
    headers?: {[key: string]: any},
    formData ?: FormData
}

export interface ResponseData {
    success: boolean,
    message: string,
    status: number | string,
    data: any
}