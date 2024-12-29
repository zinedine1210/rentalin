'use client'
import { FormEvent, useState } from "react"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { OrderType } from "../data/OrderModel"
import { OrderForm } from "../data/OrderForm"
import UserVerifikasi from "./UserVerifikasi"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import OrderDetail from "./OrderDetail"

export default function OrderCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | OrderType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<OrderForm>(data ? new OrderForm(data): new OrderForm())
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<number>(1)
  const handleAccepted = async (type: boolean) => {
    setLoading(true)
    let result: ApiResponse<OrderType>
    if(type && datalist.delivery_method == 'diantar' && datalist.delivery_price == 0) return Notify('Please input delivery price', 'info', 3000)
    if(type && datalist.usage_location == 'luar kota' && datalist.usage_price == 0) return Notify('Please input usage price', 'info', 3000)
    
    let payloadDataList = JSON.parse(JSON.stringify(datalist))
    if(type){
      payloadDataList.status = 'accepted'
    }else{
      payloadDataList.status = 'rejected'
    }

    console.log(payloadDataList, 'ini payload')

    if(action == "update"){
      result = await fetchClient('PUT', '/data/orders/'+data.id, payloadDataList)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      router.push('/admin/order')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof OrderForm) => {
    setDataList((prev:OrderForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }

  const handleUpdateStatus = async (statusUpdate: string) => {
    const payloadStatus = {
      status: statusUpdate
    }
    const result = await fetchClient('PUT', '/data/orders/'+data.id, payloadStatus)
    if(result.success){
      Notify('Berhasil update', 'success', 3000)
      router.push('/admin/order')
    }
  }

  return (
    <section className="p-5 shadow-md rounded-md bg-white">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Order ID: <span className="font-semibold">{data.id}</span></h1>
          <div className="badge-zinc uppercase">{data.status}</div>
        </div>
        <div className="flex items-center gap-5">
          {
            data.status == 'pending' && (
              <button className="btn-primary" type="button" onClick={() => handleAccepted(true)}><Icon icon={IconsCollection.check}/>Accept</button>
            )
          }
          {
            data.status == 'payment' && (
              <button className="btn-primary" type="button" onClick={() => handleUpdateStatus('onrent')}>Transfer Berhasil</button>
            )
          }
          {
            data.status == 'onrent' && (
              <button className="btn-primary" type="button" onClick={() => handleUpdateStatus('completed')}>Selesai</button>
            )
          }
          {
            data.status != 'rejected' && data.status != 'completed' && data.status != 'payment' && data.status != 'onrent' && (
              <button className="btn-secondary" type="button" onClick={() => handleAccepted(false)}><Icon icon={IconsCollection.close}/>Reject</button>
            )
          }
        </div>
      </header>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
              <button type="button" onClick={() => setTab(1)} className={`inline-block p-4 border-b-2 ${tab == 1 ? 'text-blue-600 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500': 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>User Verifikasi</button>
          </li>
          <li className="me-2">
              <button type="button" onClick={() => setTab(2)} className={`inline-block p-4 border-b-2 ${tab == 2 ? 'text-blue-600 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500': 'border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>Order Detail</button>
          </li>
        </ul>
      </div>

      <div className="mt-5">
        {
          tab == 1 && (
            <UserVerifikasi renter_id={data.renter_id}/>
          )
        }
        {
          tab == 2 && (
            <OrderDetail item={data} dataList={datalist} handleChange={(value, target) => handleChange(value, target)}/>
          )
        }
      </div>

    </section>
  )
}
