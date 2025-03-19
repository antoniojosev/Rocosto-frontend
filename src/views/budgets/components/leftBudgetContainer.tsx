import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IWorkItem } from '../../../types/Database';
import { IBudget } from '../../../types/Budget';
import ListItem from '../../../components/ui/listItem';


interface LeftBudgetContainerProps {
    detailsVisible: boolean;
    selectedItem: IWorkItem | null;
    detailBudget: IBudget | null;
    getPresupuestoTotal: () => number;
    handleItemClick: (item: IWorkItem) => void;
}

const LeftBudgetContainer: React.FC<LeftBudgetContainerProps> = ({
    detailBudget,
    handleItemClick,
    getPresupuestoTotal,
    selectedItem,
    detailsVisible
}) => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Resumen del Presupuesto</h2>
                <div className="text-right">
                    <p className="text-gray-400 text-sm">Total del Presupuesto</p>
                    <p className="text-white text-2xl font-bold">{getPresupuestoTotal()?.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
                <div>Código</div>
                <div className="col-span-2">Descripción</div>
                <div>Unidad</div>
                <div>Total</div>
            </div>
            {(!detailBudget || detailBudget.work_item.length === 0) ? (
                <div className="p-8 text-center">
                    <p className="text-gray-400">No hay partidas creadas. Haga clic en "Nueva Partida" para comenzar.</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-800">
                    {detailBudget.work_item.map((item) => (
                        <ListItem
                            columns={[
                                { content: item.code },
                                {
                                    content: item.description,
                                    colSpan: 2
                                },
                                { content: item.unit },
                                {
                                    content: (
                                        <div className="flex items-center justify-between">
                                            <span className="text-white">{item.total_cost}$</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleItemClick(item);
                                                }}
                                                className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#333] hover:bg-[#444] transition-colors ${selectedItem?.id === item.id && detailsVisible ? 'bg-white text-black' : ''
                                                    }`}
                                                title={selectedItem?.id === item.id && detailsVisible ? "Ocultar detalles" : "Ver detalles"}
                                            >
                                                <ChevronRight size={18} className={`transition-transform duration-300 ${selectedItem?.id === item.id && detailsVisible ? 'rotate-90 text-black' : 'text-white'
                                                    }`} />
                                            </button>
                                        </div>
                                    )
                                },

                            ]}
                            onClick={() => handleItemClick(item)}
                            gridCols={5}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LeftBudgetContainer;