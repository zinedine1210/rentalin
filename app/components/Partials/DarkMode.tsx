'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkMode() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null
    
  return (
    <button onClick={() => setTheme(theme == "light" ? "dark":"light")}>
        {
            theme == "light" ?
                <Icon icon={'solar:sun-line-duotone'} className='text-yellow-300 text-2xl'/>
            :   <Icon icon={'radix-icons:moon'} className='text-blue-300 text-2xl'/>
        }
    </button>
  )
}
