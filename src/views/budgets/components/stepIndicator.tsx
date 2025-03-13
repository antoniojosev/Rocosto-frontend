import React from 'react';
import { Check } from 'lucide-react';

interface Tab {
    id: string;
    label: string;
    completed: boolean;
}

interface StepIndicatorProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2" />
            <div className="relative flex justify-between">
                {tabs.map((tab, index) => (
                    <div key={tab.id} className="flex flex-col items-center">
                        <button
                            onClick={() => onTabChange(tab.id)}
                            type="button"
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all
                                ${
                                    activeTab === tab.id
                                        ? 'bg-white text-black'
                                        : tab.completed
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-700 text-gray-400'
                                }`}
                        >
                            {tab.completed ? <Check size={20} /> : index + 1}
                        </button>
                        <span
                            className={`mt-2 text-sm ${
                                activeTab === tab.id ? 'text-white' : 'text-gray-400'
                            }`}
                        >
                            {tab.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepIndicator;