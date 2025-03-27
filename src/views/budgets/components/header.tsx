import React, { useEffect, useState } from 'react';
import { Plus, Loader2, Check } from 'lucide-react';

interface HeaderProps {
    setIsModalOpen: (isOpen: boolean) => void;
    title: string;
    subtitle: string;
    titleButton: string;
    classNameButton?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
    title, 
    subtitle, 
    titleButton, 
    setIsModalOpen, 
    classNameButton,
    isLoading,
    isSuccess 
}) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    return (
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className={`
                    flex items-center gap-2 px-4 py-2 bg-white rounded-lg
                    ${classNameButton} 
                    relative overflow-hidden
                    transition-all duration-200  
                    ${isLoading ? 'cursor-not-allowed text-white/50' : ''}
                `}
            >
                {/* Barra de progreso */}
                {isLoading && (
                    <div className="absolute inset-0 w-full h-full rounded-lg ">
                        <div className="absolute inset-0" />
                        <div className="absolute -left-1 top-0  h-full w-full bg-[rgba(26,26,26,1)] animate-progress" />
                    </div>
                )}

                {/* Contenido del botón */}
                <div className="relative flex items-center gap-2">
                    {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : showSuccess ? (
                        <Check size={20} className="animate-in fade-in-0 slide-in-from-left-1" />
                    ) : (
                        <Plus size={20} className="transition-all duration-200" />
                    )}
                    {isLoading ? 'Guardando...' : titleButton}
                </div>
            </button>
        </div>
    );
};

export default Header;