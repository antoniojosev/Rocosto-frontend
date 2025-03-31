import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  type: string;
  colSpan?: number;
}

interface TabConfig {
  key: string;
  label: string;
  columns: Column[];
}

interface ResourceTableProps {
  config: TabConfig;
  data: any[];
  searchTerm?: string;
}

const ResourceTable: React.FC<ResourceTableProps> = ({ config, data, searchTerm = '' }) => {
  const filteredData = data.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total columns accounting for colSpan
  const totalCols = config.columns.reduce((acc, col) => acc + (col.colSpan || 1), 0);
  console.log('totalCols', totalCols);
  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
      <div 
        className='grid gap-4 p-4 border-b border-gray-800 text-sm text-gray-400'
        style={{ 
            gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`
        }}
      >
        {config.columns.map((column) => (
          <div
            key={column.key}
            className={`flex items-center gap-2 ${column.colSpan ? `col-span-${column.colSpan}` : ''}`}
          >
            {column.label} <ArrowUpDown size={14} />
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-800">
        {filteredData.map((item) => (
          <div
            key={item.code}
            className={`grid gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors`}
            style={{ 
                gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`
            }}
        >
            {config.columns.map((column) => (
              <div
                key={`${item.code}-${column.key}`}
                className={`text-white ${column.colSpan ? `col-span-${column.colSpan}` : ''}`}
              >
                {item[column.key]?.name || item[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceTable;
