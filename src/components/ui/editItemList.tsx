import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { useUnits } from '../../hooks/useDatabases';
import { set } from 'react-hook-form';

interface Column {
  type: string;
  label: string;
  className?: string;
  colSpan?: number;
  key: string;
  content?: string | number;
  compute?: (item: any) => any;
}

type ValidationError = { index: number, item: any, errors: { field: string, message: string }[] };


interface EditListItemProps {
  columns: Column[];
  gridCols?: number;
  onChange: (key: string, index: number, field: string, value: any) => void;
  onDelete: (key: string, index: number) => void;
  item: any;
  className?: string;
  tab: string;
  index: number;
  errors: ValidationError | null;
  editableInput: editableInput;
  setEditableInput: (editable: boolean)=>void

}


const EditListItem: React.FC<EditListItemProps> = ({
  columns,
  gridCols = 6,
  item,
  className,
  onChange,
  onDelete,
  tab,
  index,
  errors,
  editableInput,
  setEditableInput
}) => {
  const { data: units = [] } = useUnits();
  
  const styleInputEditable = editableInput ? 'border' : 'border-0';

  const baseFieldClass = `bg-[#2a2a2a] text-white rounded-md p-2 ${styleInputEditable} border-gray-700`;
  // TODO: corregir los estilos del error en el select 

  const handlerOnChange = (e, col) =>{
    onChange(tab, index, col.key, e.target.value)
    setEditableInput(true)
  }
  
  return (
    <div
      key={index}
      className={`grid gap-x-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
    >
      {columns.map((col, idx) => {
        const isLast = idx === columns.length - 1;
        const hasError = errors?.errors.some(error => error.field === col.key);
        const errorClass = hasError ? 'border-red-500 placeholder-red-500' : '';
        const errorPlaceHolder = hasError ? errors?.errors.find(error => error.field === col.key)?.message : '';

        let fieldElement: JSX.Element;

        if (col.type === 'select') {
          const defaultSelectValue = item[col.key]?.id ?? '';
          fieldElement = (
            <select
              defaultValue={defaultSelectValue}
              className={`${baseFieldClass} ${col.className || ''} ${errorClass}`}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
              onChange={(e) => handlerOnChange(e, col)}
            >
              {defaultSelectValue ? (
                <option value={item[col.key]?.id}>
                  {item[col.key]?.name}
                </option>
              ) : (
                <option value="" disabled>
                  {errorPlaceHolder || col.label}
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
          const total = item.total ? item.total : col.compute(item)
          fieldElement = (
            <p
              className={`text-white p-2 font-bold ${col.className || ''}`}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
            >
              {total}$
            </p>
          );
        } else {
          const defaultValue = col.type === 'number' ? (item[col.key] ?? 0) : (item[col.key] ?? '');
          fieldElement = (
            <input
              type={col.type}
              onChange={(e) => handlerOnChange(e, col)}
              onFocus={()=> setEditableInput(true)}
              defaultValue={defaultValue}
              className={`${baseFieldClass} ${col.className || ''} ${errorClass}`}
              placeholder={errorPlaceHolder || col.label}
              style={{ gridColumn: col.colSpan ? `span ${col.colSpan}` : undefined }}
            />
          );
        }


        return (  
          <React.Fragment key={idx}>
            {isLast ? (
              <div className="grid grid-cols-2 items-center justify-between">
                {fieldElement}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white ml-2"
                  onClick={() => onDelete(tab, index)}
                >
                  <Trash size={16} />
                </button>
              </div>
            ) : (
              fieldElement
            )}
            
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default EditListItem;
