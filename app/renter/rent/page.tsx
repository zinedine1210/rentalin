'use server'
import { ArmadaModel, ArmadaType } from "@@/lib/armada/data/ArmadaModel"
import { CategoryModel, CategoryType } from "@@/lib/category/data/CategoryModel"
import MainView2 from "@@/lib/renter/view/MainView2"
import { UsagePriceType } from "@@/lib/usage-price/data/UsagePriceModel"
import { verifyToken } from "@@/middleware"
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI"
import { Options } from "@@/src/types/types"
import { cookies } from "next/headers"

type Props = {
  params: Promise<{ }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const getCategories= async (): Promise<Options[]> => {
  const result: ApiResponse<TableResponse<CategoryType[]>> = await fetchClient('GET', '/data/categories')
  const responseData = result.data
  if(result.success){
    const toOptions: Options[] = CategoryModel.toOptions(responseData.data)
    return toOptions
  }else{
    return []
  }
}
const getUsagePrice = async (): Promise<UsagePriceType[]> => {
  const result: ApiResponse<TableResponse<UsagePriceType[]>> = await fetchClient('GET', '/data/usage-price?status=active')
  const responseData = result.data
  if(result.success){
    const toModel: UsagePriceType[] = responseData.data
    return toModel
  }else{
    return []
  }
}
const getArmadas= async (): Promise<Options[]> => {
  const result: ApiResponse<TableResponse<ArmadaType[]>> = await fetchClient('GET', '/data/armadas')
  const responseData = result.data
  if(result.success){
    const toOptions: Options[] = ArmadaModel.toOptions(responseData.data)
    return toOptions
  }else{
    return []
  }
}

export interface DataOptions {
  categories: Options[]
  armadas: Options[]
  usagePrice: UsagePriceType[]
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const optionsCategories = await getCategories()
  const optionsArmadas = await getArmadas()
  const getUP = await getUsagePrice()
  let data = {
    categories: optionsCategories,
    armadas: optionsArmadas,
    usagePrice: getUP
  }
  const token = cookies().get('auth_token');
  const decodedUserVerify = token ? await verifyToken(token.value) : null;

  return (
    <section className="relative">
        <MainView2 data={data} authLogin={decodedUserVerify.userId as string}/>
    </section>
  )
}

export default Page
