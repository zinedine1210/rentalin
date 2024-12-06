import { useGlobalContext } from "@@/src/providers/GlobalContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ModalInfo {
  name: string
  data?: any
  id?: string
}

export default function Modal({
  children,
  name,
  disableClose
}: {
  children: ReactNode,
  name: string,
  disableClose?: boolean
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mount, setMounted] = useState<boolean>(false)
  const { state, setState } = useGlobalContext()
  const stateModal: undefined | ModalInfo = state?.modal


  useEffect(() => {
    if(!mount){
      setTimeout(() => {
        setMounted(true)
      }, 2000);
    }
  }, [mount])

  const onDismiss = () => {
    setMounted(false)
    setState({ ...state, modal: null })
  }

  if(stateModal?.name == name)
  return (
    <div ref={dropdownRef} className="bg-black/50 dark:bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%)] max-h-full">
      <div className="relative pt-5 w-full max-h-full">
        <div className="w-full flex items-center justify-center overflow-y-auto h-full">
          <div className={`${mount ? 'visible opacity-100': 'invisible opacity-0'} transition-all duration-500 ease-in-out block w-full md:w-fit min-w-56 max-w-6xl`}>
            <div className="p-8 rounded-md shadow-md bg-white dark:bg-dark relative">
              {
                children
              }
              {
                !disableClose && (
                  <button className="absolute top-3 right-3 w-8 h-8 text-primary-500 rounded-md hover:bg-primary-200 duration-300 flex items-center justify-center" onClick={onDismiss}>
                    <Icon icon={'iconamoon:close-light'} className="text-2xl"/>
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
