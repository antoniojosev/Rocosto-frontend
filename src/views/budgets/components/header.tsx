import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
    setIsModalOpen: (isOpen: boolean) => void;
    title: string;
    subtitle: string;
    titleButton: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, titleButton, setIsModalOpen }) => {
    return (
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
                <Plus size={20} />
                {titleButton}
            </button>
        </div>
    );
};

export default Header;