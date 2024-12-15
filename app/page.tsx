import { ArmadaModel, ArmadaType } from "@@/lib/armada/data/ArmadaModel"
import { CategoryModel, CategoryType } from "@@/lib/category/data/CategoryModel"
import MainView from "@@/lib/renter/view/MainView"
import MainView2 from "@@/lib/renter/view/MainView2"
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI"
import { Options } from "@@/src/types/types"

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
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const optionsCategories = await getCategories()
  const optionsArmadas = await getArmadas()
  let data = {
    categories: optionsCategories,
    armadas: optionsArmadas
  }
  return <MainView2 data={data}/>
}

export default Page
