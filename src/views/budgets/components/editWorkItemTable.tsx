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

interface EditWorkItemTableProps {
    selectedItem: IWorkItem
    handleNewItem: (type: string) => void;
    columns : Column[];
    tab: 'material' | 'equipment' | 'labor';
}

const EditWorkItemTable: React.FC<EditWorkItemTableProps> = ({
    selectedItem,
    columns,
    handleNewItem,
    tab,
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
                {selectedItem[tab].map((material) => (
                    <EditListItem
                        key={material.id}
                        item={{ ...material, quantity: 1 }}
                        columns={columns}
                        gridCols={columns.length + 1}
                    />
                ))}
            </div>

            <TotalSummary
                workItem={selectedItem}
                type={tab}
                compute={columns[columns.length - 1].compute}
            />
        </div>
    );
};

export default EditWorkItemTable;