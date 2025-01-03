import { useGlobalContext } from "@@/src/providers/GlobalContext"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import { StateType, TableHeader } from "@@/src/types/types"
import { displayListNumber } from "../../../src/constant/table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Notify } from "@@/src/utils/script"
import Dropdown from "../Partials/Dropdown"
import Image from "next/image"
import myImageLoader from "@@/src/utils/loader"
import Modal from "../Partials/Modal"
import ResponsiveImage from "../Partials/ResponsiveImage"

export default function Datatable({
    statename
}: {
    statename: string
}) {
    const { state, setState } = useGlobalContext()
    const [status, setStatus] = useState<string>('')
    const property: StateType<any> = state[statename]
    // property 
    const display = property?.display
    const headers = property?.headers
    const data = property?.data ?? []
    const columns = property?.columns
    const page = property?.page
    const totalCount = property?.totalCount
    const bulk = property?.bulk
    const bulkButton = property?.bulkButton
    const isLoading = property?.isLoading ?? true
    const select = property?.select

    useEffect(() => {},[isLoading])

    const handleFetch = (value: number) => {
        if(property.data?.[value]){
            setState({ ...state, [statename]: property })
        }else{
            property.onGet(property)
        }
    }

    const handleNext = () => {
        const totalCount = property?.totalCount
        const display = property?.display
        const maxPage = Math.ceil(totalCount / display)
        const page = property?.page

        if(page == maxPage){
            setStatus("Penuh")
            return
        }

        const addpage = page + 1
        property.page = addpage
        handleFetch(addpage)
    }

    const handlePrev = () => {
        const page = property?.page
        if(page <= 1){
            return
        }
        const minPage = page - 1
        property.page = minPage
        handleFetch(minPage)
    }

    const handleBackward = () => {
        const page = property?.page
        if(page == 1){
            return
        }
        property.page = 1
        handleFetch(1)
    }

    const handleForward = () => {
        const totalCount = property?.totalCount
        const display = property?.display
        const forwardPage = Math.ceil(totalCount / display)
        const page = property?.page
        if(page > forwardPage){
            return
        }
        property.page = forwardPage
        handleFetch(forwardPage)
    }

    const handleClickPage = async (value: number) => {
        property.page = value
        handleFetch(value)
    }

    const handleDisplay = (value: number) => {
        property.display = value
        const totalCount = property?.totalCount
        const page = property?.page
        const maxpage = Math.ceil(totalCount/value)
        property.data = null
        property.page = 1
        if(page > maxpage){
            property.page = maxpage
            property.onGet(property)
        }else{
            property.onGet(property)
        }
    }

    const handleSort = (name: any) => {
        let copyData = columns
        if(copyData[0]['data'] == name){
            copyData[0]['dir'] = copyData[0]['dir'] == "asc" ? "desc":"asc"
        }else{
            copyData[0]['data'] = name
            copyData[0]['dir'] = "asc"
        }
        setState({ ...state, [statename]: property })
    }

    const handleCheck = (id: any) => {
        let copySelect = select ?? []
        if(copySelect){
            if(id == -1){
                copySelect = []
                if(select?.length != data.length){
                    data.forEach((item: any) => {
                        copySelect = [ ...copySelect, item.id ]
                    })
                }
            }else{
                if (copySelect.includes(id)) {
                    copySelect = copySelect.filter(num => num !== id);
                } else {
                    copySelect.push(id);
                }
            }
            property.select = copySelect
            setState({ ...state, [statename]: property })
        }
    }

    const handleCopy = (text: string, name: string, copy: string) => {
        if(!copy){
            return false
        }
        navigator.clipboard.writeText(text).then(() => {
            Notify(`${name} copy to clipboard`, 'info', 2000)
        })
    }

    const showing = totalCount > 0 ? (display * page) - display + 1 : 0 
    const showingTo = display * page > totalCount ? totalCount: display * page

    const skeletonLoading = Array.from({ length: Number(display) }, (_, i) => i + 1);
    const dataLoop = data?.[page]

    const handleModalImage = (route: string) => {
        setState({ ...state, modal: { name: "imagesreview", data: route }})
    }
    
  return (
    <div>
        <Modal name="imagesreview">
            <div>
                <h1 className="mb-2">Image Review</h1>
                <div className="block max-w-[500px] max-h-[500px] bg-center overflow-hidden rounded-xl">
                    {
                        state?.modal && (
                            <ResponsiveImage
                                src={state.modal.data}
                                alt="Example Image"
                                minWidth={300} // Ukuran minimum
                                minHeight={300} // Ukuran minimum
                                maxWidth={600}  // Ukuran maksimum
                                maxHeight={600} // Ukuran maksimum
                            />
                        )
                    }
                </div>
            </div>
        </Modal>
        <div className="flex items-center justify-between mb-5 ">
            <h1 className="dark:text-white text-sm xl:text-xs 2xl:text-sm">Showing { showing } to { showingTo } of {totalCount} Entries</h1>
            <div className="flex items-center">
                <h1 className=" dark:text-white text-sm xl:text-xs 2xl:text-sm">Display </h1>
                <select value={display} onChange={(e) => handleDisplay(Number(e.target.value))} name="display" id="displaySelect" className="bg-transparent px-2 outline-none">
                    {
                        displayListNumber.map((item, index) => {
                            return (
                                <option className="dark:text-black" disabled={totalCount < item.value} key={index} value={item.value}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
        <div className={`${isLoading && !data && 'pointer-events-none'} relative overflow-x-auto`}>
            <table className="w-full text-sm xl:text-xs 2xl:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200 rounded-xl">
                <thead className="bg-white dark:bg-dark text-sm xl:text-xs 2xl:text-sm text-gray-700 uppercase dark:text-gray-200 rounded-xl">

                    {/* HEADERS LOOPING */}
                    <tr className="bg-white dark:bg-dark border-b-2 border-black">
                        <th scope="col" className="p-4">
                            No
                        </th>
                        {
                            select && (
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id={`selectall-${statename}`} type="checkbox" onChange={() => handleCheck(-1)} checked={select.length == data.length} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={`selectall-${statename}`} className="sr-only">checkbox</label>
                                    </div>
                                </th>
                            )
                        }
                        {
                            headers && headers.map((head, key) => {
                                if(head.sort)
                                return (
                                    <th scope="col" key={key} className="whitespace-nowrap px-3 xl:px-3 2xl:px-5 py-2.5 xl:py-3 2xl:py-4 text-sm xl:text-xs 2xl:text-sm">
                                        <div className="flex items-center gap-2 ">
                                            {head.label}
                                            <button onClick={() => handleSort(head.sort)} className={`${columns.find((res: any) => res.data == head.sort) ? "bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center visible opacity-100 dark:text-black" : "dark:text-white opacity-0 invisible"} group-hover:visible duration-300 group-hover:opacity-100`}>
                                                {
                                                    columns.find((res: any) => res.data == head.sort) && columns.find((res: any) => res.data == head.sort)?.dir == "asc" ? <Icon icon={'ph:arrow-up'}/> : <Icon icon={'ph:arrow-down'} className="text-lg"/>
                                                }
                                            </button>
                                        </div>
                                    </th>
                                )

                                return (
                                    <th key={key} scope="col" className={`whitespace-nowrap  px-3 xl:px-3 2xl:px-5 py-2.5 xl:py-3 2xl:py-4 text-sm xl:text-xs 2xl:text-sm ${head.cssHead}`}>
                                        {head.label}
                                    </th>
                                )
                            })
                        }
                        {
                            (bulk || bulkButton) && (
                                <th className={`px-3 xl:px-3 2xl:px-5 py-2.5 xl:py-3 2xl:py-4 text-sm xl:text-xs 2xl:text-sm whitespace-nowrap`}>
                                    Action
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* DATA LOOPING */}
                    {
                        isLoading ?
                            skeletonLoading.map((load, loadIndex) => {
                                return (
                                    <SkeletonTable key={loadIndex} headers={headers} />
                                )
                            })
                        :
                        dataLoop.length > 0 ?
                            dataLoop.map((item, key: number) => {
                                return (
                                    <tr key={key} className="even:bg-gray-50 border-b dark:border-gray-700 odd:dark:bg-darkPrimary odd:bg-darkPrimary odd:bg-opacity-20 even:dark:bg-darkSecondary">
                                        <td className="w-4 p-4 text-black dark:text-white text-center">
                                            {key + showing}
                                        </td>
                                        {
                                            select && (
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id={`select-${statename}-${key}`} checked={select.includes(item.id)} onChange={() => handleCheck(item.id)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor={`select-${statename}-${key}`} className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        {
                                            headers.map((head: TableHeader, headIndex) => {
                                                return (
                                                    <td key={headIndex} onClick={() => handleCopy(item[head.copy], head.label, head.copy)} className={` px-3 xl:px-3 2xl:px-5 py-2.5 xl:py-3 2xl:py-4 text-sm xl:text-xs 2xl:text-sm ${head.cssRow} ${head.copy && "select-all"}`}>
                                                        {head.images ? (
                                                            <div className="max-h-[100px] overflow-hidden">
                                                                <ResponsiveImage
                                                                    src={item?.[head.property]}
                                                                    alt={`Image-${headIndex}`}
                                                                    minWidth={200} // Ukuran minimum
                                                                    minHeight={200} // Ukuran minimum
                                                                    maxWidth={300}  // Ukuran maksimum
                                                                    maxHeight={300} // Ukuran maksimum
                                                                />
                                                            </div>
                                                        ) : head.status ? (
                                                            // Jika `head.status` ada, tampilkan status dengan styling
                                                            <div 
                                                            style={{ backgroundColor: `${head.status[item[head.property]]}` }} 
                                                            className="text-center rounded-full my-1 text-xs py-1.5 px-4 w-fit text-white"
                                                            >
                                                            {item?.[head.property]}
                                                            </div>
                                                        ) : (
                                                            // Default: tampilkan properti biasa
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {item?.[head.property] || '-'}
                                                            </span>
                                                        )}
                                                    </td>
                                                )
                                            })
                                        }
                                        {
                                            (bulkButton || bulk) && (
                                                <td className="h-auto py-2 flex items-center gap-2 relative">
                                                    { bulkButton && bulkButton.map((btn: any, index: number) => {
                                                        const customCss = btn.customCss ?? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-md'
                                                        return (
                                                            <button onClick={() => btn.action(item.id, index)} key={index} className={`${customCss} py-1.5 px-3 text-sm flex items-center gap-2`}>
                                                                <Icon icon={btn.icon} />
                                                                {btn.name}
                                                            </button>
                                                        )
                                                    })}
                                                    {
                                                        bulk && (
                                                            <Dropdown position={`right-0`} id={item.id} options={bulk}/>
                                                        )
                                                    }
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            })
                        :
                        <tr className="col-span-full h-56 w-full">
                            <th className="col-span-full w-full" colSpan={11}>
                                <div className="relative w-72 mx-auto">
                                    <p className="w-32 text-lg text-light font-bold absolute top-1/2 -translate-y-1/2 ">Oops, no data match your filters</p>
                                    <Image alt="NO DATA" width={150} height={150} src={'/images/no-data.png'} 
                                        className="block ml-auto"
                                        placeholder={`data:image/${myImageLoader(150, 150)}`}
                                    />
                                </div>
                            </th>
                        </tr>

                    }
                </tbody>
            </table>
        </div>
        <div className="mt-5">
            <Pagination
                handleNext={handleNext} 
                handlePrev={handlePrev} 
                handleForward={handleForward}
                handleBackward={handleBackward}
                handleClickPage={(e: any) => handleClickPage(e)}
                page={page} 
                pagerList={Math.ceil(totalCount/display)}
            />
        </div>
    </div>
  )
}

function SkeletonTable ({ headers }: {
    headers: any[]
}){
    return (
        <tr className="border-b dark:border-gray-700">
            <th className="px-5 py-5 blur-sm rounded-xl dark:bg-darkPrimary bg-zinc-200 select-none whitespace-nowrap">
                10.
            </th>
            {
                headers.map((head, index) => {
                    return (
                        <th key={index} className="px-5 py-5 blur-sm rounded-xl dark:bg-darkPrimary bg-zinc-200 select-none whitespace-nowrap">
                            Lorem, ipsum dolor.
                        </th>
                    )
                })
            }
        </tr>
    )
}