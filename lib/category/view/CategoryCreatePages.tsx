'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { CategoryType } from "../data/CategoryModel"
import { CategoryForm } from "../data/CategoryForm"
import { useRouter } from "next/navigation"

export default function CategoryCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | CategoryType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<CategoryForm>(data ? new CategoryForm(data): new CategoryForm())
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<CategoryType>
    if(action == "create"){
      result = await fetchClient('POST', '/data/categories', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/categories/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/category')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof CategoryForm) => {
    setDataList((prev:CategoryForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new CategoryForm())
  }

  const errorMessage = (target: keyof CategoryForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof CategoryForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  return (
    <section className="p-5">
      <Link href={'/admin/category'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto  bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Category</h1>
        {
          !loading && (
            <div className="space-y-5 py-5">
              <div className="relative">
                <InputText 
                  id="input-title"
                  name="input-title"
                  label="title"
                  onChange={(value) => handleChange(value, 'title')}
                  readOnly={disabled}
                  value={datalist.title}
                  errorMessage={errorMessage('title')}
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
