interface Column {
    type?: string;
    content?: any
    className?: string;
    colSpan?: number;
    label?: string;
    inputName?: string;
}

interface TableHeadProps {
    columns: Column[];
    gridCols: number
}

const TableHead = ({ columns, gridCols }: TableHeadProps) => {
    return (
        <div className={`grid grid-cols-${gridCols} gap-4 mb-2 text-sm text-gray-400`}>
            {columns.map((column, index) => (
                <div key={index} className={`col-span-${column.colSpan }`}>
                    {column.label}
                </div>
            ))}
        </div>
    );
};

export default TableHead;