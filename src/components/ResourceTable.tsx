import React from 'react';
import { ArrowUpDown, Pencil, Trash, Eye } from 'lucide-react';

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
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  showActions?: boolean;
}

const ResourceTable: React.FC<ResourceTableProps> = ({ 
  config, 
  data, 
  searchTerm = '',
  onEdit,
  onDelete,
  onView,
  showActions = true
}) => {
  const filteredData = data.filter(item =>
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total columns accounting for colSpan
  const totalCols = config.columns.reduce((acc, col) => acc + (col.colSpan || 1), 0);
  // Add an extra column for actions if needed
  const gridCols = showActions ? totalCols + 1 : totalCols;
  
  const handleEdit = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (onEdit) onEdit(item);
  };

  const handleDelete = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (onDelete) onDelete(item);
  };

  const handleView = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    if (onView) onView(item);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
      <div 
        className='grid gap-4 p-4 border-b border-gray-800 text-sm text-gray-400'
        style={{ 
            gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr)) ${showActions ? '100px' : ''}`
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
        {showActions && <div className="text-center">Acciones</div>}
      </div>

      <div className="divide-y divide-gray-800">
        {filteredData.map((item) => (
          <div
            key={item.id || item.code}
            className={`grid gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors`}
            style={{ 
                gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr)) ${showActions ? '100px' : ''}`
            }}
          >
            {config.columns.map((column) => (
              <div
                key={`${item.id || item.code}-${column.key}`}
                className={`text-white ${column.colSpan ? `col-span-${column.colSpan}` : ''}`}
              >
                {item[column.key]?.name || item[column.key]}
              </div>
            ))}
            {showActions && (
              <div className="flex justify-center items-center gap-2">
                {onView && (
                  <button 
                    onClick={(e) => handleView(e, item)}
                    className="p-1.5 bg-green-500/20 text-green-400 rounded-md hover:bg-green-500/30 transition-colors"
                    title="Ver detalles"
                  >
                    <Eye size={16} />
                  </button>
                )}
                {onEdit && (
                  <button 
                    onClick={(e) => handleEdit(e, item)}
                    className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button 
                    onClick={(e) => handleDelete(e, item)}
                    className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
                    title="Eliminar"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceTable;
