'use client'

import { DropdownOptions } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";

export default function Dropdown({ button, options, id = 'id', position='right-0' }: {
    button?: React.ReactNode,
    options: DropdownOptions[],
    position?: string,
    id?: string | number
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={dropdownRef} className="relative">
            <button className="appearance-none w-full" onClick={() => setIsOpen(!isOpen)}>
                {button ?? (
                    <div className="w-8 h-8 rounded-md dark:bg-black dark:hover:bg-black/50 bg-zinc-100 hover:bg-zinc-200 duration-300 flex items-center justify-center">
                        <Icon icon={`fe:elipsis-v`} className="text-xl"/>
                    </div>
                )}
            </button>
            <div className={`${isOpen ? 'visible translate-y-0 opacity-100':'invisible -translate-y-5 opacity-0'} ${position} duration-300 ease-in-out absolute top-full bg-white shadow-lg rounded-md z-50 min-w-44 max-w-96 w-full dark:bg-dark overflow-hidden`}>
                {
                    options.map((opt, index) => {
                        return (
                            <button key={index} onClick={() => opt.action(id, index)} className={`${opt.customCss ?? 'hover:bg-primary-200 dark:text-white text-black dark:hover:bg-darkSecondary'} text-sm p-3 duration-300 ease-in-out cursor-pointer flex items-center gap-2 w-full text-start`}>
                                <Icon icon={opt.icon} className="text-primary text-xl"/>
                                {opt.name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}
