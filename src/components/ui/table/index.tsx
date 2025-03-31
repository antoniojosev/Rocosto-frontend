import React from 'react';
import ListItem from '../listItem';

interface TableHeader {
    label: string;
    colSpan?: number;
}

interface TableProps<T> {
    headers: TableHeader[];
    items: T[];
    gridCols: number;
    renderItem: (item: T) => { content: React.ReactNode; colSpan?: number }[];
    onItemClick?: (item: T) => void;
    emptyMessage?: string;
}

const Table = <T extends {}>({
    headers,
    items,
    gridCols,
    renderItem,
    onItemClick,
    emptyMessage = 'No hay elementos para mostrar'
}: TableProps<T>) => {
    return (
        <>
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
                {headers.map((header, index) => (
                    <div key={index} className={header.colSpan ? `col-span-${header.colSpan}` : ''}>
                        {header.label}
                    </div>
                ))}
            </div>
            {items.length === 0 ? (
                <div className="p-8 text-center">
                    <p className="text-gray-400">{emptyMessage}</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-800">
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            columns={renderItem(item)}
                            onClick={() => onItemClick?.(item)}
                            gridCols={gridCols}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Table;
