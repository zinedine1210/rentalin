'use client'

import { tableOrder } from "@@/src/constant/table";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";
import { useWindowSize } from "@@/src/hooks/usewindowsize";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { FilterOptions, StateType } from "@@/src/types/types";
import { useCallback, useEffect } from "react";
import DatatableMobile from "@@/app/components/Datatable/DatatableMobile";
import Datatable from "@@/app/components/Datatable/Datatable";
import FilterDatatable from "@@/app/components/Datatable/FilterDatatable";
import { Icon } from "@iconify/react";
import { IconsCollection } from "@@/src/constant/icons";
import { useRouter } from "next/navigation";
import { Notify } from "@@/src/utils/script";
import { OrderModel, OrderType } from "../data/OrderModel";
import { getFromOptions, statusDeliveryMethod, statusOrders, statusUsageLocation } from "@@/src/constant/status";

export default function AdminOrderPages() {
  const { state, setState } = useGlobalContext();
  const statename: string = 'orders'
  const windowWidth = useWindowSize();
  const router = useRouter()

  const initialMount = useCallback(async () => {
    let defaultValue: StateType<OrderType> = {
      isLoading: false,
      headers: tableOrder,
      filter: [],
      filterKey: [
        {
          value: 'name_unit',
          label: 'Name unit',
          type: 'input_text'
        },
        {
          value: 'renter_id',
          label: 'Renter ID',
          type: 'input_text'
        },
        {
          value: 'status',
          label: 'Status',
          type: 'select',
          options: getFromOptions(statusOrders)
        },
        {
          value: 'delivery_method',
          label: 'Delivery Method',
          type: 'select',
          options: getFromOptions(statusDeliveryMethod)
        },
        {
          value: 'usage_location',
          label: 'Usage Location',
          type: 'select',
          options: getFromOptions(statusUsageLocation)
        }
      ],
      page: 1,
      display: 10,
      range: {},
      columns: [{ data:"created_at", dir:"desc" }],
      data: null,
      allData: [],
      totalCount: 0,
      payload: [],
      bulk: [
        {
          action: async (id, index) => {
            const result: ApiResponse<{ id: string }> = await fetchClient('DELETE', '/data/orders/' + id)
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
      bulkButton: [
        {
          action: async (id, index) => {
            router.push(`/admin/order/update/${id}`)
          },
          name: 'Check',
          icon: IconsCollection.edit
        }
      ],
      groupBy: "created_at",
      onGet: async (newObj: StateType<OrderType>) => {
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
        const route: string = '/data/orders'
        let parameter = `?page=${dataState.page}&limit=${dataState.display}`
        dataState.filter.map((fil: FilterOptions) => {
            parameter = parameter + `&${fil.key}=${fil.value}`
        })
        const result: ApiResponse<TableResponse<OrderType[]>> = await fetchClient('GET', route + parameter)
        const responseData: TableResponse<OrderType[]> = result.data
        const value: OrderModel[] = OrderModel.toDatatableResponse(responseData.data.reverse())
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
        <h1 className="font-bold text-xl border-l-4 border-primary-500 px-2">Orderan Customer</h1>
        <p className="text-sm mt-2">Semua orderan dari renter akan masuk kesini, anda bisa cek terlebih dahulu dan mengubah statusnya</p>


        <div className="flex md:items-center md:justify-between mt-5">
          <div className="w-auto md:w-1/2">
            <FilterDatatable statename={statename} />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-end gap-2">
            <button className="btn-secondary" onClick={() => state[statename].onGet(state[statename])}> <h1 className="hidden md:block">Refresh</h1> <Icon icon={'solar:refresh-bold-duotone'} className="text-xl" /></button>
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
