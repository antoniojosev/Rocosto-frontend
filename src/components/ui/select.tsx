import * as React from "react"
import { ICompany } from "../../types/Company";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: ICompany[] | [];
}

export const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <div>
            <label className="block text-white mb-2">{label}</label>
            <select
                className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700"
                {...props}
            >
                <option value="">Seleccionar {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}