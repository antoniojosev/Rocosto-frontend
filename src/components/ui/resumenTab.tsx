import React from 'react';
import { IWorkItem } from '../types/workItem'; // Adjust the import path as needed

interface TotalSummaryProps {
    workItem: IWorkItem;
    type: string;
    compute?: (item: any) => number;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({ workItem, type, compute }) => {

    const total = (workItem: IWorkItem) => {    
        let items;
        switch (type) {
            case 'material':
                items = workItem.material;
                break;
            case 'labor':
                items = workItem.labor;
                break;
            case 'equipment':
                items = workItem.equipment;
                break;
            default:
                items = [];
        }
        
        const sum = items.map(item => {
            return compute ? compute(item) : 0.0;
        }).reduce((acc, curr) => acc + curr, 0);
        items.map(item => {
            console.log(item);
        });
        return sum;
    }

    const getDisplayTitle = () => {
        switch (type) {
            case 'material':
                return 'Total Materiales';
            case 'labor':
                return 'Total Mano de Obra';
            case 'equipment':
                return 'Total Equipos';
            default:
                return 'Total';
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-700 text-right">
            <span className="text-gray-400 text-sm">{getDisplayTitle()}: </span>
            <span className="text-white font-semibold">
                {total(workItem)}$
            </span>
        </div>
    );
};

export default TotalSummary;