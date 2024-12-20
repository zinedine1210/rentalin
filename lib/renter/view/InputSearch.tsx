import { IconsCollection } from "@@/src/constant/icons";
import { Icon } from "@iconify/react";
import { FormEvent } from "react";

export default function InputSearch({
    onChange = (value) => {},
    onSubmit,
    value
}: {
    onChange: (value: string) => void,
    onSubmit: () => void,
    value: string
}) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        onSubmit()
    }
  return (
    <form onSubmit={e => handleSubmit(e)} className="z-0 container-input-search">
        <input onChange={e => onChange(e.target.value)} value={value} type="text" name="text" className="input-search" required placeholder="Cari Unit" />
        <div className="icon">
            <Icon icon={IconsCollection.search} className="text-sm"/>
        </div>
    </form>
  )
}
