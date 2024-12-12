'use client'

import { Options } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from  "react";
import InputText from "./InputText";
import Loading from "@@/app/loading";
import { IconsCollection } from "@@/src/constant/icons";

export default function Select({ 
    options, 
    id, 
    name, 
    label, 
    onChange, 
    value, 
    customCss='text-sm py-2.5 px-5',
    required=true,
    prefixIcon,
    errorMessage,
    disabled=false,
    defaultAll=false,
    position='right-0',
    placeholder,
    onTrigger,
    justIconOnMobile=false,
    isSearch=true,
    isCreate=false
}: {
    options: Options[],
    id: string,
    name: string,
    customCss?: string,
    label?: string,
    onChange: (value: any) => void,
    value: any,
    required?: boolean,
    prefixIcon?: string,
    errorMessage?: string,
    defaultAll?: boolean,
    position?: string,
    placeholder?: string,
    disabled?: boolean,
    onTrigger?: () => void,
    justIconOnMobile?: boolean
    isSearch?: boolean
    isCreate?: boolean
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [keyword, setKeyword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [createOpt, setCreateOpt] = useState<string>("")

    // Fungsi untuk menutup dropdown jika klik di luar
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleOpen = async () => {
        if(!loading && onTrigger && !isOpen && options.length == 0){
            setLoading(true)
            onTrigger()
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
        setIsOpen(!isOpen)
    }

    // Menggunakan useEffect untuk mendeteksi klik di luar
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const valueNow = () => {
        if(defaultAll){
            if(value == ''){
                return placeholder ?? 'Select'
            }else{
                if(options.length > 0){
                    const find = options.find(res => res.value == value)?.label
                    if(find) return options.find(res => res.value == value)?.label
                    else return value
                }else return value
            }
        }else{
            if(value == ''){
                return placeholder ?? 'Select'
            }else{
                if(options.length > 0){
                    const find = options.find(res => res.value == value)?.label
                    if(find) return options.find(res => res.value == value)?.label
                    else return value
                }else return value
            }
        }
    }

    const optionsMapping = options.filter(item => {
        const value = item.label.toLowerCase();
        let queryIndex = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === keyword[queryIndex]) {
                queryIndex++;
            }
            if (queryIndex === keyword.length) {
                return true;
            }
        } 
        return false;
    })

    const handleKeyword = (value: string) => {
        const optNowKey = optionsMapping.filter(item => {
            const valueNow = item.label.toLowerCase();
            let queryIndex = 0;
            for (let i = 0; i < valueNow.length; i++) {
                if (valueNow[i] === value[queryIndex]) {
                    queryIndex++;
                }
                if (queryIndex === value.length) {
                    return true;
                }
            } 
            return false;
        })

        if(isCreate){
            const lengthOptMap = optNowKey.length
            if(lengthOptMap == 0){
                setCreateOpt(value)
            }else{
                setCreateOpt("")
            }
        }
        setKeyword(value)
    }


    return (
        <div ref={dropdownRef} className="relative w-full">
            <div className="w-full">
                {label && <label className="mb-1 inline-block font-semibold text-sm xl:text-xs 2xl:text-sm capitalize" htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</label>}
                <div className="relative w-full">
                    {prefixIcon && <Icon icon={prefixIcon} className="text-2xl -translate-y-1/2 top-1/2 left-3 dark:text-white/80 text-black/50 absolute"/>}
                    <button type="button" disabled={disabled} onClick={() => handleOpen()} className={`${customCss} ${prefixIcon && 'pl-12'} ${errorMessage && 'border-red-500 dark:border-red-500 dark:focus:border-red-500 focus:border-red-500'} bg-zinc-50 transition-colors duration-300 disabled:bg-zinc-300 disabled:placeholder:text-black disabled:text-black dark:disabled:bg-black dark:disabled:placeholder:text-zinc-400 dark:disabled:text-zinc-400 outline-none border hover:bg-zinc-100 focus:bg-white focus:border-primary-500 dark:bg-dark dark:border-white/50 dark:focus:border-primary-500 rounded-md w-full flex items-center justify-between text-start whitespace-nowrap overflow-hidden`}>
                        <span className={`${justIconOnMobile && 'hidden md:block'} pr-5`}>{valueNow()}</span>
                        <Icon icon={'tabler:chevron-down'} className={`${isOpen && 'rotate-180'} duration-300 text-xl text-primary`}/>
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
            </div>
            {isOpen && (
                <div className={`${position} absolute w-full top-full bg-white dark:bg-dark dark:border-white/30 border shadow-lg rounded z-50 min-w-44 flex flex-col`}>
                    {
                        isSearch && (
                            <div className="p-2">
                                <InputText 
                                    placeholder="Search by label"
                                    value={keyword}
                                    required={false}
                                    onChange={value => handleKeyword(value)}
                                    name={name}
                                    id={id}
                                />
                            </div>
                        )
                    }
                    {
                        loading ?
                        <div className="h-20 flex items-center justify-center mx-auto text-center">
                            <h1 className="text-xs text-primary-500">Fetching Data..</h1>
                        </div>
                        :
                        <div className="max-h-80 h-full overflow-y-auto">
                            {
                                defaultAll && (
                                    <button type="button" onClick={() => onChange('')} className={`${value == '' ?"bg-primary-500 text-white font-bold":"dark:text-zinc-500 hover:bg-primary-300"} duration-300 p-2 cursor-pointer flex items-center gap-2 w-full text-start`}>
                                        All
                                    </button>
                                )
                            }
                            {
                                createOpt && (
                                    <button type="button" onClick={() => onChange(keyword)} className="w-full hover:bg-primary-200 duration-300 ease-in-out p-2 text-sm text-center justify-center flex items-center">
                                        <Icon icon={IconsCollection.plus} className="mr-1"/> Create <span className="font-bold ml-1"> {keyword}</span>
                                    </button>
                                )
                            }
                            {
                                optionsMapping.map((opt, index) => {
                                    return (
                                        <button type="button" disabled={opt.disabled ?? false} key={index} onClick={() => onChange(opt.value)} className={`${opt.value == value ?"bg-primary-500 text-white font-bold disabled:text-black":"dark:text-zinc-400 hover:bg-primary-300"} duration-300 p-2 cursor-pointer flex items-center gap-2 w-full text-start disabled:bg-zinc-300 disabled:cursor-not-allowed text-sm`}>
                                            {opt.label}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            )}
        </div>
    );
}
