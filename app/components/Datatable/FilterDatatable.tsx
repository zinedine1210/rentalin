'use client'
import { IconsCollection } from "@@/src/constant/icons";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import InputText from "../Input/InputText";
import { FilterKey, FilterOptions, StateType } from "@@/src/types/types";
import Select from "../Input/Select";


export default function FilterDatatable({
  statename
}: {
  statename: string
}) {
  const { state, setState } = useGlobalContext()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const property: StateType<any> = state?.[statename]

  // Fungsi untuk menutup dropdown jika klik di luar
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Menggunakan useEffect untuk mendeteksi klik di luar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilter = (value: string | number, target: string) => {
    const findIndex: number = property.filter.findIndex((res: FilterOptions) => res.key == target)
    if(findIndex != -1){
      if(value){
        property.filter[findIndex]['value'] = value
      }else{
        property.filter = property.filter.filter((res: FilterOptions) => res.key !== target)
      }
    }else{
      if(value){
        property.filter.push({
          key: target,
          value
        })
      }
    }
    property.page = 1
    setState((prev: any) => ({
      ...prev,
      [statename]: prev[statename]
    }))
  }

  const handleSubmit = (reset?: boolean) => {
    if(reset){
      state[statename].filterKey.map((fil: FilterKey, index: number) => {
        handleFilter('', fil.value)
      })
    }
    property.data = null
    property.page = 1
    property.onGet(property)
  }

  const filterMount = () => {
    if(state[statename]){
      return state[statename].filterKey.map((fil: FilterKey, index: number) => {
        const value: string = property.filter.find((res: FilterOptions) => res.key === fil.value)?.value ?? ''
        if(fil.type == 'input_text') {
          return (
            <InputText
              key={index}
              id={fil.value}
              name={fil.value}
              value={value}
              onChange={value => handleFilter(value, fil.value)}
              placeholder={`Filter by ${fil.label}`}
              // prefixIcon="cil:search"
              type="text"
            />
          )
        }
        if(fil.type == 'select'){
          return (
            <Select
              key={index}
              id={fil.value}
              name={fil.value}
              onChange={(value) => handleFilter(value, fil.value)}
              defaultAll={true}
              value={value}
              placeholder={`Select by ${fil.label}`}
              options={fil.options ?? []}
            />
          )
        }
        if(fil.type == "input_date") {
          return (
            <div key={index}>
              <p className="text-sm font-semibold mb-1">{fil.label}</p>
              <InputText
                key={index}
                id={fil.value}
                name={fil.value}
                value={value}
                onChange={value => handleFilter(value, fil.value)}
                // prefixIcon="cil:search"
                type="date"
              />
            </div>
          )
        }
      })
    }
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button className="btn-primary" onClick={() => setIsOpen(!isOpen)} type="button">
        <Icon icon={IconsCollection.filter} className="text-sm"/>
        <h1 className="hidden md:block">Filter</h1>
      </button>

      <div className={`${isOpen ? 'visible opacity-100 scale-100':'invisible opacity-0 scale-0'} p-3 md:p-5 origin-top-left duration-300 ease-in-out absolute top-full mt-2 left-0 bg-white shadow-lg rounded-xl z-50 w-full min-w-80 md:min-w-96 dark:bg-dark`}>
        <h1 className="font-bold mb-2 text-sm">Filter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filterMount()}
        </div>
        <div className="w-full flex items-center gap-2 mt-5">
          <button type="button" onClick={() => handleSubmit()} className="btn-primary">
            <Icon icon={IconsCollection.save} className="text-lg"/>
            Save
          </button>
          <button type="button" className="btn-secondary" onClick={() => handleSubmit(true)}>Reset</button>
        </div>
      </div>
    </div>
  )
}
