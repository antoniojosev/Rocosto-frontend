import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { IUnit } from '../../types/Database';
import { useUnits } from '../../hooks/useDatabases';

interface Column {
  type: string;
  label: string;
  className?: string;
  colSpan?: number;
  key: string;
  content?: string | number;
  compute?: (item: any) => any;
}

interface EditListItemProps {
  columns: Column[];
  gridCols?: number;
  onChange?: (fieldName: string, value: any) => void;
  item: any;
  className?: string;
}


const EditListItem: React.FC<EditListItemProps> = ({
  columns,
  gridCols = 6,
  item,
  className
}) => {
  const { data: units = [] } = useUnits();
  const baseFieldClass = 'bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700';

  return (
    <div
      className={`grid gap-x-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
    >
      {columns.map((col, idx) => {
        const isLast = idx === columns.length - 1;
        let fieldElement: JSX.Element;

        if (col.type === 'select') {
          const defaultSelectValue = item[col.key]?.id ?? '';
          fieldElement = (
            <select
              defaultValue={defaultSelectValue}
              className={`${baseFieldClass} ${col.className || ''}`}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
            >
              {defaultSelectValue ? (
                <option value={item[col.key]?.id}>
                  {item[col.key]?.name}
                </option>
              ) : (
                <option value="" disabled>
                  {col.label}
                </option>
              )}
              {units
                .filter(unit => unit.id !== item[col.key]?.id)
                .map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
            </select>
          );
        } else if (col.type === 'display') {
            const rawValue = col.compute(item);
            const computedValue = isNaN(rawValue) || rawValue === null ? 0 : rawValue;
          fieldElement = (
            <p
              className={`text-white p-2 text-right font-bold ${col.className || ''}`}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
            >
              {computedValue}$
            </p>
          );
        } else {
            const defaultValue = col.type === 'number' ? (item[col.key] ?? 0) : (item[col.key] ?? '');
          fieldElement = (
            <input
              type={col.type}
              defaultValue={defaultValue}
              className={`${baseFieldClass} ${col.className || ''}`}
              placeholder={col.label}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
            />
          );
        }

        if (isLast) {
          return (
            <div key={idx} className="grid grid-cols-2 items-center justify-between">
              {fieldElement}
              <button
                type="button"
                className="text-gray-400 hover:text-white ml-2"
              >
                <Trash size={16} />
              </button>
            </div>
          );
        }

        return React.cloneElement(fieldElement, { key: idx });
      })}
    </div>
  );
};

export default EditListItem;
