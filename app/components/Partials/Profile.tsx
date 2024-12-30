'use client'
import { DropdownOptions } from "@@/src/types/types"
import Dropdown from "./Dropdown"
import { Notify } from "@@/src/utils/script"
import { tryLogout } from "@@/src/hooks/CollectionAPI"
import { ResponseData } from "@@/src/types/apitypes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { IconsCollection } from "@@/src/constant/icons"

export default function Profile() {
    const router = useRouter()
    const [authInfo, setAuthInfo] = useState<string>('')
    let actionoptions: DropdownOptions[] = [
        {
            name: 'Profile',
            icon: 'ph:user-duotone',
            action: (id, index) => {
                alert('profile')
            }
        },
        {
            name: 'Logout',
            icon: 'material-symbols:logout',
            action: (id, index) => {
                handleLogout()
            }
        }
    ]

    useEffect(() => {
        let name = ''
        const storeAuth: string = localStorage.getItem('auth_info') ?? ''

        name = storeAuth.toString().toUpperCase()
        // Memecah nama menjadi array kata-kata
        // const nameParts = name.split(' ');
      
        // Mengambil huruf pertama dari setiap kata
        // const initials = nameParts.map(part => part[0].toLowerCase()).join('');

        setAuthInfo(name.length > 10 ? name.substring(0, 10)+"..": name)
    }, [])

    const handleLogout = async () => {
        const result: ResponseData = await tryLogout()
        if(result.success){
            Notify(result.message, 'info', 5000)
            router.push('/auth')
        }
    }

    const ButtonProfile = () => {
        return (
            <div className="flex items-center w-full gap-2 relative">
                <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center text-white font-bold">
                    {authInfo.charAt(0)}
                </div>
                <div className="text-start">
                    <h1 className="font-semibold text-white text-sm">Hallo, {authInfo}</h1>
                    <p className="text-green-500 font-bold text-xs">Online</p>
                </div>
                <Icon icon={IconsCollection['chevron-down']} className="text-white absolute top-1/2 -translate-y-1/2 right-3"/>
            </div>
        )
    }
  return (
    <div className="w-full">
        <Dropdown
            options={actionoptions}
            button={<ButtonProfile />}
        />
    </div>
  )
}
