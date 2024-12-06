'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import Profile from "./Partials/Profile";
import { MenusList } from "@@/lib/menus/data/MenusModel";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";


export default function Sidebar() {
  const { state, setState } = useGlobalContext()
  const [menus, setMenus] = useState<MenusList[]>([]);
  const pathname = usePathname()

  const getMenus = useCallback(async () => {
    const clientMenus: ApiResponse<TableResponse<MenusList[]>> = await fetchClient('GET', '/data/menus');
    const responseClientData = clientMenus.data as TableResponse<MenusList[]>
    localStorage.setItem('client_menus', JSON.stringify(responseClientData.data));
    setMenus(responseClientData.data)
  }, [])

  useEffect(() => {
    const storedMenus = localStorage.getItem('client_menus');
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    } else{
      getMenus()
    }
  }, [getMenus]);

  const LoopingMenus = (): ReactNode => {
    let dataFinal: any = {}
    // if(!menus){
    //   return "Loading"
    // }
    menus.forEach((item) => {
      if(!item.parent_id){
        if(dataFinal[item.flag]){
          dataFinal[item.flag].push(item)
        }else{
          dataFinal[item.flag] = [item]
        }
      }
    })
    return (
      <>
        {
          Object.entries(dataFinal).map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="hidden md:block">
                  <div className="p-1">
                    <h1 className="font-bold text-primary-500 text-xs xl:text-[10px] 2xl:text-xs capitalize dark:text-white border-l-2 border-primary-500 pl-2">{item[0]}</h1>
                  </div>
                  <div className="">
                    {
                      item[1].map((menu: MenusList, index2: number) => {
                        return (
                          <Link key={index2} href={menu.url}>
                            <button className={`full-hover text-xs xl:text-[11px] 2xl:text-xs flex items-center gap-2 px-3 py-2 xl:py-1.5 xl:px-4 2xl:px-5 2xl:py-2.5 relative hover:bg-primary-100 ${menu.url == pathname && 'bg-primary-500 hover:bg-primary-500 text-white'}`}>
                              <Icon icon={menu.icon} className={`text-sm xl:text-xs 2xl:text-sm text-primary`}/>
                              {menu.title}
                            </button>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-[350ms] duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-[250ms] duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div onClick={() => setState({ ...state, view: false })} className={`${state.view ? "visible opacity-30 translate-x-0":"invisible -translate-x-full opacity-0"} delay-200 duration-300 ease-in-out md:hidden fixed top-0 left-0 w-full h-screen bg-black z-20`}></div>
      <div className={`${!state.view ? '-translate-x-full md:translate-x-0':'translate-x-0 md:translate-x-0'} delay-100 duration-300 ease-in-out fixed top-0 left-0 w-3/4 md:w-full z-30 md:static md:z-0 bg-white h-screen flex-1 md:h-full flex flex-col dark:bg-dark`}>
        <header className="bg-primary-500 dark:bg-dark w-full py-3 px-3 shadow-md">
          <Profile />
        </header>
        <div className='flex-1 space-y-2 overflow-y-auto no-scrollbar xl:max-w-56 xl:min-w-56 2xl:max-w-64 2xl:min-w-64 py-2'>
          {LoopingMenus()}
        </div>
      </div>
    </>
  )
}
