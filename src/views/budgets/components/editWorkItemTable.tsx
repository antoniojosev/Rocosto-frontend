import React from 'react';
import { IWorkItem } from '../../../types/Database';
import { ActionTab } from '../../../components/ui/actionTab';
import HeaderTable from '../../../components/ui/headerTable';
import EditListItem from '../../../components/ui/editItemList';
import TotalSummary from '../../../components/ui/resumenTab';


interface Column {
    type: string;
    label: string;
    className?: string;
    colSpan?: number;
    key: string;
    content?: string | number;
    compute?: (item: any) => any;
}

type ValidationError = { index: number , item: any, errors: { field: string, message: string }[] };

interface EditWorkItemTableProps {
    workItem: IWorkItem
    handleNewItem: (type: string) => void;
    handleUpdateItem: (key: string, index: number, field: string, value: any) => void;
    columns : Column[];
    tab: 'material' | 'equipment' | 'labor';
    errorsInWorkItem: ValidationError[];
}

const EditWorkItemTable: React.FC<EditWorkItemTableProps> = ({
    workItem,
    columns,
    handleNewItem,
    handleUpdateItem,
    tab,
    errorsInWorkItem
}) => {

    return (
        <div>
            <ActionTab
                title={tab}
                onCopy={() => handleNewItem(tab)}
                onAdd={() => handleNewItem(tab)}
            />

            <HeaderTable
                columns={columns}
                gridCols={columns.length + 1}
            />

            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {
                    workItem[tab].map((item, index) => (
                        <EditListItem
                            key={item.id}
                            item={item}
                            columns={columns}
                            gridCols={columns.length + 1}
                            onChange={handleUpdateItem}
                            tab={tab}
                            index={index}
                            errors={errorsInWorkItem.find(error => error.index === index) || null}
                        />
                    ))
                }
            </div>

            <TotalSummary
                workItem={workItem}
                type={tab}
                compute={columns[columns.length - 1].compute}
            />
        </div>
    );
};

export default EditWorkItemTable;