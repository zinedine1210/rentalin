'use client'
import InputText from "@@/app/components/Input/InputText";
import Select from "@@/app/components/Input/Select";
import { DataOptions } from "@@/app/page";
import { UnitModel, UnitType } from "@@/lib/units/data/UnitModel";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";
import Image from "next/image";
import { useState } from "react";
import ButtonSearch from "./ButtonSearch";
import InputSearch from "./InputSearch";
import CardUnit from "./CardUnit";
import ModalForm from "./ModalForm";
import { useGlobalContext } from "@@/src/providers/GlobalContext";

export interface Filter {
    category_id: string
    armada_id: string
    name_unit: string
    start_date: string
    duration: string
}

export default function MainView2({
    data
}: {data:DataOptions}) {
    const { state, setState } = useGlobalContext()
    const [list, setList] = useState<UnitModel[]>([])
    const [filter, setFilter] = useState<Filter>({
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

    
    const handleToggle = (data: UnitModel) => {
        setState(prev => ({
            ...prev,
            modal: {
                name: 'formunit',
                data, 
                id: 'formunit'
            }
        }))   
    }
  return (
    <section className="bg-white relative min-h-screen overflow-auto h-screen">
        <div className="py-3 container w-3/4 mx-auto">
            <div>
                <Image  
                    width={150}
                    height={30}
                    src={'/images/logo.png'}
                    alt="Rentalin logo"
                    objectFit="contain"

                />
            </div>
        </div>
        <div>
            <div className="h-[450px] overflow-hidden">
                <img src="/images/banner.jpeg" alt="Banner rentalin" className="bg-cover bg-center w-full"/>
            </div>
            <div className="sticky overflow-important top-2 container w-3/4 mx-auto bg-[#D2D1D7]/20 backdrop-blur-md rounded-3xl px-5 py-5 shadow-md -mt-14">
                <div className="w-full grid grid-cols-12 gap-5">
                    <div className="relative col-span-3">
                        <Select 
                            id="category"
                            label="Kategori Barang"
                            name="category"
                            placeholder="Mau sewa apa?"
                            options={data.categories}
                            onChange={(value) => handleChange(value, 'category_id')}
                            value={filter.category_id}
                        />
                    </div>
                    <div className="relative col-span-3">
                        <Select 
                            id="armada"
                            name="armada"
                            label="Lokasi"
                            placeholder="Kamu di daerah mana?"
                            options={data.armadas}
                            onChange={(value) => handleChange(value, 'armada_id')}
                            value={filter.armada_id}
                        />
                    </div>
                    <div className="relative col-span-2">
                        <InputText 
                            id="start_date"
                            label="Tanggal Sewa"
                            name="start_date"
                            required={false}
                            value={filter.start_date}
                            type="datetime-local"
                            onChange={(value) => handleChange(value, 'start_date')}
                            placeholder=""
                        />
                    </div>
                    <div className="relative col-span-2">
                        <Select 
                            id="duration"
                            isSearch={false}
                            name="duration"
                            placeholder="Mau berapa hari?"
                            label="Durasi Sewa"
                            options={optionsDuration}
                            onChange={(value) => handleChange(value, 'duration')}
                            value={filter.duration}
                        />
                    </div>
                    <div className="col-span-2 px-10">
                        <ButtonSearch
                            title="Search Unit"
                            onClick={() => handleSearch()}
                            type="button"
                            icon="wpf:search"
                        />
                    </div>
                </div>
            </div>
            <div className="py-10 container mx-auto w-3/4">
                <div className="text-center mx-auto">
                    <h1 className="font-semibold text-3xl mb-3">Unit Listings</h1>
                    <div className="mx=auto text-center justify-center flex items-center gap-1">
                        <div className="h-1 bg-primary-500 rounded-md w-14" />
                        <div className="h-1 bg-primary-500 rounded-md w-6" />
                        <div className="h-1 bg-primary-500 rounded-md w-2" />
                    </div>
                </div>
                <div className="w-1/4 py-5 px-5 flex items-center justify-normal">
                    <InputSearch 
                        onChange={(value) => handleChange(value, 'name_unit')} 
                        value={filter.name_unit}
                        onSubmit={() => handleSearch()}
                    />
                </div>
                <div className="py-2">
                    <div>
                        <input type="text"  />
                        
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-8">
                    {
                        list.length > 0  ? list.map((item, index) => {
                            return <CardUnit onToggle={handleToggle} usagePrice={data.usagePrice[0]} key={index} data={item}/>
                        })
                        :
                        <div className="text-center py-5 col-span-12">
                            <h1 className="text-2xl font-bold text-red-500">Unit gada nih</h1>
                            <p className="text-zinc-500 text-sm">Coba dengan filter lain</p>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>

        <ModalForm filter={filter} />
    </section>
  )
}
