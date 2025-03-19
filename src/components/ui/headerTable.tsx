
interface Column {
    type: string;
    label: string;  
    className?: string;
    colSpan?: number;
    key: string;
    content?: string | number;
  }

  
interface HeaderTableProps {
    columns: Column[];
    gridCols?: number;
}

const HeaderTable = ({ columns, gridCols = 5 }: HeaderTableProps) => {
    return (
        <div 
            className={`grid grid-cols-${gridCols-1} gap-4 mb-2 text-sm text-gray-400`}
            style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }
        }>
            {columns.map((column, index) => (
                <div 
                    key={index}
                    style={{ gridColumn: column.colSpan ? `span ${column.colSpan}` : undefined }}
                >{column.label}</div>
            ))}
        </div>
    );
};

export default HeaderTable;