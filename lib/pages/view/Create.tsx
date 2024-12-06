'use client'
import { FormEvent, useState } from "react"
import InputText from "@@/app/components/Input/InputText"
import { PagesType } from "../data/PagesModel"
import { PagesForm } from "../data/PageForm"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"
import Link from "next/link"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"
import { Notify } from "@@/src/utils/script"
import { useRouter } from "next/navigation"
import Select from "@@/app/components/Input/Select"

export default function Create({
  action,
  data
}: {
  action: 'update' | 'create' | 'view',
  data?: null | PagesType
}) {
  const disabled: boolean = action === 'view' ? true : false
  const [datalist, setDataList] = useState<PagesForm>(data ? new PagesForm(data) : new PagesForm())
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    console.log(datalist)
    let result: ApiResponse<PagesType>
    if (action == "create") {
      result = await fetchClient('POST', '/data/pages', datalist)
    }
    if (action == "update") {
      result = await fetchClient('PUT', '/data/pages/' + data.id, datalist)
    }
    if (result.success) {
      Notify(result.message ?? 'Success', 'success', 3000)
      handleReset()
      router.push('/admin/pages')
    }
    setLoading(false)
  }

  const handleChange = (value: any, target: keyof PagesForm) => {
    setDataList((prev: PagesForm) => {
      return {
        ...prev,
        [target]: value
      }
    })
  }

  const handleCheck = (value: any, target: keyof PagesForm) => {
    setDataList((prev: PagesForm) => ({
      ...prev,
      [target]: value, // Directly use the checked boolean value
    }));
  };

  const handleReset = () => {
    setDataList(new PagesForm())
  }

  const errorMessage = (target: keyof PagesForm) => {
    const checkvalidation: string = datalist.requiredInput(target, datalist[target])
    return checkvalidation
  }

  const validButton = () => {
    let data: boolean = true
    for (const [key, value] of Object.entries(datalist)) {
      if (errorMessage(key as keyof PagesForm) != "") {
        data = false
        break;
      }
    }
    return data
  }

  return (
    <section className="p-5">
      <Link href={'/admin/pages'}>
        <button className="text-blue-500 flex items-center gap-2 text-sm"><Icon icon={IconsCollection['chevron-left']} className="text-xl" /> Back to Datatable</button>
      </Link>
      <form className="w-full md:w-1/2 mx-auto  bg-white p-10 rounded-3xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-primary-500 first-letter:uppercase text-xl pb-5 border-b border-primary-500 border-dashed font-bold">{action} Pages</h1>
        {
          !loading && (
            <div className="space-y-5 py-5">
              <div className="relative">
                <InputText
                  id="input-title"
                  name="input-title"
                  label="Title"
                  onChange={(value) => handleChange(value, 'title')}
                  readOnly={disabled}
                  value={datalist.title}
                  errorMessage={errorMessage('title')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-slug"
                  name="input-slug"
                  label="Slug"
                  required={false}
                  onChange={(value) => handleChange(value, 'slug')}
                  readOnly={disabled}
                  value={datalist.slug}
                  suffixIcon={datalist.slug}
                  errorMessage={errorMessage('slug')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-content"
                  name="input-content"
                  label="Content"
                  required={false}
                  onChange={(value) => handleChange(value, 'content')}
                  readOnly={disabled}
                  value={datalist.content}
                  suffixIcon={datalist.content}
                  errorMessage={errorMessage('content')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-featured_image"
                  name="input-featured_image"
                  label="Featured Image"
                  required={false}
                  onChange={(value) => handleChange(value, 'featured_image')}
                  readOnly={disabled}
                  value={datalist.featured_image}
                  suffixIcon={datalist.featured_image}
                  errorMessage={errorMessage('featured_image')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-meta_title"
                  name="input-meta_title"
                  label="Meta Title"
                  required={false}
                  onChange={(value) => handleChange(value, 'meta_title')}
                  readOnly={disabled}
                  value={datalist.meta_title}
                  suffixIcon={datalist.meta_title}
                  errorMessage={errorMessage('meta_title')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-meta_description"
                  name="input-meta_description"
                  label="Meta Description"
                  required={false}
                  onChange={(value) => handleChange(value, 'meta_description')}
                  readOnly={disabled}
                  value={datalist.meta_description}
                  suffixIcon={datalist.meta_description}
                  errorMessage={errorMessage('meta_description')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-meta_keywords"
                  name="input-meta_keywords"
                  label="Meta Keywords"
                  required={false}
                  onChange={(value) => handleChange(value, 'meta_keywords')}
                  readOnly={disabled}
                  value={datalist.meta_keywords}
                  suffixIcon={datalist.meta_keywords}
                  errorMessage={errorMessage('meta_keywords')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-seo_heading"
                  name="input-seo_heading"
                  label="Seo Heading"
                  required={false}
                  onChange={(value) => handleChange(value, 'seo_heading')}
                  readOnly={disabled}
                  value={datalist.seo_heading}
                  suffixIcon={datalist.seo_heading}
                  errorMessage={errorMessage('seo_heading')}
                />
              </div>
              <div className="relative">
                <InputText
                  id="input-canonical_url"
                  name="input-canonical_url"
                  label="Canonical Url"
                  required={false}
                  onChange={(value) => handleChange(value, 'canonical_url')}
                  readOnly={disabled}
                  value={datalist.canonical_url}
                  suffixIcon={datalist.canonical_url}
                  errorMessage={errorMessage('canonical_url')}
                />
              </div>

              <div className="relative">
                <InputText
                  type="number"
                  id="input-page_order"
                  name="input-page_order"
                  label="Page Order"
                  required={false}
                  min={1}
                  onChange={(value) => handleChange(value, 'page_order')}
                  readOnly={disabled}
                  value={datalist.page_order}
                  errorMessage={errorMessage('page_order')}
                />
              </div>

              <div className="relative">
                <Select
                  id="input-is_published"
                  name="input-is_published"
                  label="Published"
                  required={true}
                  disabled={disabled}
                  onChange={(value) => handleChange(value, 'is_published')}
                  value={datalist.is_published}
                  errorMessage={errorMessage('is_published')}
                  isSearch={false}
                  options={[
                    { label: 'No', value: "0" },
                    { label: 'Yes', value: "1" },
                  ]}
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
              <button disabled={!validButton()} className="btn-primary" type="submit"><Icon icon={IconsCollection.save} className="text-xl" />Submit</button>
              <button className="btn-secondary" type="button" onClick={() => handleReset()}><Icon icon={IconsCollection.reset} className="text-xl" />Reset</button>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
