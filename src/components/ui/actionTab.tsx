import { Copy, Plus } from 'lucide-react'

interface ActionTabProps {
    title: string
    onCopy: () => void
    onAdd: () => void
}

export const ActionTab = ({
    title,
    onCopy,
    onAdd,
}: ActionTabProps) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">{title}</h4>
            <div className="flex gap-2">
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm"
                >
                    <Copy size={16} />
                    {`Copiar ${title}`}
                </button>
                <button
                    className="flex items-center gap-2 px-3 py-1 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    onClick={onAdd}
                >
                    <Plus size={16} />
                    {`Agregar ${title}`}
                </button>
            </div>
        </div>
    )
}