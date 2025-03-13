import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IBudgetCreate } from '../../../../types/Budget';


const OtherTab: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<IBudgetCreate>();
    return (
        <div className="space-y-4">
            <label className="flex items-center gap-2 text-gray-300">
                <input
                    type="checkbox"
                    className="text-orange-500"
                    {...register('use_medical_insurance')}
                />
                Usar Gastos Médicos e Implementos de Seguridad
            </label>
            <label className="flex items-center gap-2 text-gray-300">
                <input
                    type="checkbox"
                    className="text-orange-500"
                    {...register('use_associated_cost_factor')}
                />
                Aplicar doble factor de costo asociado
            </label>
        </div>
    );
};

export default OtherTab;