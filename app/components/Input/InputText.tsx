import { Icon } from "@iconify/react/dist/iconify.js"

export default function InputText({
  id,
  label,
  onChange,
  type='text',
  disabled=false,
  placeholder,
  value,
  customCss='text-sm py-2.5 px-5',
  name,
  suffixIcon,
  prefixIcon,
  max,
  min,
  readOnly=false,
  required=true,
  autoComplete='off',
  errorMessage
}: {
  id: string,
  label?: string,
  onChange: (value: any) => void,
  type?: string,
  disabled?: boolean,
  placeholder?: string,
  value: any,
  customCss?: string,
  name: string,
  suffixIcon?: string,
  prefixIcon?: string,
  max?: number,
  readOnly?: boolean,
  min?: number,
  required?: boolean,
  autoComplete?: string,
  errorMessage?: string
}) {

  
  return (
    <div className="w-full">
      {label && <label className="first-letter:uppercase mb-1 inline-block font-semibold text-sm xl:text-xs 2xl:text-sm capitalize" htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="relative w-full">
        {prefixIcon && <Icon icon={prefixIcon} className="text-2xl -translate-y-1/2 top-1/2 left-3 dark:text-white/80 text-black/50 absolute"/>}
        <input 
          onChange={(e: any) => onChange(e.target.value)}
          id={id}
          value={value}
          type={type}
          name={name}
          max={max}
          min={min}
          disabled={disabled} 
          placeholder={placeholder} 
          autoComplete={autoComplete}
          required={required}
          readOnly={readOnly}
          className={`${customCss} ${prefixIcon && 'pl-12'} ${suffixIcon && 'pr-12'} ${errorMessage && 'border-red-500 dark:border-red-500 dark:focus:border-red-500 focus:border-red-500'} bg-zinc-50 transition-colors duration-300 disabled:bg-zinc-300 disabled:placeholder:text-black disabled:text-black dark:disabled:bg-black dark:disabled:placeholder:text-zinc-400 dark:disabled:text-zinc-400 outline-none border hover:bg-zinc-100 focus:bg-white focus:border-primary-500 dark:bg-dark dark:border-white/50 dark:focus:border-primary-500 rounded-md w-full`}
        />
        {suffixIcon && <Icon icon={suffixIcon} className="text-2xl -translate-y-1/2 top-1/2 right-3 dark:text-white/80 text-black/50 absolute"/>}
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  )
}
