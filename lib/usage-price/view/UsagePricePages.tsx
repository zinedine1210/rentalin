'use client'

import { tableCategories, tableClient, tableMenus, tableUsagePrice } from "@@/src/constant/table";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { FilterOptions, StateType } from "@@/src/types/types";
import { useCallback, useEffect } from "react";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import Datatable from "@@/app/components/Datatable/Datatable";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { IconsCollection } from "@@/src/constant/icons";
import { useRouter } from "next/navigation";
import { Notify } from "@@/src/utils/script";
import { UsagePriceModel, UsagePriceType } from "../data/UsagePriceModel";

export default function UsagePricePages() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'usage_price'
  const windowWidth = useWindowSize();
  const router = useRouter()

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<UsagePriceType> = {
      isLoading: false,
      headers: tableUsagePrice,
      filter: [],
      filterKey: [
        {
          value: 'name',
          label: 'Name',
          type: 'input_text'
        },
        {
          value: 'description',
          label: 'Description',
          type: 'input_text'
        },
        {
          value: 'status',
          label: 'Status',
          options: [{ label: 'Active', value: 'active' }, { label: 'Stop', value: 'stop' }],
          type: 'select'
        }
      ],
      page: 1,
      display: 5,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: null,
      allData: [],
      totalCount: 0,
      payload: [],
      bulk: [
        {
          action: (id, index) => {
            router.push(`/admin/usage-price/view/${id}`)
          },
          name: 'View',
          icon: IconsCollection.eye
        },
        {
          action: async (id, index) => {
            const result: ApiResponse<{ id: string }> = await fetchClient('DELETE', '/data/usage-price/' + id)
            if(result.success){
              Notify('Delete successfully', 'success', 3000)
              setState((prev: any) => {
                prev[statename].onGet(prev[statename])
                return prev
              })
            }
          },
          name: 'Delete',
          icon: IconsCollection.trash,
          customCss: 'hover:bg-red-200 text-red-500'
        }
      ],
      groupBy: "created_at",
      onGet: async (newObj: StateType<UsagePriceType>) => {
        setState((prev) => {
          return {
            ...prev,
            [statename]: {
              ...prev[statename],
              isLoading: true
            }
          }
        })
        const dataState = newObj
        const route: string = '/data/usage-price'
        let parameter = `?page=${dataState.page}&limit=${dataState.display}`
        dataState.filter.map((fil: FilterOptions) => {
            parameter = parameter + `&${fil.key}=${fil.value}`
        })
        const result: ApiResponse<TableResponse<UsagePriceType[]>> = await fetchClient('GET', route + parameter)
        const responseData: TableResponse<UsagePriceType[]> = result.data
        const value: UsagePriceModel[] = UsagePriceModel.toDatatableResponse(responseData.data)
        setState((prev: any) => {
          return {
            ...prev,
            [statename]: {
              ...prev[statename],
              ...(prev[statename].data ? { data: { ...prev[statename].data, [dataState.page]: value } }: { data: { [dataState.page]: value } }),
              isLoading: false,
              totalCount: responseData.pagination.count,
              page: responseData.pagination.currentPage,
              display: responseData.pagination.pageSize
            }
          }
        })
      },
      componentMobile: (item, index) => {
        return "asajskajskajskjk"
      }
    }
    setState((prev: any) => ({
      ...prev,
      [statename]: defaultValue
    }))
    setState((prev: any) => {
      prev[statename].onGet(prev[statename])
      return prev
    })
  }, [setState, router])

  useEffect(() => {
    if(!state?.[statename]){
      initialMount()
    }
  }, [initialMount, state])

  const DatatableView = () => {
    if(windowWidth < 820 && windowWidth !== 0){
      return (
        <div className="w-full md:hidden h-full overflow-y-hidden">
          <DatatableMobile statename={statename} />
        </div>
      )
    }else{
      return (
        <div className="hidden md:block pb-20">
          <Datatable statename={statename} />
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="pb-5 px-5">
        <h1 className="font-bold text-xl border-l-4 border-primary-500 px-2">Usage Price / Promo</h1>
        <p className="text-sm mt-2">Disini buat nambahin promo rentnya, yang statusnya active maka itu yang sedang berlaku</p>


        <div className="flex md:items-center md:justify-between mt-5">
          <div className="w-auto md:w-1/2">
            <FilterDatatable statename={statename} />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
            <button className="btn-secondary" onClick={() => state[statename].onGet(state[statename])}> <h1 className="hidden md:block">Refresh</h1> <Icon icon={'solar:refresh-bold-duotone'} className="text-xl" /></button>
            <Link href={`/admin/usage-price/create`} className="inline-block">
              <button className="btn-primary">
                <Icon icon={IconsCollection.plus} className="text-sm"/>
                Create Usage Price
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={`flex gap-5 px-0 md:px-5 flex-1 overflow-y-auto`}>
        <div className="w-full">
          {DatatableView()}
        </div>
      </div>
    </div>
  )
}
