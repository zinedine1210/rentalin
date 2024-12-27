'use client'
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI"
import { FilterOptions } from "@@/src/types/types"
import { useEffect, useState } from "react"
import { OrderModel, OrderType } from "../data/OrderModel"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Loading from "@@/app/loading"
import CardOrder from "./CardOrder"

export default function OrderPages() {
  const [page, setPage] = useState<number>(1)
  const [display, setDisplay] = useState<number>(5)
  const [filter, setFilter] = useState<FilterOptions[]>([])
  const [data, setData] = useState<OrderModel[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [tab, setTab] = useState<"pending" | "accepted" | "completed" | "rejected" | "onrent">('pending')


  const handleSubmit = async (tabOrder: "pending" | "accepted" | "completed" | "rejected" | "onrent") => {
    setLoading(true)
    const route: string = '/data/orders'
    let parameter = `?page=${page}&limit=${display}&status=${tabOrder}`
    filter.map((fil: FilterOptions) => {
        parameter = parameter + `&${fil.key}=${fil.value}`
    })
    const result: ApiResponse<TableResponse<OrderType[]>> = await fetchClient('GET', route + parameter)
    const responseData: TableResponse<OrderType[]> = result.data
    const value: OrderModel[] = OrderModel.toDatatableResponse(responseData.data)

    console.log(value)
    setData(value)
    setLoading(false)
  }

  useEffect(() => {
    if(!data){
      handleSubmit('pending')
      setTab('pending')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTab = (value: "pending" | "accepted" | "completed" | "rejected" | "onrent") => {
    setTab(value)
    handleSubmit(value)
  }

  const subtitle = {
    'pending': 'Sebentar ya admin lagi cek dokumen yang anda kirim nih',
    'accepted': 'Lakukan pembayaran duls ges'
  }

  const nothingSubtitle = {
    'pending': {
      title: 'Tidak ada order yang kamu lakukan',
      subtitle: 'Ayo sewa lagi dongs kk'
    },
    'accepted': {
      title: 'Belum ada orderanmu yang diterima',
      subtitle: 'Periksa kembali data dokumenmu yaa untuk lolos verifikasi oleh admin'
    }
  }


  return (
    <section className="p-5 w-full flex flex-col h-full overflow-hidden">
      <header >
        <h1 className="font-semibold text-2xl">Your Orders</h1>
        <p className="font-light">Your order transaction in here</p>
      </header>
      <div className="flex-1 overflow-y-auto py-5 flex gap-10">
        <ul className="w-auto space-y-3">
            <li>
                <button type="button" onClick={() => handleTab('pending')} className={`${tab == 'pending' && 'border-l-4 border-primary-500'} w-full text-start flex items-center gap-2 py-3 px-5 whitespace-nowrap bg-zinc-200 hover:bg-zinc-300`} aria-current="page">
                    <Icon className="text-2xl" icon={IconsCollection.admincheck}/>
                    Lagi dicek Admin
                </button>
            </li>
            <li>
                <button type="button" onClick={() => handleTab('accepted')} className={`${tab == 'accepted' && 'border-l-4 border-primary-500'} w-full text-start flex items-center gap-2 py-3 px-5 whitespace-nowrap bg-zinc-200 hover:bg-zinc-300`} aria-current="page">
                    <Icon className="text-2xl" icon={IconsCollection.payment}/>
                    Menunggu Pembayaran
                </button>
            </li>
        </ul>
        <div className="w-full overflow-y-auto">
          <h1 className="font-bold text-4xl text-primary first-letter:uppercase">{tab}</h1>
          {
            !loading ? data.length > 0 ?
              <div>
                <p className="font-light">{subtitle[tab]}</p>

                <div className="mt-5 space-y-3">
                  {
                    data.map((item: OrderModel, index: number) => {
                      return <CardOrder item={item} key={index}/>
                    })
                  }
                </div>
              </div>
              :
              <div className="py-10 flex items-center justify-center">
                <div className="text-center mx-auto">
                  <Icon className="text-6xl text-primary-500 text-start mx-auto" icon={IconsCollection.blank}/>
                  <h1 className="font-semibold text-red-500 mt-2 text-xl">{nothingSubtitle[tab].title}</h1>
                  <p className="">{nothingSubtitle[tab].subtitle}</p>
                </div>
              </div>
            :
            <Loading />
          }
        </div>
      </div>
    </section>
  )
}
