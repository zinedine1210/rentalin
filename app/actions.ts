'use server'
import { cookies } from 'next/headers'
 
export async function deleteCookies(data: any) {
  cookies().delete('name')
}

export async function setCookies(name: string, data: string, duration: string ){
  const serverrun = process.env.SERVER == 'production' ? true: false
  const expiresDate = new Date(duration)
  cookies().set({ name, value: data, expires: expiresDate })
}

export async function getCookies(name: string){
  return cookies().get(name)
}