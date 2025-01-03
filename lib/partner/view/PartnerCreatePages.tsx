'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { PartnerType } from "../data/PartnerModel"
import { PartnerForm } from "../data/PartnerForm"

export default function PartnerCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | PartnerType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<PartnerForm>(data ? new PartnerForm(data): new PartnerForm())
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<PartnerType>
    if(action == "create"){
      result = await fetchClient('POST', '/data/partners', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/partners/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/partner')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof PartnerForm) => {
    setDataList((prev:PartnerForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new PartnerForm())
  }

  const errorMessage = (target: keyof PartnerForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof PartnerForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  return (
    <section className="p-5">
      <Link href={'/admin/partner'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto dark:bg-darkPrimary bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Partner</h1>
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
                  id="input-phone"
                  name="input-phone"
                  label="phone"
                  type="number"
                  prefixIcon={IconsCollection.phone}
                  onChange={(value) => handleChange(value, 'phone')}
                  readOnly={disabled}
                  value={datalist.phone}
                  errorMessage={errorMessage('phone')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-address"
                  name="input-address"
                  label="address"
                  onChange={(value) => handleChange(value, 'address')}
                  readOnly={disabled}
                  value={datalist.address}
                  errorMessage={errorMessage('address')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-email"
                  name="input-email"
                  label="email"
                  onChange={(value) => handleChange(value, 'email')}
                  readOnly={disabled}
                  value={datalist.email}
                  errorMessage={errorMessage('email')}
                />
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
