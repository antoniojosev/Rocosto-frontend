import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div>
                <label className="block text-white mb-2">{label}</label>
                <input
                    ref={ref}
                    className={`w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 ${className || ''}`}
                    {...props}
                />
            </div>
        )
    }
)

Input.displayName = "Input"

export { Input }