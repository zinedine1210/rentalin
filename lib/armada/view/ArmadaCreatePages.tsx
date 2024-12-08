'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { ArmadaType } from "../data/ArmadaModel"
import { ArmadaForm } from "../data/ArmadaForm"

export default function ArmadaCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | ArmadaType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<ArmadaForm>(data ? new ArmadaForm(data): new ArmadaForm())
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<ArmadaType>
    if(action == "create"){
      result = await fetchClient('POST', '/data/armadas', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/armadas/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/armada')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof ArmadaForm) => {
    setDataList((prev:ArmadaForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new ArmadaForm())
  }

  const errorMessage = (target: keyof ArmadaForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof ArmadaForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  return (
    <section className="p-5">
      <Link href={'/admin/armada'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto  bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Armada</h1>
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
                  id="input-location"
                  name="input-location"
                  label="location"
                  onChange={(value) => handleChange(value, 'location')}
                  readOnly={disabled}
                  value={datalist.location}
                  errorMessage={errorMessage('location')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-location_summary"
                  name="input-location_summary"
                  label="location_summary"
                  onChange={(value) => handleChange(value, 'location_summary')}
                  readOnly={disabled}
                  value={datalist.location_summary}
                  errorMessage={errorMessage('location_summary')}
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
