'use client'
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";
import DarkMode from "./Partials/DarkMode";
import { Icon } from "@iconify/react";
import { IconsCollection } from "@@/src/constant/icons";

export default function AppBar() {

  return (
    <nav className="w-full p-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image 
            src={'/images/logo.png'}
            alt="Rentalin"
            width={200}
            height={100}
            className="w-auto h-14 2xl:h-14"
            placeholder={`data:image/${myImageLoader(500, 500)}`}
          />
      </div>

      <div className="bg-primary-500 px-5 py-3 rounded-2xl flex items-center gap-5 shadow-md">
        <DarkMode />
        <Icon className="text-2xl text-white" icon={IconsCollection.bell}/>
      </div>
    </nav>
  )
}
  