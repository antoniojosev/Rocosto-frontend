import { Search } from 'lucide-react';
import { useState } from 'react';
import { IOwner } from '../../types/User';
import { ICompany } from '../../types/Company';


interface SystemUser {
    avatar: string;
    role: string;
}


interface SelectOwnerProps {
    data?: ICompany[];
    systemUsers: SystemUser[];
    onOwnerSelect: (owner: IOwner) => void;
    label: string;
    value?: IOwner | null | string | number;
    className?: string;
}

export const SelectOwner = ({ label, data, systemUsers, onOwnerSelect, value, className }: SelectOwnerProps) => {
    const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
    const [ownerSearchTerm, setOwnerSearchTerm] = useState('');

    const handleOwnerSelect = (owner: IOwner) => {
        setIsOwnerDropdownOpen(false);
        onOwnerSelect(owner);
    };
    
    // TODO: evaluar alternativa a esto
    const selectedOwner = value 
        ? data?.flatMap(company => company.owners).find(owner => owner.id === value.id) 
        : null;

    return (
        <div className="relative">
            <label className="block text-white mb-2">{label}</label>
            <div className="relative">
                <div
                    className={`w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 cursor-pointer flex items-center ${className || ''}`}
                    onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                >
                    {selectedOwner ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={systemUsers[0].avatar}
                                alt={selectedOwner.username}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <div className="text-white text-sm">{selectedOwner.username}</div>
                                <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                            </div>
                        </div>
                    ) : (
                        <span className="text-gray-400">Seleccionar propietario</span>
                    )}
                </div>
                {isOwnerDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#2a2a2a] rounded-md border border-gray-700 shadow-lg">
                        <div className="p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar propietario..."
                                    value={ownerSearchTerm}
                                    onChange={(e) => setOwnerSearchTerm(e.target.value)}
                                    className="w-full bg-[#1a1a1a] text-white rounded-md pl-8 pr-4 py-2 text-sm border border-gray-700"
                                />
                            </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {data?.flatMap(company =>
                                company.owners.map(owner => (
                                    <div
                                        key={owner.id}
                                        className="flex items-center gap-3 p-2 hover:bg-[#3a3a3a] cursor-pointer transition-colors"
                                        onClick={() => handleOwnerSelect(owner)}
                                    >
                                        <img
                                            src={systemUsers[0].avatar}
                                            alt={owner.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-white text-sm">{owner.username}</div>
                                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};