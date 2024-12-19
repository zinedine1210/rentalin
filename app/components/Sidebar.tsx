'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobalContext } from "@@/src/providers/GlobalContext";
import Profile from "./Partials/Profile";
import { MenusList } from "@@/lib/menus/data/MenusModel";
import { ApiResponse, fetchClient, TableResponse } from "@@/src/hooks/CollectionAPI";


export default function Sidebar({ routeFlag }: { routeFlag: string }) {
  const { state, setState } = useGlobalContext()
  const [menus, setMenus] = useState<MenusList[]>([]);
  const pathname = usePathname()

  const getMenus = useCallback(async () => {
    const clientMenus: ApiResponse<TableResponse<MenusList[]>> = await fetchClient('GET', `/data/menus?url=${routeFlag}`);
    const responseClientData = clientMenus.data as TableResponse<MenusList[]>
    localStorage.setItem('client_menus', JSON.stringify(responseClientData.data));
    setMenus(responseClientData.data)
  }, [routeFlag])

  useEffect(() => {
    const storedMenus = localStorage.getItem('client_menus');
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus).filter(res => res.url.includes(routeFlag)));
    } else{
      getMenus()
    }
  }, [getMenus, routeFlag]);

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
                    <h1 className="font-bold text-primary-500 text-sm capitalize dark:text-white border-l-2 border-primary-500 pl-2">{item[0]}</h1>
                  </div>
                  <div className="space-y-2">
                    {
                      item[1].map((menu: MenusList, index2: number) => {
                        return (
                          <Link key={index2} href={menu.url}>
                            <button className={`rounded-xl full-hover text-xs flex items-center gap-3 py-3 px-5 relative hover:bg-primary-100 mb-1 ${menu.url == pathname && 'bg-primary-500 hover:bg-primary-500 text-white'}`}>
                              <Icon icon={menu.icon} className={`text-lg ${menu.url == pathname ? 'text-white scale-150 duration-300 ease-in-out transition-all':'text-primary-500'}`}/>
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
      <div className={`${!state.view ? '-translate-x-full md:translate-x-0':'translate-x-0 md:translate-x-0'} delay-100 duration-300 ease-in-out fixed top-0 left-0 p-5 w-3/4 md:w-full z-30 md:static md:z-0 h-screen flex-1 md:h-full flex flex-col`}>
        <div className="dark:bg-dark bg-white rounded-2xl overflow-hidden shadow-md h-full flex-1 flex flex-col">
          <header className="bg-primary-500 dark:bg-dark w-full py-3 px-3 shadow-md rounded-xl">
            <Profile />
          </header>
          <div className='px-2 flex-1 space-y-2 overflow-y-auto no-scrollbar xl:max-w-64 xl:min-w-64 2xl:max-w-72 2xl:min-w-72 py-2'>
            {LoopingMenus()}
          </div>
        </div>
      </div>
    </>
  )
}
