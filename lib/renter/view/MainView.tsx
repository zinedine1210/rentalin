'use client'
import InputText from "@@/app/components/Input/InputText";
import Select from "@@/app/components/Input/Select";
import { DataOptions } from "@@/app/page";
import { UnitModel, UnitType } from "@@/lib/units/data/UnitModel";
import { IconsCollection } from "@@/src/constant/icons";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { formatCurrency } from "@@/src/utils/script";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

export default function MainView({
    data
}: {data:DataOptions}) {
    const { state, setState } = useGlobalContext()
    const [list, setList] = useState<UnitModel[]>([])
    const [filter, setFilter] = useState({
        category_id: '',
        armada_id: '',
        name_unit: '',
        start_date: '',
        duration: ''
    })

    const optionsDuration = [
        { label: '1 Hari', value: 1 },
        { label: '2 Hari', value: 2 },
        { label: '3 Hari', value: 3 },
        { label: '4 Hari', value: 4 },
        { label: '5 Hari', value: 5 },
        { label: '6 Hari', value: 6 },
    ]

    const handleChange = (value: string, target: string ) => {
        setFilter({ ...filter, [target]: value })
    }
    const handleSearch = async () => {
        let parameter = ''
        Object.entries(filter).filter((res: any) => ( res[1] !== '' )).map((fil, index) => {
            let prefix = '&'
            if(index == 0){
                prefix = '?'
            }
            parameter = parameter + `${prefix}${fil[0]}=${fil[1]}`
        })
        const result: ApiResponse<TableResponse<UnitType[]>> = await fetchClient('GET', '/data/units/rent' + parameter)
        const responseData = result.data
        if(result.success){
            const toModel = UnitModel.toDatatableResponse(responseData.data)
            setList(toModel)
        }
    }
  return (
    <section className="w-screen h-screen bg-basic overflow-hidden">
        <div className="container mx-auto px-24">
            <div className="flex flex-col w-full h-screen">
                <header className="bg-white rounded-md p-5 space-y-2 shadow-md">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-5">
                            <Image src={'/images/icon_logo.png'} width={50} height={50} alt="asasas"/>
                            <div>
                                <h1 className="text-sm font-bold text-primary-500">Rentalin</h1>
                                <p className="font-light text-xs text-zinc-500">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <InputText 
                                    id="name_unit"
                                    name="name_unit"
                                    prefixIcon={IconsCollection.search}
                                    value={filter.name_unit}
                                    onChange={(value) => handleChange(value, 'name_unit')}
                                    placeholder="Cari nama unit"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Select 
                                    id="category"
                                    name="category"
                                    placeholder="Mau sewa apa?"
                                    options={data.categories}
                                    onChange={(value) => handleChange(value, 'category_id')}
                                    value={filter.category_id}
                                />
                            </div>
                            <div className="relative">
                                <Select 
                                    id="armada"
                                    name="armada"
                                    placeholder="Kamu di daerah mana?"
                                    options={data.armadas}
                                    onChange={(value) => handleChange(value, 'armada_id')}
                                    value={filter.armada_id}
                                />
                            </div>
                            <div className="relative">
                                <InputText 
                                    id="start_date"
                                    name="start_date"
                                    disabled={true}
                                    value={filter.start_date}
                                    type="date"
                                    onChange={(value) => handleChange(value, 'start_date')}
                                    placeholder=""
                                />
                            </div>
                            <div className="relative">
                                <Select 
                                    id="duration"
                                    isSearch={false}
                                    disabled={true}
                                    name="duration"
                                    placeholder="Durasi Sewa"
                                    options={optionsDuration}
                                    onChange={(value) => handleChange(value, 'duration')}
                                    value={filter.duration}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="btn-primary" type="button" onClick={() => handleSearch()}>
                                <Icon icon={IconsCollection.search} className="text-xl"/>
                                Search
                            </button>
                        </div>
                    </div>
                </header>

                <div className="px-10 mt-2 flex-1 overflow-y-auto">
                    <div className="bg-white rounded-md shadow-md p-5">
                        <div className="space-y-2">
                            {
                                list.length > 0 ? list.map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="w-32 h-32 rounded-2xl overflow-hidden">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        objectFit="contain"
                                                        alt={item.file_name}
                                                        src={item.file_path}
                                                    />
                                                </div>
                                                <div>
                                                    <h1 className="text-xl font-bold text-primary-500">{item.name_unit}</h1>
                                                    <p className="text-xs font-light text-zinc-500">{item.description}</p>
                                                    <div className="w-full grid grid-cols-12 mt-3">
                                                        <div className="col-span-4 flex items-center gap-2 border-x border-primary-500 px-5">
                                                            <Icon icon={IconsCollection.category} className="text-xl font-bold text-primary-500"/>
                                                            <h1 className="text-sm font-semibold text-zinc-500">{item.category_title}</h1>
                                                        </div>
                                                        <div className="col-span-4 flex items-center gap-2 border-x border-primary-500 px-5">
                                                            <Icon icon={IconsCollection.condition} className="text-xl font-bold text-primary-500"/>
                                                            <h1 className="text-sm font-semibold text-zinc-500">{item.condition}</h1>
                                                        </div>
                                                    </div>
                                                    <button className="btn-primary mt-2">Sewa Ini</button>
                                                </div>
                                            </div>
                                            <div className="text-end text-lg font-light">
                                                <h1>Mulai dari</h1>
                                                <div className="flex items-center gap-2">
                                                    <h1 className="font-bold text-2xl text-primary-500">{formatCurrency(item.price)}</h1>
                                                    <p className="text-sm">/ Hari</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="text-center py-5">
                                    <h1 className="text-2xl font-bold text-red-500">Unit gada nih</h1>
                                    <p className="text-zinc-500 text-sm">Coba dengan filter lain</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
