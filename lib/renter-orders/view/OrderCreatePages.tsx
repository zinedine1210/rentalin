'use client'
import { FormEvent, useState } from "react"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { OrderType } from "../data/OrderModel"
import { OrderForm } from "../data/OrderForm"

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
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<OrderType>
    if(action == "create"){
      result = await fetchClient('POST', '/data/orders', datalist)
    }
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

  return (
    <section className="p-5">
      asjaisjaksj k
    </section>
  )
}
