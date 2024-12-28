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
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<OrderType>
    if(action == "update"){
      result = await fetchClient('PUT', '/data/orders/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/renter/order')
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


  const handleReset = () => {
    setDataList(new OrderForm())
  }

  const errorMessage = (target: keyof OrderForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof OrderForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  console.log(data)

  return (
    <section className="p-5 shadow-md rounded-md bg-white">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl">Order ID: <span className="font-semibold">{data.id}</span></h1>
        </div>
        <div className="flex items-center gap-5">
          <button className="btn-primary" type="button"><Icon icon={IconsCollection.check}/>Accept</button>
          <button className="btn-secondary" type="button"><Icon icon={IconsCollection.close}/>Reject</button>
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
      </div>

    </section>
  )
}
