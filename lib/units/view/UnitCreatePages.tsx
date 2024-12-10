'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient, TableResponse, uploadFile } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import { UnitType } from "../data/UnitModel"
import { UnitForm } from "../data/UnitForm"
import FileInput from "@@/app/components/Input/InputFile"
import Select from "@@/app/components/Input/Select"
import { Options } from "@@/src/types/types"
import { CategoryModel, CategoryType } from "@@/lib/category/data/CategoryModel"
import { PartnerModel, PartnerType } from "@@/lib/partner/data/PartnerModel"

export default function UnitCreatePages({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | UnitType
}) {
  const router = useRouter()
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<UnitForm>(data ? new UnitForm(data): new UnitForm())
  const [options, setOptions] = useState<{[key: string]: Options[]}>({
    optionsCategory: [],
    optionsPartners: []
  })
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<UnitType>
    if(action == "create"){
      const form = new FormData()
      form.set('file', datalist.file_picture[0])
      const resultUpload = await uploadFile(form)
      const dataFile: any = resultUpload.data
      datalist.file_picture = dataFile.id
      result = await fetchClient('POST', '/data/units', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/units/'+data.id, datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/unit')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof UnitForm) => {
    setDataList((prev:UnitForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new UnitForm())
  }

  const errorMessage = (target: keyof UnitForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof UnitForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  const handleFilesChange = (files: File[]) => {
    console.log(files)
    handleChange(files, 'file_picture')
  };

  const formFetch = {
    'input-category_id': async () => {
      const result: ApiResponse<TableResponse<CategoryType[]>> = await fetchClient('GET', '/data/categories')
      const responseData = result.data
      if(result.success){
        const optionPages: Options[] = CategoryModel.toOptions(responseData.data)
        setOptions({ ...options, optionsCategory: optionPages })
      }
    },
    'input-partner_id': async () => {
      const result: ApiResponse<TableResponse<PartnerType[]>> = await fetchClient('GET', '/data/partners')
      const responseData = result.data
      if(result.success){
        const optionPages: Options[] = PartnerModel.toOptions(responseData.data)
        setOptions({ ...options, optionsPartners: optionPages })
      }
    },
  }

  return (
    <section className="p-5">
      <Link href={'/admin/unit'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto  bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Unit</h1>
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
                  prefixIcon={IconsCollection.description}
                  onChange={(value) => handleChange(value, 'description')}
                  readOnly={disabled}
                  value={datalist.description}
                  errorMessage={errorMessage('description')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-condition"
                  name="input-condition"
                  label="condition"
                  onChange={(value) => handleChange(value, 'condition')}
                  readOnly={disabled}
                  value={datalist.condition}
                  errorMessage={errorMessage('condition')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-price"
                  name="input-price"
                  label="price"
                  type="number"
                  onChange={(value) => handleChange(value, 'price')}
                  readOnly={disabled}
                  value={datalist.price}
                  errorMessage={errorMessage('price')}
                />
              </div>
              <div className="relative">
                <FileInput
                  id="file-upload"
                  label="Upload Files"
                  required={true}
                  maxSize={5}
                  defaultImage={data?.file?.file_path ? [data.file.file_path]: null}
                  files={datalist.file_picture}
                  accept="image/png, image/jpeg, application/pdf"
                  onFilesChange={handleFilesChange}
                  readOnly={disabled}
                />
              </div>
              <div className="relative">
                <Select
                  id="input-category_id"
                  name="input-category_id"
                  onChange={(value) => handleChange(value, 'category_id')}
                  onTrigger={() => formFetch['input-category_id']()}
                  options={options.optionsCategory}
                  value={datalist.category_id}
                  label="Category"
                  errorMessage={errorMessage('category_id')}
                />
              </div>
              <div className="relative">
                <Select
                  id="input-partner_id"
                  name="input-partner_id"
                  onChange={(value) => handleChange(value, 'partner_id')}
                  onTrigger={() => formFetch['input-partner_id']()}
                  options={options.optionsPartners}
                  value={datalist.partner_id}
                  label="Partner"
                  errorMessage={errorMessage('partner_id')}
                />
              </div>
              <div className="relative">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" onChange={(e) => handleChange(e.target.checked ? 1 : 0, 'isAvailable')} checked={datalist.isAvailable == 0 ? false:true} value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is Available</span>
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
