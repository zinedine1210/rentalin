import axios from "axios";
import { OptionsClient } from "../types/apitypes";

const client = async (urlSuffix: string, options: OptionsClient, abortSignal?: AbortSignal) => {
  try {
    const baseUrl = process.env.BASE_DOMAIN + '/api'
    const secretKey = process.env.SECRET_KEY
    
    const defaultHeaders = {
      'Accept': 'application/json',
      'Secret-Key': secretKey
    }

    const headers = options.formData
      ? { ...defaultHeaders, ...options.headers }
      : { ...defaultHeaders, 'Content-Type': 'application/json', ...options.headers };

    const config = {
      method: options.method || 'get',
      headers,
      signal: abortSignal,
      ...(options?.body && { data: options?.body }),
      ...(options?.formData && { data: options?.formData })
    }
    const response = await axios(`${baseUrl}${urlSuffix}`, config)
    if (response.status === 200) {
      return response.data
    }
    throw response
  } catch (error: any) {
    if(error.hasOwnProperty("code") && error.code == "ERR_CANCELED"){
        return {"status": -1, "data": "Timeout", success: false, message: "Request timeout" }
    }
    return {
      success: false,
      data: null,
      status: 404,
      message: error?.response?.data?.message ?? error.message
    }
  }
}

export default client
