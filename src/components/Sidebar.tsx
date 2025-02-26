import React from 'react';
import { Calculator, Plus, FileText, Database, Settings, User } from 'lucide-react';

interface SidebarProps {
  onNewClick: () => void;
  onDatabaseClick: () => void;
  onBudgetClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewClick, onDatabaseClick, onBudgetClick }) => {
  return (
    <div className="w-16 bg-[#111] border-r border-gray-800 flex flex-col items-center py-4">
      <div className="flex-1 flex flex-col items-center gap-6">
        <button 
          onClick={onBudgetClick}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Calculator size={24} />
        </button>
        
        <button 
          onClick={onNewClick}
          className="w-10  h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <Plus size={24} color="white" />
        </button>
        
        <button className="text-gray-400 hover:text-white transition-colors">
          <FileText size={24} />
        </button>
        
        <button 
          onClick={onDatabaseClick}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Database size={24} />
        </button>
      </div>
      
      <div className="flex flex-col gap-4 mt-auto">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Settings size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <User size={24} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;