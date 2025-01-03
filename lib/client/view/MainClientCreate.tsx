'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient, uploadFile } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { ClientType } from "@@/lib/client/data/ClientModel"
import { ClientForm } from "@@/lib/client/data/ClientForm"
import FileInput from "@@/app/components/Input/InputFile"

export default function MainClientCreate({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | ClientType
}) {
  const disabled: boolean = action === 'view' ? true: false
  const [datalist, setDataList] = useState<ClientForm>(data ? new ClientForm(data): new ClientForm())
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    let result: ApiResponse<ClientType>
    if(action == "create"){
      const form = new FormData()
      form.set('file', datalist.file[0])
      const resultUpload = await uploadFile(form)
      const dataFile: any = resultUpload.data
      datalist.file_id = dataFile.id
      result = await fetchClient('POST', '/data/client', datalist)
    }
    if(result.success){
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      // router.push('/admin/menus')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof ClientForm) => {
    setDataList((prev: ClientForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }


  const handleReset = () => {
    setDataList(new ClientForm())
  }

  const errorMessage = (target: keyof ClientForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof ClientForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  const handleFilesChange = (files: File[]) => {
    console.log(files)
    handleChange(files, 'file')
  };

  return (
    <section className="p-5">
      <Link href={'/admin/client'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl"/> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto dark:bg-darkPrimary bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Client</h1>
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
                <FileInput
                  id="file-upload"
                  label="Upload Files"
                  required={true}
                  maxSize={5}
                  defaultImage={data?.file?.file_path ? [data.file.file_path]: null}
                  files={datalist.file}
                  accept="image/png, image/jpeg, application/pdf"
                  onFilesChange={handleFilesChange}
                  readOnly={disabled}
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
