import React from 'react';
import { Copy, Plus } from 'lucide-react';

interface Tab {
    id: string;
    label: string;
}

interface AddOrCopyItemProps {
    tab: Tab;
    onAddItem: (tabLabel: string) => void;
    onCopyItem?: (type: string) => void;
}

const AddOrCopyItem: React.FC<AddOrCopyItemProps> = ({ tab, onAddItem, onCopyItem }) => {
    return (
        <div className="flex items-center justify-between gap-2 mb-8">
            <h2 className="text-white font-medium">{tab.id}</h2>
            <div className="flex gap-2">
                <button
                    onClick={() => onCopyItem?.('material')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                >
                    <Copy size={20} />
                    Copiar {tab.label}
                </button>
                <button
                    onClick={() => onAddItem(tab.label)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <Plus size={20} />
                    Agregar {tab.label}
                </button>
            </div>
        </div>
    );
};

export default AddOrCopyItem;