import { useState } from "react";
import InputText from "./InputText";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function InputPassword({
    id,
    label,
    onChange,
    disabled=false,
    placeholder,
    value,
    customCss='text-sm py-2.5 px-5',
    name,
    required=true,
    autoComplete='off',
    errorMessage
}: {
    id: string,
    label?: string,
    onChange: (value: any) => void,
    disabled?: boolean,
    placeholder?: string,
    value: any,
    customCss?: string,
    name: string,
    suffixIcon?: string,
    prefixIcon?: string,
    max?: number,
    min?: number,
    required?: boolean,
    autoComplete?: string,
    errorMessage?: string
}) {
    const [type, setType] = useState<"password"|"text">('password')
  return (
    <div className="relative">
        <InputText 
            id={id}
            label={label}
            onChange={value => onChange(value)}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            customCss={customCss}
            name={name}
            required={required}
            suffixIcon="jasjas"
            autoComplete={autoComplete}
            errorMessage={errorMessage}
        />
        <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={() => setType(type == 'password' ? 'text':'password')}>
            {
                type == 'password' && (
                    <Icon className="text-primary text-2xl" icon={'iconoir:eye-off'}/>
                )
            }
            {
                type == 'text' && (
                    <Icon className="text-primary text-2xl" icon={'iconoir:eye'}/>
                )
            }
        </button>
    </div>
  )
}
