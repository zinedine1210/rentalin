import { getCookies, setCookies } from "@@/app/actions";
import axios, { AxiosError } from "axios"
import { Notify } from "../utils/script";
import client from "../client/apiClient";
import { MenusList } from "@@/lib/menus/data/MenusModel";
let protocol = '';
let host = '';
let port = '';
let finalHostname = '';
let finalBaseDomainAPI = ''

if (typeof window === 'object') {
    // Jika dijalankan di lingkungan browser
    protocol = window.location.protocol;
    port = window.location.port
    host = window.location.hostname;
    finalHostname = `${protocol}//${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
} else {
    port = process.env.PORT ?? ''
    protocol = process.env.PROTOCOL ?? ''
    host = process.env.HOST ?? ''
    finalHostname = `${protocol}://${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
}

export const baseDomain: string = finalHostname
const baseURL: string = (process.env.BASE_DOMAIN ?? baseDomain) + '/api';

export interface Menu {
    id: number;
    route: string;
    label: string;
    icon?: string;
    parent?: string;
    flag: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface TableResponse<T> {
    data: T,
    pagination: {
        count: number
        totalPage: number
        currentPage: number
        pageSize: number
    }
}

export type Method = 'GET' | 'PUT' | 'POST' | 'DELETE'

export const tryLogin = async (payload: any): Promise<ApiResponse<any>> => {
    try {
        const result = await axios.post(`${baseURL}/auth/login`, payload);
        const responseData = result.data;
        
        if (responseData.success) {
            if (responseData.data.auth_token) { // jika ada tokennya
                const currentDate = new Date();
                currentDate.setHours(currentDate.getHours() + 5); // set expire selama 5 jam
                const formattedDate = currentDate.toISOString();

                setCookies('auth_token', responseData.data.auth_token, formattedDate);
                localStorage.setItem('auth_info', payload.username)
            }

            const clientMenus: ApiResponse<TableResponse<MenusList[]>> = await fetchClient('GET', `/data/menus`);
            const responseClientData = clientMenus.data as TableResponse<MenusList[]>
            localStorage.setItem('client_menus', JSON.stringify(responseClientData.data));
        } else {
            Notify(responseData.message, 'error', 5000);
        }

        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || "Authentication failed.";

            return {
                data: null,
                success: false,
                message
            }
        } else {
            Notify("Unexpected error occurred.", "error", 5000);
        }
        return {
            success: false,
            data: null,
            message: error.response.data?.message || 'Authentication failed'
        };
    }
};


export const tryLogout = async () => {
    const result = await axios.post(`${baseURL}/auth/logout`, {})
    const responseData = result.data
    if(!responseData.success) {
        Notify(responseData.message ?? 'Something went wrong', 'error', 3000)
        responseData.data = responseData.data ?? []
    }
    return responseData
}

export const fetchClient = async <T>(method: Method, route: string, payload?: any): Promise<ApiResponse<T>> => {
    try {
        let timeoutId;
        const timoutInterval = 60000; // selama 1 menit tidak ada respon
        let abortSignal = AbortSignal.timeout(timoutInterval)
        const token = await getCookies('auth_token')

        const requestPromise = await client(route, {
            method,
            headers: {
              Authorization: 'Bearer '+ token?.value
            },
            ...(payload && { body: payload })
        }, abortSignal)

        const timeoutPromise = new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
                reject({ success: false, data: 'Request timeout', message: "Request timeout" });
            }, timoutInterval);
        });

        const responseData: ApiResponse<any> = await Promise.race([requestPromise, timeoutPromise]);
        clearTimeout(timeoutId);

        // Validasi respons sukses
        if (responseData.success) {
            return responseData;
        }

        // Jika respons tidak sukses, tangani error dan kembalikan data default
        Notify(responseData.message ?? "Unable to fetch data", "error", 3000);
        return {
            success: false,
            message: responseData.message ?? "Invalid response format",
            data: [] as T,  // Kembalikan array kosong atau nilai default untuk T
        };
    } catch (error) {
        let errorMessage: string = 'Failed to fetch data due to a network error.'
        // Penanganan kesalahan jaringan atau server
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiResponse<null>>;
            const status = axiosError.response?.status;
            const message =
                axiosError.response?.data?.message || axiosError.message || "An unexpected error occurred";
            
            if (status === 401) {
                errorMessage = "Unauthorized access. Please log in again."
            } else if (status === 403) {
                errorMessage = "Access forbidden. You don't have the required permissions."
            } else if (status === 404) {
                errorMessage = "Data not found. Please contact support."
            } else if (status === 503) {
                errorMessage = "Service unavailable. Please try again later."
            } else {
                errorMessage = `Error ${status}: ${message}`
            }
        } else {
            errorMessage = "Unexpected error occurred. Please try again."
        }

        return {
            success: false,
            message: errorMessage,
            data: [] as T, // Kembalikan array kosong atau nilai default untuk T
        };
    }
};


export const uploadFile = async <T>(formData: FormData): Promise<ApiResponse<T>> => {
    try {
        let timeoutId;
        const timoutInterval = 60000; // selama 1 menit tidak ada respon
        let abortSignal = AbortSignal.timeout(timoutInterval)
        const token = await getCookies('auth_token')

        const requestPromise = await client('/data/upload', {
            method: "POST",
            headers: {
              Authorization: 'Bearer '+ token?.value
            },
            formData
        }, abortSignal)

        const timeoutPromise = new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
                reject({ success: false, data: null, message: "Request Timeout" });
            }, timoutInterval);
        });

        const responseData: ApiResponse<any> = await Promise.race([requestPromise, timeoutPromise]);
        clearTimeout(timeoutId);

        // Validasi respons sukses
        if (responseData.success) {
            return responseData;
        }

        // Jika respons tidak sukses, tangani error dan kembalikan data default
        Notify(responseData.message ?? "Unable to upload file", "error", 3000);
        return {
            success: false,
            message: responseData.message ?? "Invalid response format",
            data: [] as T,  // Kembalikan array kosong atau nilai default untuk T
        };
    } catch (error) {
        let errorMessage: string = 'Failed to fetch data due to a network error.'
        // Penanganan kesalahan jaringan atau server
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiResponse<null>>;
            const status = axiosError.response?.status;
            const message =
                axiosError.response?.data?.message || axiosError.message || "An unexpected error occurred";
            
            if (status === 401) {
                errorMessage = "Unauthorized access. Please log in again."
            } else if (status === 403) {
                errorMessage = "Access forbidden. You don't have the required permissions."
            } else if (status === 404) {
                errorMessage = "Data not found. Please contact support."
            } else if (status === 503) {
                errorMessage = "Service unavailable. Please try again later."
            } else {
                errorMessage = `Error ${status}: ${message}`
            }
        } else {
            errorMessage = "Unexpected error occurred. Please try again."
        }

        return {
            success: false,
            message: errorMessage,
            data: [] as T, // Kembalikan array kosong atau nilai default untuk T
        };
    }
};
