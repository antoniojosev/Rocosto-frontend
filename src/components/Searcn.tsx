import { Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value);
    };

    return (
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Buscar presupuestos..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-[#2a2a2a] text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:border-gray-600"
            />
        </div>
    );
};

export default SearchBar;