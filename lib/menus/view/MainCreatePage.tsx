'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { MenusList, MenusModel } from "../data/MenusModel"
import { MenusForm } from "../data/MenusForm"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI"
import { groupByProperty, Notify } from "@@/src/utils/script"
import Select from "@@/app/components/Input/Select"
import { PagesModel, PagesType } from "@@/lib/pages/data/PagesModel"
import { Options } from "@@/src/types/types"

export default function MainCreatePage({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | MenusList
}) {
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<MenusForm>(data ? new MenusForm(data): new MenusForm())
  const [options, setOptions] = useState({ optionsPages: [], optionsParentPages: [], optionsFlag: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    console.log(datalist)
    let result: ApiResponse<MenusList>
    if(action == "create"){
      result = await fetchClient('POST', '/data/menus', datalist)
    }
    if(action == "update"){
      result = await fetchClient('PUT', '/data/menus/'+data.id, datalist)
    }
    if(result.success){
      localStorage.removeItem('client_menus')
      Notify(result.message ?? 'Success', 'success', 3000)
      Notify('The page will be refreshed to get the latest menu.', 'info', 3000)
      handleReset()
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      // router.push('/admin/menus')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof MenusForm) => {
    setDataList((prev: MenusForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new MenusForm())
  }

  const errorMessage = (target: keyof MenusForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof MenusForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  const formFetch = {
    'input-pages_id': async () => {
      const result: ApiResponse<TableResponse<PagesType[]>> = await fetchClient('GET', '/data/pages')
      const responseData = result.data
      if(result.success){
        const optionPages: Options[] = PagesModel.toOptions(responseData.data)
        setOptions({ ...options, optionsPages: optionPages })
      }
    },
    'input-parent_id': async () => {
      const result: ApiResponse<TableResponse<MenusList[]>> = await fetchClient('GET', '/data/menus')
      const responseData = result.data
      if(result.success){
        const filterbyParent = responseData.data.filter(res => res.parent_id == null)
        const option: Options[] = MenusModel.toOptions(filterbyParent)
        setOptions({ ...options, optionsParentPages: option })
      }
    },
    'input-flag': async () => {
      const result: ApiResponse<TableResponse<MenusList[]>> = await fetchClient('GET', '/data/menus')
      const responseData = result.data
      if(result.success){
        const grouping: MenusList[] = groupByProperty(responseData.data, 'flag')
        const resultOpt: Options[] = MenusModel.toOptionsFlag(grouping)
        setOptions({ ...options, optionsFlag: resultOpt })
      }
    }
  }

  return (
    <section className="p-5">
      <Link href={'/admin/menus'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto  bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Menu Items</h1>
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
              <div className="relative">
                <InputText 
                  id="input-icon"
                  name="input-icon"
                  label="icon"
                  required={false}
                  onChange={(value) => handleChange(value, 'icon')}
                  readOnly={disabled}
                  value={datalist.icon}
                  suffixIcon={datalist.icon}
                  errorMessage={errorMessage('icon')}
                />
              </div>
              <div className="relative">
                <Select 
                  id="input-pages_id"
                  name="input-pages_id"
                  onChange={(value) => handleChange(value, 'pages_id')}
                  onTrigger={() => formFetch['input-pages_id']()}
                  options={options.optionsPages}
                  value={datalist.pages_id}
                  label="Pages ID"
                  errorMessage={errorMessage('pages_id')}
                />
              </div>
              <div className="relative">
                <InputText 
                  id="input-url"
                  name="input-url"
                  label="url"
                  onChange={(value) => handleChange(value, 'url')}
                  readOnly={disabled}
                  value={datalist.url}
                  errorMessage={errorMessage('url')}
                />
              </div>
              <div className="relative">
                <Select 
                  id="input-flag"
                  name="input-flag"
                  onChange={(value) => handleChange(value, 'flag')}
                  onTrigger={() => formFetch['input-flag']()}
                  isCreate={true}
                  options={options.optionsFlag}
                  value={datalist.flag}
                  label="Flag"
                  errorMessage={errorMessage('flag')}
                />
              </div>
              <div className="relative">
                <Select 
                  id="input-parent_id"
                  name="input-parent_id"
                  required={false}
                  onChange={(value) => handleChange(value, 'parent_id')}
                  onTrigger={() => formFetch['input-parent_id']()}
                  options={options.optionsParentPages}
                  value={datalist.parent_id}
                  label="Parent ID"
                  errorMessage={errorMessage('parent_id')}
                />
              </div>
              <div className="relative">
                <InputText 
                  type="number"
                  id="input-order_position"
                  name="input-order_position"
                  label="Order Position"
                  min={1}
                  onChange={(value) => handleChange(value, 'order_position')}
                  readOnly={disabled}
                  value={datalist.order_position}
                  errorMessage={errorMessage('order_position')}
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
