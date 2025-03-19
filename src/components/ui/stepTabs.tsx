import React from 'react';

interface Tab {
    id: string;
    label: string;
    count: number;
}

interface StepTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabsData: {
        label: string;
        count: number;
    }[];
}

const StepTabs: React.FC<StepTabsProps> = ({ activeTab, setActiveTab, tabsData }) => {
    const tabsConfig: Tab[] = tabsData.map((item, index) => ({
        id: String(index),
        label: item.label,
        count: item.count
    }));

    return (
        <div className="flex justify-between items-center gap-2 mb-6">
            {tabsConfig.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.label)}
                    className={`w-full px-4 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                            ? 'bg-white text-black'
                            : 'bg-[#2a2a2a] text-gray-300 hover:text-white'
                    }`}
                >
                    {tab.label} ({tab.count})
                </button>
            ))}
        </div>
    );
};

export default StepTabs;