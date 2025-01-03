'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { accumulationPrice, formatCurrency, Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { UsagePriceType } from "../data/UsagePriceModel"
import { UsagePriceForm } from "../data/UsagePriceForm"
import { Options } from "@@/src/types/types"
import Select from "@@/app/components/Input/Select"

export default function UsagePriceCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | UsagePriceType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<UsagePriceForm>(data ? new UsagePriceForm(data): new UsagePriceForm())
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<UsagePriceType>
    if(action == "create"){
      result = await fetchClient('POST', '/data/usage-price', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/usage-price/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/usage-price')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof UsagePriceForm) => {
    setDataList((prev:UsagePriceForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new UsagePriceForm())
  }

  const errorMessage = (target: keyof UsagePriceForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof UsagePriceForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  const optionsOperator: Options[] = [
    { label: 'Bagi (/)', value: '/' },
    { label: 'Kali (*)', value: '*' },
    { label: 'Tambah (+)', value: '+' },
    { label: 'Kurang (-)', value: '-' },
    { label: 'Persen (%)', value: '%' }
  ]
  
  return (
    <section className="p-5">
      <Link href={'/admin/usage-price'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto dark:bg-darkPrimary bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Usage Price</h1>
        {
          !loading && (
            <div className="space-y-5 py-5">
              <div className="relative">
                <InputText 
                  id="input-name"
                  name="input-name"
                  label="name"
                  onChange={(value) => handleChange(value, 'name')}
                  readOnly={disabled}
                  value={datalist.name}
                  errorMessage={errorMessage('name')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-description"
                  name="input-description"
                  label="description"
                  onChange={(value) => handleChange(value, 'description')}
                  readOnly={disabled}
                  value={datalist.description}
                  errorMessage={errorMessage('description')}
                />
              </div>
              <div className="relative grid grid-cols-12 gap-3 w-full border-y py-2 border-dashed border-primary-500">
                <div className="col-span-3 py-1">
                  <h1 className="font-semibold text-sm">Contoh Harga</h1>
                  <p className="py-3">{formatCurrency(500000)}</p>
                </div>
                <div className="relative col-span-4">
                  <Select
                    id="input-operator_type"
                    name="input-operator_type"
                    onChange={(value) => handleChange(value, 'operator_type')}
                    options={optionsOperator}
                    value={datalist.operator_type}
                    label="Operator"
                    errorMessage={errorMessage('operator_type')}
                  />
                </div>
                <div className="relative col-span-5">
                  <InputText 
                    id="input-price_multiplier"
                    name="input-price_multiplier"
                    label="price multiplier"
                    type="number"
                    onChange={(value) => handleChange(value, 'price_multiplier')}
                    readOnly={disabled}
                    value={datalist.price_multiplier}
                    errorMessage={errorMessage('price_multiplier')}
                  />
                </div>

                <div className="col-span-12 w-full">
                  <h1 className="flex items-center justify-between">Harga yang diberikan ke renter: <span className="font-bold">{formatCurrency(accumulationPrice(500000, datalist.price_multiplier, datalist.operator_type), true)}</span></h1>
                </div>
              </div>
              <div className="relative">
                <InputText 
                  id="input-min_order"
                  name="input-min_order"
                  label="Minimal Order"
                  type="number"
                  onChange={(value) => handleChange(value, 'min_order')}
                  readOnly={disabled}
                  value={datalist.min_order}
                  errorMessage={errorMessage('min_order')}
                />
              </div>

              <div className="relative">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" onChange={(e) => handleChange(e.target.checked ? 'active':'stop', 'status')} checked={datalist.status == 'active' ? true: false} value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Status</span>
                </label>
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className="w-full py-5 text-center text-2xl font-bold text-primary-500">
              Loading..
            </div>
          )
        }
        <div className="py-5">
          {!loading && !disabled && ( // selain disable maka dimunculkan
            <div className="flex items-center gap-2">
              <button disabled={!validButton()} className="btn-primary" type="submit"><Icon icon={IconsCollection.save} className="text-xl"/>Submit</button>
              <button className="btn-secondary" type="button" onClick={() => handleReset()}><Icon icon={IconsCollection.reset} className="text-xl"/>Reset</button>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
