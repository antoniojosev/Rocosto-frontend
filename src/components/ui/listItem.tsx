import React from 'react';
import { IWorkItem } from '../../types/Database';

interface Column {
  content: React.ReactNode;
  className?: string;
  colSpan?: number;
}

interface ListItemProps {
  columns: Column[];
  onClick?: () => void;
  className?: string;
  gridCols?: number;
  key?: string | number;
}

const ListItem: React.FC<ListItemProps> = ({
  columns,
  onClick,
  className = '',
  gridCols = 6,
  key
}) => {
  return (
    <div
      key={key}
      onClick={onClick}
      className={`grid grid-cols-${gridCols} gap-4 p-4 text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors ${className}`}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className={`text-white ${column.className || ''}`}
          style={{ gridColumn: column.colSpan ? `span ${column.colSpan}` : undefined }}
        >
          {column.content}
        </div>
      ))}
    </div>
  );
};

export default ListItem;
