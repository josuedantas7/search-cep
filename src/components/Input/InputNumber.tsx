import { InputNumberProps } from "../../@types/InputNumberProps"

export function InputNumber({label,onChange,value,placeholder} : InputNumberProps){
  return (
    <div className="w-full flex flex-col gap-1.5">
        <label className="font-semibold" htmlFor={label}>{label} <span className="text-gray-400">*</span></label>
        <input className="py-1.5 border border-zinc-400 rounded px-4" value={value} onChange={(e) => onChange(parseInt(e.target.value))} type="text" id={label} placeholder={placeholder} />
    </div>
  )
}
