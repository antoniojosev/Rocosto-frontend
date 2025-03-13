import { Info, Search, X } from 'lucide-react';
import { useState } from 'react';
import { ICompany } from '../../types/Company';
import { IOwner } from '../../types/User';
import UserTooltip from '../../views/budgets/components/userToolTip';


interface SelectUserEditProps {
    systemUsers: any;
    data?: ICompany[];
    onUserSelect: (user: IOwner) => void;
    selectedUser?: IOwner | null;
    label: string;
    value: string | null;
}


export const SelectUserEdit = ({ systemUsers, data, onUserSelect, selectedUser, label }: SelectUserEditProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    const [hoveredUser, setHoveredUser] = useState<IOwner | null>(null);

    const handleUserSelect = (user: IOwner) => {
        onUserSelect(user);
        setSearchFocus(false);
        setSearchTerm('');
    };

    return (
        <div>
            <label className="block text-white mb-2">{label}</label>
            <div className="space-y-2">
                {selectedUser ? (
                    <div className="relative flex items-center gap-3 p-2 rounded-md bg-[#2a2a2a] border border-gray-700">
                        <img
                            src={systemUsers[0].avatar}
                            alt={selectedUser.username}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="text-white text-sm">{selectedUser.username}</div>
                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                        </div>
                        <button
                            className="text-gray-400 hover:text-white transition-colors relative"
                            onMouseEnter={() => setHoveredUser(selectedUser)}
                            onMouseLeave={() => setHoveredUser(null)}
                        >
                            <Info size={16} />
                            {hoveredUser === selectedUser && <UserTooltip user={selectedUser} />}
                        </button>
                        <button
                            onClick={() => onUserSelect(null)}
                            className="text-gray-400 hover:text-white ml-2"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="relative mb-2">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setSearchFocus(true)}
                            className="w-full bg-[#2a2a2a] text-white rounded-md pl-8 pr-4 py-2 text-sm border border-gray-700"
                        />
                    </div>
                )}
                {searchFocus && (
                    <div className="relative z-50 w-full mt-2 bg-[#2a2a2a] rounded-md border border-gray-700 shadow-lg">
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {data?.flatMap(company =>
                                company.owners.map(owner => (
                                    <div
                                        key={owner.id}
                                        className="relative flex items-center gap-3 p-2 hover:bg-[#3a3a3a] cursor-pointer transition-color"
                                        onClick={() => handleUserSelect(owner)}
                                    >
                                        <img
                                            src={systemUsers[0].avatar}
                                            alt={owner.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="text-white text-sm">{owner.username}</div>
                                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-white transition-colors relative"
                                            onMouseEnter={() => setHoveredUser(owner)}
                                            onMouseLeave={() => setHoveredUser(null)}
                                        >
                                            <Info size={16} />
                                            {hoveredUser === owner && <UserTooltip user={owner} />}
                                        </button>
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